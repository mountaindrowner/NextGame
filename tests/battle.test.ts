import { describe, expect, it } from 'vitest';
import { gen3Damage } from '../src/core/battle/damage';
import { Battle, makeBattler } from '../src/core/battle/engine';
import type { BattleAction, BattleEvent } from '../src/core/battle/contract';
import { catchValue, puzzleBudget } from '../src/core/capture';
import { computeStats, levelForXp, stageMultiplier, xpForLevel } from '../src/core/stats';
import { GAME_DATA } from '../src/data/dataview';

describe('Gen 3 damage goldens (hand-computed)', () => {
  const base = {
    level: 10,
    power: 40,
    atk: 20,
    def: 15,
    physical: false,
    attackerOverheated: false,
    crit: false,
    stab: true,
    effectiveness: 1,
    rand: 100,
  };
  // ⌊2·10/5+2⌋=6 → 6·40·20=4800 → /15=320 → /50=6 → +2=8 → STAB ⌊12⌋ → 12
  it('STAB max-roll', () => expect(gen3Damage(base)).toBe(12));
  it('min roll truncates', () => expect(gen3Damage({ ...base, rand: 85 })).toBe(10));
  it('crit doubles before STAB', () => expect(gen3Damage({ ...base, crit: true, rand: 90 })).toBe(21));
  it('super effective doubles after STAB', () =>
    expect(gen3Damage({ ...base, effectiveness: 2 })).toBe(24));
  it('OVERHEAT halves physical before the +2', () =>
    expect(
      gen3Damage({ ...base, physical: true, attackerOverheated: true, stab: false }),
    ).toBe(5));
  it('never deals zero', () =>
    expect(gen3Damage({ ...base, power: 1, atk: 1, def: 255, stab: false, rand: 85 })).toBe(1));
});

describe('stat math', () => {
  it('matches Gen 3 flattened formulas', () => {
    const toastlet = GAME_DATA.species(10);
    const s = computeStats(toastlet, 10);
    expect(s.integrity).toBe(Math.floor((2 * toastlet.base.integrity * 10) / 100) + 10 + 10);
    expect(s.surge).toBe(Math.floor((2 * toastlet.base.surge * 10) / 100) + 5);
  });

  it('applies Plating leans and the Expansion Board penalty', () => {
    const sparkit = GAME_DATA.species(4);
    const plain = computeStats(sparkit, 20);
    const heavy = computeStats(sparkit, 20, { plating: 'heavy' });
    const board = computeStats(sparkit, 20, { expansionBoard: true });
    expect(heavy.armor).toBe(Math.floor(plain.armor * 1.1));
    expect(heavy.clock).toBe(Math.floor(plain.clock * 0.9));
    expect(board.output).toBe(Math.floor(plain.output * 0.9));
    expect(board.surge).toBe(Math.floor(plain.surge * 0.9));
  });

  it('growth curves are monotonic and Gen 3-shaped', () => {
    expect(xpForLevel('medium-fast', 100)).toBe(1_000_000);
    expect(xpForLevel('slow', 100)).toBe(1_250_000);
    expect(xpForLevel('medium-slow', 100)).toBe(1_059_860);
    for (let l = 2; l <= 100; l++) {
      expect(xpForLevel('medium-slow', l)).toBeGreaterThanOrEqual(xpForLevel('medium-slow', l - 1));
    }
    expect(levelForXp('medium-fast', 8_000)).toBe(20);
  });

  it('stage multipliers follow the Gen 3 table', () => {
    expect(stageMultiplier(2)).toBe(2);
    expect(stageMultiplier(-2)).toBe(0.5);
    expect(stageMultiplier(6)).toBe(4);
  });
});

