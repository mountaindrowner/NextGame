// Bonfire Bash online (Cloudflare Worker + two Durable Objects). No accounts, no stored player data.
// - Lobby: who's online right now, challenges between them. Kept in memory only; a player who stops checking in
//   (every few seconds) disappears after 20 s. Names are picked from fixed word lists, never typed, so the lobby
//   has no free text to moderate.
// - Room: swaps WebRTC connection offers between two players under a 4-letter code (expires after 10 minutes),
//   and relays the match over WebSockets when a direct browser-to-browser link can't be made (common on phones).
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json', ...CORS } });
const LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // no I / O
const MAX = 20000; // a connection offer is ~1-4 KB
// lobby names: ADJECTIVE NOUN (kept in sync with LOBBY_ADJ / LOBBY_NOUN in src/game.js)
const ADJ = ['IRON', 'SWIFT', 'BRAVE', 'MIGHTY', 'GOLDEN', 'SILENT', 'ROYAL', 'LUCKY', 'NEON', 'STEEL', 'WILD', 'HUMBLE', 'BOLD', 'TRUE', 'NOBLE', 'QUICK', 'STORM', 'FIRE', 'STONE', 'BRIGHT'];
const NOUN = ['TIGER', 'LION', 'EAGLE', 'BEAR', 'FIST', 'DRAGON', 'FALCON', 'WOLF', 'RAM', 'SHIELD', 'HAMMER', 'COMET', 'KNIGHT', 'RAVEN', 'BISON', 'SHARK', 'HAWK', 'MONK', 'OX', 'FOX'];
const LOBBY_TTL = 20000, LOBBY_CAP = 60;

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
    const url = new URL(req.url), parts = url.pathname.split('/').filter(Boolean);
    const body = async () => { const t = await req.text(); if (t.length > MAX) throw new Error('too big'); return t ? JSON.parse(t) : {}; };
    try {
      if (parts[0] === 'lobby' && req.method === 'POST' && /^(join|beat|challenge|cancel|reply|code|leave)$/.test(parts[1] || '')) {
        const lobby = env.LOBBY.get(env.LOBBY.idFromName('main'));
        return withCors(await lobby.fetch('https://l/' + parts[1], { method: 'POST', body: JSON.stringify(await body()) }));
      }
      if (parts[0] !== 'room') return json({ ok: true, service: 'bonfire-bash-net' });
      if (req.method === 'POST' && parts.length === 1) { // host: create a room with an offer
        const { offer } = await body();
        for (let i = 0; i < 8; i++) {
          let code = ''; for (let j = 0; j < 4; j++) code += LETTERS[Math.floor(Math.random() * LETTERS.length)];
          const r = await env.ROOMS.get(env.ROOMS.idFromName(code)).fetch('https://r/init', { method: 'POST', body: JSON.stringify({ offer }) });
          if (r.status === 200) return json({ code });
        }
        return json({ error: 'busy' }, 503);
      }
      const code = (parts[1] || '').toUpperCase();
      if (!/^[A-Z]{4}$/.test(code)) return json({ error: 'bad code' }, 400);
      const stub = env.ROOMS.get(env.ROOMS.idFromName(code));
      if (parts[2] === 'ws' && req.headers.get('Upgrade') === 'websocket') return stub.fetch(new Request('https://r/ws' + url.search, req));
      if (parts.length === 2 && req.method === 'GET') return stub.fetch('https://r/offer');
      if (parts[2] === 'answer' && req.method === 'POST') return stub.fetch('https://r/answer', { method: 'POST', body: JSON.stringify(await body()) });
      if (parts[2] === 'answer' && req.method === 'GET') return stub.fetch('https://r/answer');
      return json({ error: 'not found' }, 404);
    } catch (e) { return json({ error: 'bad request' }, 400); }
  },
};
function withCors(r) { const h = new Headers(r.headers); for (const [k, v] of Object.entries(CORS)) h.set(k, v); return new Response(r.body, { status: r.status, headers: h }); }
const rid = n => { const a = new Uint8Array(n); crypto.getRandomValues(a); return [...a].map(b => (b % 36).toString(36)).join(''); };

