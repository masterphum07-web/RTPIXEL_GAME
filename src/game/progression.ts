import type {Profile} from './types';

export const PROFILE_SCHEMA=5;
export const DEFAULT_PROFILE:Profile={schema:PROFILE_SCHEMA,xp:0,coins:500,completed:[],bestScores:{},missions:0,questStep:0,inventory:{},equipped:[],unlockedSkills:[],skillPoints:0,completedQuests:[],activeQuests:[],dailyClaimDate:'',dailyStartMissions:0,hiddenFinds:[],visitedZones:['academy'],hp:100,maxHp:100,chapter:1,relationships:{},defeatedMonsters:[],currentZone:'academy',worldPositions:{academy:{x:265,y:155}}};

/** Migrate and clamp old browser saves before any gameplay code reads them. */
export function migrateProfile(value:unknown):Profile{
  if(!value||typeof value!=='object')return structuredClone(DEFAULT_PROFILE);
  const old=value as Partial<Profile>;
  const inventory=old.inventory&&typeof old.inventory==='object'?Object.fromEntries(Object.entries(old.inventory).filter(([,n])=>Number.isFinite(n)&&n>0).map(([id,n])=>[id,Math.floor(n as number)])):{};
  return {...structuredClone(DEFAULT_PROFILE),...old,schema:PROFILE_SCHEMA,
    xp:Math.max(0,Number.isFinite(old.xp)?Math.floor(old.xp!):0),coins:Math.max(0,Number.isFinite(old.coins)?Math.floor(old.coins!):500),
    questStep:Math.min(5,Math.max(0,Number.isFinite(old.questStep)?Math.floor(old.questStep!):0)),
    completed:Array.isArray(old.completed)?old.completed.filter(x=>typeof x==='string'):[],bestScores:old.bestScores&&typeof old.bestScores==='object'?old.bestScores:{},
    missions:Math.max(0,Number.isFinite(old.missions)?Math.floor(old.missions!):0),inventory,
    equipped:Array.isArray(old.equipped)?old.equipped.filter(x=>typeof x==='string'):[],unlockedSkills:Array.isArray(old.unlockedSkills)?old.unlockedSkills.filter(x=>typeof x==='string'):[],
    skillPoints:Math.max(0,Number.isFinite(old.skillPoints)?Math.floor(old.skillPoints!):(Number.isFinite(old.xp)?Math.floor(old.xp!/100):0)),completedQuests:Array.isArray(old.completedQuests)?old.completedQuests.filter(x=>typeof x==='string'):[],activeQuests:Array.isArray(old.activeQuests)?old.activeQuests.filter(x=>typeof x==='string'):[],
    dailyClaimDate:typeof old.dailyClaimDate==='string'?old.dailyClaimDate:'',dailyStartMissions:Math.max(0,Number.isFinite(old.dailyStartMissions)?Math.floor(old.dailyStartMissions!):0),hiddenFinds:Array.isArray(old.hiddenFinds)?old.hiddenFinds.filter(x=>typeof x==='string'):[],visitedZones:Array.isArray(old.visitedZones)?old.visitedZones.filter(x=>typeof x==='string'):['academy'],
    hp:Math.max(1,Math.min(100,Number.isFinite(old.hp)?Math.floor(old.hp!):100)),maxHp:100,chapter:Math.max(1,Math.min(5,Number.isFinite(old.chapter)?Math.floor(old.chapter!):1)),relationships:old.relationships&&typeof old.relationships==='object'?old.relationships:{},defeatedMonsters:Array.isArray(old.defeatedMonsters)?old.defeatedMonsters.filter(x=>typeof x==='string'):[],currentZone:old.currentZone==='noise-lab'?'noise-lab':'academy',worldPositions:old.worldPositions&&typeof old.worldPositions==='object'?{...structuredClone(DEFAULT_PROFILE.worldPositions),...Object.fromEntries(Object.entries(old.worldPositions).filter(([,v])=>v&&Number.isFinite(v.x)&&Number.isFinite(v.y)).map(([zone,v])=>[zone,{x:Math.max(16,Math.min(496,Math.floor(v.x))),y:Math.max(16,Math.min(272,Math.floor(v.y)))}]))}:structuredClone(DEFAULT_PROFILE.worldPositions)};
}
export function levelForXp(xp:number){return Math.floor(Math.max(0,xp)/100)+1;}
export function rankForScore(score:number){return score>=90?'S':score>=75?'A':score>=55?'B':'C';}
export function addItem(profile:Profile,id:string,quantity=1){profile.inventory[id]=(profile.inventory[id]||0)+quantity;}
export function removeItem(profile:Profile,id:string,quantity=1){if((profile.inventory[id]||0)<quantity)return false;profile.inventory[id]-=quantity;if(profile.inventory[id]===0)delete profile.inventory[id];return true;}
export function grantXp(profile:Profile,amount:number){const before=levelForXp(profile.xp);profile.xp+=Math.max(0,Math.floor(amount));const after=levelForXp(profile.xp);if(after>before)profile.skillPoints+=after-before;return after-before;}
export function dayKey(date=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);}
