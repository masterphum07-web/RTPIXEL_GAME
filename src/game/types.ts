export type CaseId = 'chest-pa' | 'chest-lateral' | 'hand-pa' | 'wrist-pa' | 'knee-ap';
export type GameView = 'hub' | 'mission' | 'library' | 'skills' | 'learn' | 'results' | 'inventory' | 'shop' | 'world-map' | 'collection' | 'dungeon';
export interface Technique { kvp: number; ma:number; mas: number; sid: number; oid:number; time: number; grid: boolean; aec: boolean; }
export interface CaseInfo { id: CaseId; title: string; short: string; view: string; objective: string; anatomy: string; hint: string; challenge: string; unlockedAt: number; }
export interface Profile {
  schema: number; xp: number; coins: number; completed: string[]; bestScores: Record<string, number>; missions: number; questStep:number;
  inventory:Record<string,number>; equipped:string[]; unlockedSkills:string[]; skillPoints:number;
  completedQuests:string[]; activeQuests:string[]; dailyClaimDate:string; dailyStartMissions:number; hiddenFinds:string[]; visitedZones:string[];
  hp:number; maxHp:number; chapter:number; relationships:Record<string,number>; defeatedMonsters:string[]; currentZone:string; worldPositions:Record<string,{x:number;y:number}>;
}
