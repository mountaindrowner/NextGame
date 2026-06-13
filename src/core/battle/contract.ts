import type {
  BattleStatKey,
  MoveDef,
  SpeciesDef,
  StatBlock,
  StatusName,
  TypeChart,
} from '../defs';

/**
 * The battle wall (GDD §10.9 / contract §2.1). Scenes speak BattleAction in
 * and BattleEvent out — nothing else. A future tactical mode is a new driver
 * on this same contract.
 */

export interface DataView {
  species(num: number): SpeciesDef;
  move(id: string): MoveDef;
  chart: TypeChart;
}

export interface MoveSlot {
  id: string;
  pp: number;
  maxPp: number;
}

export interface Battler {
  speciesNum: number;
  /** display name (nickname or species name) */
  name: string;
  level: number;
  xp: number;
  stats: StatBlock;
  integrity: number; // current
  moves: MoveSlot[];
  status?: StatusName; // major
  statusTurns: number;
  glitchedTurns: number; // volatile
  stages: Record<BattleStatKey, number>;
  rage: number;
  /** persisted Bench build so stats recompute correctly on level-up/evolution */
  plating?: 'heavy' | 'light' | 'factory';
  expansionBoard?: boolean;
}

export interface BattleSetup {
  kind: 'wild' | 'trainer';
  seed: number;
  party: Battler[]; // player party, index 0 active
  foes: Battler[]; // wild: length 1
  foeName?: string; // trainer display name
}

export type BattleAction =
  | { type: 'move'; index: number }
  | { type: 'switch'; index: number }
  | { type: 'item'; itemId: string; targetIndex: number }
  | { type: 'run' }
  | { type: 'capture' };

export type Side = 'player' | 'foe';

export type BattleEvent =
  | { type: 'message'; text: string }
  | { type: 'moveUsed'; side: Side; name: string; moveName: string }
  | { type: 'damage'; side: Side; amount: number; integrity: number; max: number; effectiveness: number; crit: boolean }
  | { type: 'heal'; side: Side; amount: number; integrity: number; max: number }
  | { type: 'statusSet'; side: Side; status: StatusName }
  | { type: 'statusCleared'; side: Side; status: StatusName }
  | { type: 'stageChange'; side: Side; stat: BattleStatKey; delta: number }
  | { type: 'switchIn'; side: Side; name: string; speciesNum: number; level: number; integrity: number; max: number }
  | { type: 'faint'; side: Side; name: string }
  | { type: 'xp'; name: string; amount: number }
  | { type: 'levelUp'; name: string; level: number }
  | { type: 'moveLearned'; name: string; moveName: string }
  | { type: 'captureBudget'; timerSeconds: number; gridSize: number; decoys: number }
  | { type: 'captureSuccess'; speciesNum: number; name: string }
  | { type: 'captureFail'; rage: number }
  | { type: 'rageFlee' }
  | { type: 'fled'; ok: boolean }
  | { type: 'end'; outcome: 'victory' | 'defeat' | 'fled' | 'captured' | 'foeFled' };

export type BattlePhase = 'choosing' | 'capturePuzzle' | 'done';
