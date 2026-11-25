import Phaser from 'phaser';
import {ENCOUNTER_QUESTIONS} from './content';

type Direction='up'|'down'|'left'|'right';
interface Enemy {id:string;name:string;hp:number;maxHp:number;x:number;y:number;boss:boolean;}
const enemies:Enemy[]=[
  {id:'noise-slime-a',name:'Noise Slime',hp:2,maxHp:2,x:218,y:118,boss:false},
  {id:'noise-slime-b',name:'Noise Slime',hp:2,maxHp:2,x:330,y:200,boss:false},
  {id:'motion-phantom',name:'Motion Phantom',hp:2,maxHp:2,x:274,y:58,boss:false},
  {id:'noise-king',name:'Noise King',hp:3,maxHp:3,x:446,y:118,boss:true},
];

/** First authored, single-player dungeon. All encounters are answerable learning challenges, never real diagnosis. */
export class DungeonScene extends Phaser.Scene {
  private player!:Phaser.Physics.Arcade.Sprite;
  private keys!:Record<string,Phaser.Input.Keyboard.Key>;
  private virtual:Record<Direction,boolean>={up:false,down:false,left:false,right:false};
  private joystick={x:0,y:0};
  private enemiesLive:Phaser.GameObjects.Container[]=[];
  private enemies:Enemy[]=enemies.map(enemy=>({...enemy}));
  private activeEnemy=0;
  private questionIndex=0;
  private encounterOpen=false;
  private held=false;
  private cleared=false;
  private coatEquipped=false;
  private pendingHit:{x:number;y:number}|null=null;
  private positionSaveClock=0;
  private lastSavedX=0;
  private lastSavedY=0;
  private readonly handleMove=(direction:Direction,active:boolean)=>{if(direction in this.virtual)this.virtual[direction]=active;};
  private readonly handleJoystick=(x:number,y:number)=>{this.joystick={x:Phaser.Math.Clamp(x,-1,1),y:Phaser.Math.Clamp(y,-1,1)};};
  private readonly handleKeyInteract=()=>{if(!this.held){this.held=true;this.tryInteract();}};
  private readonly handleVirtualInteract=(active:boolean)=>{if(active){if(!this.held){this.held=true;this.tryInteract();}}else this.held=false;};
  private readonly handleAnswer=(choice:number,skill?:string)=>this.answer(choice,skill);
  private readonly handleContinue=()=>this.closeEncounter();
  private readonly handleOutfit=(equipped:boolean)=>{this.coatEquipped=equipped;};
  constructor(){super('dungeon');}

  preload(){
    const base=import.meta.env.BASE_URL;
    this.load.atlas('combat-hit-spark',`${base}assets/pixelfx-hit-spark.png`,`${base}assets/pixelfx-hit-spark.json`);
  }

