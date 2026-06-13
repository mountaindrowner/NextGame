import type { Battler, DataView } from './battle/contract';
import { computeStats } from './stats';

/**
 * Evolution (GDD §10.7): hard level threshold PLUS a required salvage item
 * (Resonance Core → stage 2, Prime Core → stage 3). Cancelable/deferrable,
 * no trade-style triggers. Pure — the caller owns the bag and decides when
 * to offer; this only reports eligibility and performs the transform.
 */

export interface EvoOffer {
  partyIndex: number;
  fromNum: number;
  toNum: number;
  fromName: string;
  toName: string;
  item: 'resonance-core' | 'prime-core';
}

/** Which party members are eligible right now, given what cores are on hand.
 * Each offer reserves one core of its grade so a single core can't evolve two
 * Ohms in the same pass. */
export function pendingEvolutions(
  party: readonly Battler[],
  bag: Readonly<Record<string, number>>,
  data: DataView,
): EvoOffer[] {
  const cores: Record<string, number> = {
    'resonance-core': bag['resonance-core'] ?? 0,
    'prime-core': bag['prime-core'] ?? 0,
  };
  const offers: EvoOffer[] = [];
  party.forEach((member, partyIndex) => {
    const species = data.species(member.speciesNum);
    const evo = species.evolution;
    if (!evo) return;
    if (member.level < evo.level) return;
    if ((cores[evo.item] ?? 0) <= 0) return;
    cores[evo.item] = (cores[evo.item] ?? 0) - 1; // reserve it
    offers.push({
      partyIndex,
      fromNum: species.num,
      toNum: evo.toNum,
      fromName: member.name,
      toName: data.species(evo.toNum).name,
      item: evo.item,
    });
  });
  return offers;
}

/** Transform a battler into its next stage in place: recompute base stats at
 * the current level (keeping the Bench lean), keep XP/integrity ratio and
 * battle moves, and learn any new stage-1 moves the evolved form gets at or
 * below its level. Returns the species' display name change for messaging. */
export function applyEvolution(member: Battler, data: DataView): { from: string; to: string } {
  const fromSpecies = data.species(member.speciesNum);
  const evo = fromSpecies.evolution;
  if (!evo) throw new Error(`${fromSpecies.name} cannot evolve`);
  const toSpecies = data.species(evo.toNum);
  const wasNicknamed = member.name !== fromSpecies.name;
  const before = member.stats.integrity;
  const ratio = before > 0 ? member.integrity / before : 1;

  const build = { plating: member.plating, expansionBoard: member.expansionBoard };
  member.speciesNum = toSpecies.num;
  member.stats = computeStats(toSpecies, member.level, build);
  member.integrity = Math.max(1, Math.round(member.stats.integrity * ratio));
  if (!wasNicknamed) member.name = toSpecies.name;

  // pick up the evolved form's earliest signature move if there's room
  for (const entry of toSpecies.learnset) {
    if (entry.level > member.level) continue;
    if (member.moves.length >= 4) break;
    if (member.moves.some((m) => m.id === entry.move)) continue;
    const def = data.move(entry.move);
    member.moves.push({ id: entry.move, pp: def.pp, maxPp: def.pp });
  }
  return { from: fromSpecies.name, to: toSpecies.name };
}