export class Lobby {
  constructor(ctx) { this.ctx = ctx; this.P = new Map(); }
  push(id, m) { const p = this.P.get(id); if (p) { p.inbox.push(m); if (p.inbox.length > 20) p.inbox.shift(); } }
  drop(id) { const p = this.P.get(id); if (!p) return; this.P.delete(id);
    if (p.ch) { this.push(p.ch, { t: 'cancel', from: id }); const o = this.P.get(p.ch); if (o && o.inc === id) o.inc = null; }
    if (p.inc) { this.push(p.inc, { t: 'decline', from: id }); const o = this.P.get(p.inc); if (o && o.ch === id) o.ch = null; } }
  name(n, me) { // a valid, unused ADJECTIVE NOUN name: the one asked for if it's free, else a random one
    const [a, b] = String(n || '').split(' '), taken = v => [...this.P.values()].some(p => p !== me && p.name === v);
    let v = ADJ.includes(a) && NOUN.includes(b) ? a + ' ' + b : '';
    for (let i = 0; (!v || taken(v)) && i < 60; i++) v = ADJ[(Math.random() * ADJ.length) | 0] + ' ' + NOUN[(Math.random() * NOUN.length) | 0];
    return v; }
  view(me) { const inbox = me.inbox; me.inbox = [];
    const players = [...this.P.values()].filter(p => p !== me).slice(0, 40).map(p => ({ id: p.id, name: p.name, busy: p.busy || !!p.ch || !!p.inc }));
    return { players, inbox, n: this.P.size }; }
  async fetch(req) {
    const path = new URL(req.url).pathname.slice(1), b = await req.json().catch(() => ({})), now = Date.now();
    for (const [id, p] of this.P) if (now - p.seen > LOBBY_TTL) this.drop(id);
    if (path === 'join') {
      if (this.P.size >= LOBBY_CAP) return json({ error: 'full' }, 503);
      const me = { id: rid(8), key: rid(16), name: this.name(b.name, null), seen: now, busy: false, inbox: [], ch: null, inc: null };
      this.P.set(me.id, me); return json({ id: me.id, key: me.key, name: me.name, ...this.view(me) });
    }
    const me = this.P.get(b.id); if (!me || me.key !== b.key) return json({ error: 'gone' }, 410);
    me.seen = now;
    const other = this.P.get(b.to);
    switch (path) {
      case 'beat': if (b.name) me.name = this.name(b.name, me); return json({ name: me.name, ...this.view(me) });
      case 'leave': this.drop(me.id); return json({ ok: true });
      case 'challenge': // one challenge at a time, to someone free
        if (!other || other === me) return json({ error: 'gone' }, 404);
        if (me.busy || me.ch || me.inc || other.busy || other.ch || other.inc) return json({ error: 'busy' }, 409);
        me.ch = other.id; other.inc = me.id; this.push(other.id, { t: 'challenge', from: me.id, name: me.name }); return json(this.view(me));
      case 'cancel':
        if (me.ch) { this.push(me.ch, { t: 'cancel', from: me.id }); const o = this.P.get(me.ch); if (o && o.inc === me.id) o.inc = null; me.ch = null; }
        return json(this.view(me));
      case 'reply':
        if (!other || me.inc !== other.id || other.ch !== me.id) return json({ error: 'gone' }, 404);
        me.inc = null; other.ch = null;
        if (b.accept) { me.busy = other.busy = true; this.push(other.id, { t: 'accept', from: me.id, name: me.name }); }
        else this.push(other.id, { t: 'decline', from: me.id });
        return json(this.view(me));
      case 'code': // the challenger made a room: hand its code to the opponent
        if (!other || !/^[A-Z]{4}$/.test(b.code || '')) return json({ error: 'gone' }, 404);
        this.push(other.id, { t: 'code', from: me.id, code: b.code }); return json({ ok: true });
    }
    return json({ error: 'not found' }, 404);
  }
}

export class Room {
  constructor(ctx) { this.ctx = ctx; }
  async fetch(req) {
    const url = new URL(req.url), p = url.pathname, S = this.ctx.storage;
    if (p === '/init') {
      const cur = await S.get('offer'); if (cur && Date.now() - cur.at < 600000) return json({ error: 'taken' }, 409);
      await S.deleteAll(); for (const w of this.ctx.getWebSockets()) try { w.close(1000, 'room reused'); } catch (e) {}
      const { offer } = await req.json(); await S.put('offer', { sdp: offer, at: Date.now() });
      await S.setAlarm(Date.now() + 600000); return json({ ok: true });
    }
    const o = await S.get('offer'); if (!o || Date.now() - o.at > 600000) return json({ error: 'no such room' }, 404);
    if (p === '/ws') { // relay: whatever one side sends goes to the other
      const role = url.searchParams.get('role'); if (role !== 'host' && role !== 'guest') return json({ error: 'bad role' }, 400);
      const pair = new WebSocketPair(), [client, server] = Object.values(pair);
      for (const w of this.ctx.getWebSockets(role)) try { w.close(1000, 'replaced'); } catch (e) {}
      this.ctx.acceptWebSocket(server, [role]);
      if (this.ctx.getWebSockets(role === 'host' ? 'guest' : 'host').length) for (const w of this.ctx.getWebSockets()) try { w.send('{"t":"peer"}'); } catch (e) {}
      return new Response(null, { status: 101, webSocket: client });
    }
    if (p === '/offer') { if (await S.get('answer')) return json({ error: 'room full' }, 409); return json({ offer: o.sdp }); }
    if (p === '/answer' && req.method === 'POST') { if (await S.get('answer')) return json({ error: 'room full' }, 409); const { answer } = await req.json(); await S.put('answer', answer); return json({ ok: true }); }
    if (p === '/answer') { const a = await S.get('answer'); return a ? json({ answer: a }) : json({ waiting: true }, 202); }
    return json({ error: 'not found' }, 404);
  }
  webSocketMessage(ws, msg) {
    if (typeof msg !== 'string' || msg.length > 65536) return;
    const other = this.ctx.getTags(ws)[0] === 'host' ? 'guest' : 'host';
    for (const w of this.ctx.getWebSockets(other)) try { w.send(msg); } catch (e) {}
  }
  webSocketClose(ws, code) {
    for (const w of this.ctx.getWebSockets()) if (w !== ws) try { w.send('{"t":"peerleft"}'); } catch (e) {}
    try { ws.close(1000, 'bye'); } catch (e) {}
  }
  webSocketError(ws) { this.webSocketClose(ws, 1011); }
  async alarm() { await this.ctx.storage.deleteAll(); }
}
