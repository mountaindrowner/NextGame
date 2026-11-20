// Bonfire Bash online matchmaking (Cloudflare Worker + Durable Object).
// It only swaps WebRTC connection offers between two players using a 4-letter room code;
// the fight itself runs browser-to-browser. Rooms expire after 10 minutes. No accounts, no stored player data.
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json', ...CORS } });
const LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // no I / O
const MAX = 20000; // a connection offer is ~1-4 KB

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
    const url = new URL(req.url), parts = url.pathname.split('/').filter(Boolean);
    if (parts[0] !== 'room') return json({ ok: true, service: 'bonfire-bash-net' });
    const body = async () => { const t = await req.text(); if (t.length > MAX) throw new Error('too big'); return JSON.parse(t); };
    try {
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
      if (parts.length === 2 && req.method === 'GET') return stub.fetch('https://r/offer');
      if (parts[2] === 'answer' && req.method === 'POST') return stub.fetch('https://r/answer', { method: 'POST', body: JSON.stringify(await body()) });
      if (parts[2] === 'answer' && req.method === 'GET') return stub.fetch('https://r/answer');
      return json({ error: 'not found' }, 404);
    } catch (e) { return json({ error: 'bad request' }, 400); }
  },
};

export class Room {
  constructor(ctx) { this.ctx = ctx; }
  async fetch(req) {
    const p = new URL(req.url).pathname, S = this.ctx.storage;
    if (p === '/init') {
      const cur = await S.get('offer'); if (cur && Date.now() - cur.at < 600000) return json({ error: 'taken' }, 409);
      await S.deleteAll(); const { offer } = await req.json(); await S.put('offer', { sdp: offer, at: Date.now() });
      await S.setAlarm(Date.now() + 600000); return json({ ok: true });
    }
    const o = await S.get('offer'); if (!o || Date.now() - o.at > 600000) return json({ error: 'no such room' }, 404);
    if (p === '/offer') { if (await S.get('answer')) return json({ error: 'room full' }, 409); return json({ offer: o.sdp }); }
    if (p === '/answer' && req.method === 'POST') { if (await S.get('answer')) return json({ error: 'room full' }, 409); const { answer } = await req.json(); await S.put('answer', answer); return json({ ok: true }); }
    if (p === '/answer') { const a = await S.get('answer'); return a ? json({ answer: a }) : json({ waiting: true }, 202); }
    return json({ error: 'not found' }, 404);
  }
  async alarm() { await this.ctx.storage.deleteAll(); }
}