describe('capture economics (GDD §10.6)', () => {
  const toastlet = GAME_DATA.species(10);
  it('scales with missing INTEGRITY and status, Pokémon-mirrored', () => {
    const full = catchValue(toastlet, 30, 30);
    const weak = catchValue(toastlet, 30, 1);
    const asleep = catchValue(toastlet, 30, 1, 'STANDBY');
    expect(weak).toBeGreaterThan(full);
    expect(asleep).toBeGreaterThanOrEqual(weak);
    expect(asleep).toBeLessThanOrEqual(255);
  });

  it('statuses slow the puzzle timer and weakness shrinks the grid', () => {
    const hard = puzzleBudget(toastlet, 30, 30);
    const easy = puzzleBudget(toastlet, 30, 1, 'STANDBY');
    expect(easy.timerSeconds).toBeGreaterThan(hard.timerSeconds);
    expect(easy.gridSize).toBeLessThanOrEqual(hard.gridSize);
  });
});

function runScript(seed: number, actions: BattleAction[]): BattleEvent[] {
  const party = [makeBattler(GAME_DATA.species(1), 8, GAME_DATA)];
  const foe = makeBattler(GAME_DATA.species(10), 5, GAME_DATA);
  const battle = new Battle({ kind: 'wild', seed, party, foes: [foe] }, GAME_DATA);
  const events = battle.intro();
  for (const a of actions) {
    if (battle.phase === 'done') break;
    events.push(...battle.submit(a));
  }
  return events;
}

describe('battle engine', () => {
  it('replays deterministically: same seed + actions = same events', () => {
    const script: BattleAction[] = Array.from({ length: 8 }, () => ({ type: 'move', index: 0 }));
    const a = runScript(1234, script);
    const b = runScript(1234, script);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it('different seeds diverge', () => {
    const script: BattleAction[] = Array.from({ length: 8 }, () => ({ type: 'move', index: 0 }));
    const a = runScript(1, script);
    const b = runScript(2, script);
    expect(JSON.stringify(a)).not.toBe(JSON.stringify(b));
  });

  it('a Charkit can beat a wild Toastlet and the party earns XP', () => {
    const events = runScript(42, Array.from({ length: 30 }, () => ({ type: 'move', index: 0 })));
    const end = events.find((e) => e.type === 'end');
    expect(end).toBeDefined();
    if (end?.type === 'end' && end.outcome === 'victory') {
      expect(events.some((e) => e.type === 'xp')).toBe(true);
    }
  });

  it('capture pauses for the puzzle and failure lets the wild Ohm rage', () => {
    const party = [makeBattler(GAME_DATA.species(1), 8, GAME_DATA)];
    const foe = makeBattler(GAME_DATA.species(10), 5, GAME_DATA);
    const battle = new Battle({ kind: 'wild', seed: 7, party, foes: [foe] }, GAME_DATA);
    battle.intro();
    const ev = battle.submit({ type: 'capture' });
    expect(ev.some((e) => e.type === 'captureBudget')).toBe(true);
    expect(battle.phase).toBe('capturePuzzle');
    const fail = battle.resolveCapture(false);
    expect(fail.some((e) => e.type === 'captureFail')).toBe(true);
    if (battle.phase !== 'done') {
      const win = battle.submit({ type: 'capture' });
      expect(win.some((e) => e.type === 'captureBudget')).toBe(true);
      const success = battle.resolveCapture(true);
      expect(success.some((e) => e.type === 'captureSuccess')).toBe(true);
      expect(battle.phase).toBe('done');
    }
  });

  it('trainer battles refuse capture and run', () => {
    const party = [makeBattler(GAME_DATA.species(1), 8, GAME_DATA)];
    const foe = makeBattler(GAME_DATA.species(10), 5, GAME_DATA);
    const battle = new Battle(
      { kind: 'trainer', seed: 9, party, foes: [foe], foeName: 'Redbed Raider Clay' },
      GAME_DATA,
    );
    battle.intro();
    expect(battle.submit({ type: 'capture' })[0]).toEqual({
      type: 'message',
      text: "You can't recalibrate a Raider's Ohm!",
    });
    expect(battle.submit({ type: 'run' })[0]?.type).toBe('message');
  });
});