  create(){
    this.enemies=enemies.map(enemy=>({...enemy}));this.activeEnemy=0;this.encounterOpen=false;this.cleared=false;this.held=false;
    this.game.events.emit('request-player-outfit',(equipped:boolean)=>{this.coatEquipped=equipped;});
    this.game.events.on('player-outfit',this.handleOutfit);
    this.cameras.main.setRoundPixels(true);this.physics.world.setBounds(0,0,512,288);
    if(!this.anims.exists('combat-hit-spark-burst'))this.anims.create({key:'combat-hit-spark-burst',frames:this.anims.generateFrameNames('combat-hit-spark',{prefix:'hit-spark ',start:0,end:15}),frameRate:30,repeat:0});
    const bg=this.add.graphics().setDepth(-5);
    bg.fillStyle(0x10182f).fillRect(0,0,512,288);
    // Pixel tiled lab floor, alternating cool stone panels and cyan seams.
    for(let y=0;y<288;y+=32)for(let x=0;x<512;x+=32){bg.fillStyle((x/32+y/32)%2?0x202c4c:0x253553).fillRect(x+1,y+1,30,30);bg.fillStyle(0x344765).fillRect(x+1,y+1,30,2);bg.fillStyle(0x17223b).fillRect(x+1,y+29,30,2);if((x+y)%96===0){bg.fillStyle(0x3b7891,.7).fillRect(x+8,y+8,2,2);}}
    // Room divisions with passable door gaps.
    bg.fillStyle(0x3e526e).fillRect(0,0,512,8).fillRect(0,280,512,8).fillRect(0,0,8,288).fillRect(504,0,8,288);
    bg.fillStyle(0x425b79).fillRect(158,8,8,132).fillRect(158,176,8,104).fillRect(302,8,8,65).fillRect(302,112,8,168);
    bg.fillStyle(0x6dd8e5,.55).fillRect(158,140,8,36).fillRect(302,73,8,39);
    // Overhead panels, shelves, monitors and a lab bench.
    for(const x of [42,96,202,260,356,420]){bg.fillStyle(0x111d38).fillRect(x,25,28,15);bg.fillStyle(0x365779).fillRect(x+2,27,24,11);bg.fillStyle(0x70e0ee,.8).fillRect(x+5,30,8,2);bg.fillStyle(0x4cb9ce,.8).fillRect(x+5,34,15,1);}
    bg.fillStyle(0x514e67).fillRect(352,154,100,34);bg.fillStyle(0x8a8f9f).fillRect(356,151,92,4);bg.fillStyle(0x283d5e).fillRect(364,160,24,18);bg.fillStyle(0x56bccc).fillRect(367,163,18,2);
    bg.fillStyle(0x162744).fillRect(16,226,42,34);bg.fillStyle(0x315778).fillRect(19,229,36,4);bg.fillStyle(0x3e6c79).fillRect(23,237,28,2);bg.fillStyle(0x56607c).fillRect(18,263,38,4);
    bg.fillStyle(0x14223b).fillRect(28,15,90,18);bg.fillStyle(0x236387).fillRect(31,17,84,13);bg.fillStyle(0xa8f0fa).fillRect(38,21,70,3);
    this.add.text(72,22,'NOISE LAB · LEVEL 02',{fontFamily:'monospace',fontSize:'7px',color:'#d7f6ff'}).setOrigin(.5).setDepth(2);
    // Invisible Arcade walls align with the illustrated separators.
    const walls=this.physics.add.staticGroup();
    this.block(walls,256,4,512,8);this.block(walls,256,284,512,8);this.block(walls,4,144,8,288);this.block(walls,508,144,8,288);
    this.block(walls,162,74,8,132);this.block(walls,162,228,8,104);this.block(walls,306,40,8,65);this.block(walls,306,196,8,168);
    this.player=this.physics.add.sprite(42,238,'hospital-people',32).setScale(.25).setDepth(20).setCollideWorldBounds(true).setSize(40,44).setOffset(12,48);
    this.game.events.emit('request-world-position',(position:{x:number;y:number}|null)=>{if(position&&Number.isFinite(position.x)&&Number.isFinite(position.y))this.player.setPosition(Phaser.Math.Clamp(position.x,18,494),Phaser.Math.Clamp(position.y,18,270));});
    this.physics.add.collider(this.player,walls);this.cameras.main.startFollow(this.player,true,.16,.16);this.cameras.main.setBounds(0,0,512,288);
    this.keys={W:this.input.keyboard!.addKey('W'),A:this.input.keyboard!.addKey('A'),S:this.input.keyboard!.addKey('S'),D:this.input.keyboard!.addKey('D'),UP:this.input.keyboard!.addKey('UP'),DOWN:this.input.keyboard!.addKey('DOWN'),LEFT:this.input.keyboard!.addKey('LEFT'),RIGHT:this.input.keyboard!.addKey('RIGHT'),E:this.input.keyboard!.addKey('E')};
    this.input.keyboard!.on('keydown-E',this.handleKeyInteract);
    this.game.events.on('virtual-move',this.handleMove);this.game.events.on('virtual-joystick',this.handleJoystick);this.game.events.on('virtual-interact',this.handleVirtualInteract);this.game.events.on('combat-answer',this.handleAnswer);this.game.events.on('combat-continue',this.handleContinue);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN,()=>{this.input.keyboard?.off('keydown-E',this.handleKeyInteract);this.game.events.off('virtual-move',this.handleMove);this.game.events.off('virtual-joystick',this.handleJoystick);this.game.events.off('virtual-interact',this.handleVirtualInteract);this.game.events.off('combat-answer',this.handleAnswer);this.game.events.off('combat-continue',this.handleContinue);this.game.events.off('player-outfit',this.handleOutfit);this.joystick={x:0,y:0};});
    this.add.text(18,266,'EXIT ←',{fontFamily:'monospace',fontSize:'7px',color:'#b4cde5'}).setScrollFactor(0).setDepth(30);
    this.drawEnemies();
  }

  update(){
    if(this.encounterOpen){this.player.setVelocity(0,0);return;}
    let x=(this.keys.LEFT.isDown||this.keys.A.isDown||this.virtual.left?-1:0)+(this.keys.RIGHT.isDown||this.keys.D.isDown||this.virtual.right?1:0)+this.joystick.x;
    let y=(this.keys.UP.isDown||this.keys.W.isDown||this.virtual.up?-1:0)+(this.keys.DOWN.isDown||this.keys.S.isDown||this.virtual.down?1:0)+this.joystick.y;
    const magnitude=Math.hypot(x,y);if(magnitude>1){x/=magnitude;y/=magnitude;}this.player.setVelocity(x*68,y*68);
    if(x||y){const facing=Math.abs(x)>Math.abs(y)?(x<0?2:3):(y<0?1:0),frameBase=(this.coatEquipped?5:2)*16;this.player.setFrame(frameBase+facing*4+(Math.floor(this.time.now/125)%4));}
    if(this.time.now-this.positionSaveClock>2000&&(Math.abs(this.player.x-this.lastSavedX)>3||Math.abs(this.player.y-this.lastSavedY)>3)){this.positionSaveClock=this.time.now;this.lastSavedX=this.player.x;this.lastSavedY=this.player.y;this.game.events.emit('world-position',{zone:'noise-lab',x:Math.round(this.player.x),y:Math.round(this.player.y)});}
    if(!this.keys.E.isDown&&this.held)this.held=false;
    if(this.player.x<18&&this.player.y>218)this.game.events.emit('dungeon-exit');
  }

  private block(group:Phaser.Physics.Arcade.StaticGroup,x:number,y:number,w:number,h:number){const o=group.create(x,y,'hospital-people',0).setVisible(false);(o.body as Phaser.Physics.Arcade.StaticBody).setSize(w,h,true);}
  private drawEnemies(){
    this.enemiesLive=[];
    for(const enemy of this.enemies){
      const c=this.add.container(enemy.x,enemy.y).setDepth(enemy.y+4);const g=this.add.graphics();
      const isMotion=enemy.id==='motion-phantom',body=enemy.boss?0x964dc2:isMotion?0x6c65c5:0x33a9d2,glow=enemy.boss?0xe796ff:isMotion?0xc2b9ff:0x91efff;
      g.fillStyle(0x111b36,.65).fillEllipse(0,12,30,7);if(isMotion){g.fillStyle(body,.35).fillRect(-17,-13,17,25);g.fillStyle(body,.65).fillRect(-11,-10,22,22);g.fillStyle(body).fillRect(-7,-14,14,26);}else{g.fillStyle(body).fillRect(-11,-6,22,15);g.fillRect(-7,-13,14,9);g.fillRect(-15,-2,4,8);g.fillRect(11,-2,4,8);}g.fillStyle(glow).fillRect(-6,-7,4,3).fillRect(3,-7,4,3);g.fillStyle(0x132643).fillRect(-4,1,8,2);
      g.fillStyle(0x101c38).fillRect(-13,-22,26,3);g.fillStyle(0x172746).fillRect(-12,-21,24,2);g.fillStyle(0xe45e7a).fillRect(-12,-21,24*enemy.hp/enemy.maxHp,2);
      c.add(g);this.tweens.add({targets:c,y:enemy.y-2,duration:460,yoyo:true,repeat:-1,ease:'Stepped',easeParams:[2]});this.enemiesLive.push(c);
    }
  }
  private tryInteract(){
    if(this.encounterOpen)return;
    if(this.player.x<68&&this.player.y>218){this.game.events.emit('dungeon-exit');return;}
    if(this.cleared){this.game.events.emit('dungeon-finish');return;}
    const enemy=this.enemies[this.activeEnemy];if(!enemy)return;
    if(Phaser.Math.Distance.Between(this.player.x,this.player.y,enemy.x,enemy.y)>34){this.game.events.emit('dungeon-hint','เข้าใกล้ Noise Slime แล้วกด E เพื่อวิเคราะห์');return;}
    this.encounterOpen=true;this.questionIndex=this.activeEnemy%ENCOUNTER_QUESTIONS.length;
    this.game.events.emit('dungeon-encounter',{enemy,question:ENCOUNTER_QUESTIONS[this.questionIndex]});
  }
  private answer(choice:number,skill?:string){
    if(!this.encounterOpen)return;
    const enemy=this.enemies[this.activeEnemy],question=ENCOUNTER_QUESTIONS[this.questionIndex];
    if(choice!==question.answer){this.game.events.emit('combat-result',{correct:false,feedback:question.feedback,enemy,question,skill});return;}
    const boost=(skill==='noise-detection'&&question.topic==='noise'||skill==='anatomy-scan'&&question.topic==='artifact')?1:0;
    enemy.hp-=1+boost;this.pendingHit={x:enemy.x,y:enemy.y};this.game.events.emit('combat-result',{correct:true,feedback:question.feedback,enemy,question,skill});
    if(enemy.hp<=0){this.enemiesLive[this.activeEnemy]?.setVisible(false);this.activeEnemy++;this.game.events.emit('monster-defeated',{id:enemy.id,boss:enemy.boss,name:enemy.name});if(this.activeEnemy>=enemies.length){this.cleared=true;this.game.events.emit('dungeon-cleared');}}
  }
  public closeEncounter(){
    this.encounterOpen=false;
    if(this.pendingHit){
      const hit=this.add.sprite(this.pendingHit.x,this.pendingHit.y,'combat-hit-spark').setOrigin(44/136,64/80).setScale(.48).setDepth(this.pendingHit.y+30).play('combat-hit-spark-burst');
      hit.once(Phaser.Animations.Events.ANIMATION_COMPLETE,()=>hit.destroy());
      this.pendingHit=null;
    }
  }
}
