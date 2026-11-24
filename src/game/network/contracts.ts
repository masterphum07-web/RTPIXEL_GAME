/**
 * Phase 8 boundary for a future server adapter.
 * The current build is local single-player and has no transport implementation.
 * Currency, rewards, inventory and quest completion must be server-authoritative
 * before any contract here is used to connect real players.
 */
export interface PlayerPresence {
  playerId:string;
  displayName:string;
  zoneId:string;
  x:number;
  y:number;
  facing:'up'|'down'|'left'|'right';
  animation:'idle'|'walk';
  updatedAt:number;
}

export interface PartyMember {playerId:string;role:'host'|'member';joinedAt:number;}
export interface PartyRoom {partyId:string;leaderId:string;zoneId:string;members:PartyMember[];capacity:2|3|4;}
export interface CoOpInstance {instanceId:string;partyId:string;scenarioId:string;state:'waiting'|'active'|'complete'|'abandoned';createdAt:number;}
export interface LeaderboardEntry {playerId:string;displayName:string;seasonId:string;score:number;rank:'C'|'B'|'A'|'S';submittedAt:number;}

export type ClientMessage=
  | {type:'presence:update';presence:PlayerPresence}
  | {type:'party:invite';partyId:string;targetPlayerId:string}
  | {type:'party:respond';partyId:string;accept:boolean}
  | {type:'instance:join';instanceId:string}
  | {type:'instance:leave';instanceId:string};

export type ServerMessage=
  | {type:'presence:snapshot';players:PlayerPresence[]}
  | {type:'party:updated';party:PartyRoom}
  | {type:'instance:updated';instance:CoOpInstance}
  | {type:'error';code:string;message:string};

export interface MultiplayerTransport {
  connect(sessionToken:string):Promise<void>;
  send(message:ClientMessage):void;
  subscribe(listener:(message:ServerMessage)=>void):()=>void;
  disconnect():void;
}
