import Phaser from 'phaser';

type ContactKind='mentor'|'reception'|'radiologist'|'radiology-door';
interface Contact { x:number; y:number; kind:ContactKind; }
const TILE=16, MAP_W=32, MAP_H=18;

/** Top-down, tile-based hospital courtyard. The world is authored at native pixel scale. */
export class HospitalScene extends Phaser.Scene {
  private player!:Phaser.Physics.Arcade.Sprite;
  private keys!:Record<string,Phaser.Input.Keyboard.Key>;
  private facing=0;
  private contacts:Contact[]=[];
  private interactLock=false;
  private virtual:{up:boolean;down:boolean;left:boolean;right:boolean}={up:false,down:false,left:false,right:false};
  private readonly handleKeyInteract=()=>{if(!this.interactLock){this.interactLock=true;this.tryInteract();}};
  private readonly releaseKeyInteract=()=>{this.interactLock=false;};
  private readonly handleVirtualInteract=()=>this.tryInteract();
  private readonly handleQuestUpdated=()=>this.events.emit('quest-world-refresh');
  private readonly handleVirtualMove=(direction:keyof HospitalScene['virtual'],active:boolean)=>{this.virtual[direction]=active;};
  private readonly handlePointerDown=(pointer:Phaser.Input.Pointer)=>{
    const world=this.cameras.main.getWorldPoint(pointer.x,pointer.y);
    if(Math.abs(world.x-256)<28&&Math.abs(world.y-126)<28)this.interact('radiology-door');
  };
  constructor(){super('hospital');}

  create(){
    this.cameras.main.setRoundPixels(true);
    this.physics.world.setBounds(0,0,MAP_W*TILE,MAP_H*TILE);
    this.createTiles(); this.createTileWorld(); this.createDecor(); this.createSpriteSheet();

    this.player=this.physics.add.sprite(256,205,'hospital-people',16);
    this.player.setDepth(30).setCollideWorldBounds(true).setSize(10,11).setOffset(3,12);
    this.player.setData('walkFrame',0);
    const walls=this.mapLayer;
    if(walls)this.physics.add.collider(this.player,walls);
    const props=this.physics.add.staticGroup();
    this.addBlocker(props,150,151,44,16); // reception counter
    this.addBlocker(props,210,152,30,9); // waiting seats
    this.addBlocker(props,373,153,32,12); // bench
    this.addBlocker(props,88,160,22,27); // bus shelter
    this.physics.add.collider(this.player,props);

    this.contacts=[{x:267,y:172,kind:'mentor'},{x:185,y:172,kind:'reception'},{x:344,y:172,kind:'radiologist'},{x:256,y:126,kind:'radiology-door'}];
    const npcGroup=this.physics.add.group({allowGravity:false,immovable:true});
    this.createNpc(npcGroup,267,172,0); this.createNpc(npcGroup,185,172,1); this.createNpc(npcGroup,344,172,5); this.createNpc(npcGroup,289,208,3);
    this.physics.add.collider(this.player,npcGroup);
    this.player.setPosition(256,155);
    const keyboard=this.input.keyboard!;
    this.keys={W:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),A:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),S:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),D:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),UP:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),DOWN:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),LEFT:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),RIGHT:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),E:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)};
    this.cameras.main.startFollow(this.player,true,.12,.12);
    this.cameras.main.setBounds(0,0,MAP_W*TILE,MAP_H*TILE);
    this.input.on('pointerdown',this.handlePointerDown);
    this.game.events.on('quest-updated',this.handleQuestUpdated);
    this.game.events.on('virtual-move',this.handleVirtualMove);
    this.game.events.on('virtual-interact',this.handleVirtualInteract);
    keyboard.on('keydown-E',this.handleKeyInteract);
    keyboard.on('keyup-E',this.releaseKeyInteract);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN,()=>{
      this.input.off('pointerdown',this.handlePointerDown);
      keyboard.off('keydown-E',this.handleKeyInteract);
      keyboard.off('keyup-E',this.releaseKeyInteract);
      this.game.events.off('quest-updated',this.handleQuestUpdated);
      this.game.events.off('virtual-move',this.handleVirtualMove);
      this.game.events.off('virtual-interact',this.handleVirtualInteract);
    });
  }

  private mapLayer:Phaser.Tilemaps.TilemapLayer|null=null;

  update(_time:number,delta:number){
    const body=this.player.body as Phaser.Physics.Arcade.Body;
    let dx=0,dy=0;
    if(this.keys.LEFT.isDown||this.keys.A.isDown||this.virtual.left)dx=-1;
    if(this.keys.RIGHT.isDown||this.keys.D.isDown||this.virtual.right)dx=1;
    if(this.keys.UP.isDown||this.keys.W.isDown||this.virtual.up)dy=-1;
    if(this.keys.DOWN.isDown||this.keys.S.isDown||this.virtual.down)dy=1;
    if(dx&&dy){dx*=.707;dy*=.707;}
    body.setVelocity(dx*68,dy*68);
    const moving=Boolean(dx||dy);
    if(moving){this.facing=Math.abs(dx)>Math.abs(dy)?(dx<0?2:3):(dy<0?1:0);const f=(Math.floor(_time/155)%2);this.player.setFrame(16+this.facing*2+f);}
    else this.player.setFrame(16+this.facing*2);
    if(!moving&&delta>0){body.setVelocity(0,0);}
  }

  private createTiles(){
    if(this.textures.exists('hospital-tiles'))return;
    const texture=this.textures.createCanvas('hospital-tiles',TILE*12,TILE);
    if(!texture)return;
    const c=texture.getContext();
    const px=(tile:number,x:number,y:number,w:number,h:number,color:string)=>{c.fillStyle=color;c.fillRect(tile*TILE+x,y,w,h);};
    // 0 grass, 1 flower lawn, 2 sidewalk, 3 road, 4 hospital wall, 5 window, 6 hedge, 7 door, 8 tile floor, 9 fountain, 10 paving detail, 11 roof.
    for(let y=0;y<TILE;y++)for(let x=0;x<TILE;x++)px(0,x,y,1,1,(x*3+y*5)%17===0?'#4f9a64':(x+y)%5===0?'#468b5b':'#3f8054');
    px(0,2,3,2,1,'#75ad69');px(0,11,9,2,1,'#78b171');
    for(let y=0;y<TILE;y++)for(let x=0;x<TILE;x++)px(1,x,y,1,1,(x+y)%4===0?'#62a168':'#468756');
    px(1,5,4,2,2,'#f09ab2');px(1,12,11,2,2,'#ffd36b');px(1,2,12,2,2,'#e6e6fc');
    for(let y=0;y<TILE;y++)for(let x=0;x<TILE;x++)px(2,x,y,1,1,(x+y)%7===0?'#dec9b5':(x%4===0||y%4===0)?'#c8b9aa':'#d4c4b3');
    for(let y=0;y<TILE;y++)for(let x=0;x<TILE;x++)px(3,x,y,1,1,(x*7+y*11)%13===0?'#566073':(x+y)%6===0?'#414b62':'#38445c');
    for(let y=0;y<TILE;y++)for(let x=0;x<TILE;x++)px(4,x,y,1,1,(x%8===0||y%8===0)?'#92a1c7':'#c7d0e2');
    px(4,1,1,14,2,'#e4e8f2');
    for(let y=0;y<TILE;y++)for(let x=0;x<TILE;x++)px(5,x,y,1,1,(x%8===0||y%8===0)?'#20365d':(x+y)%4===0?'#6bb8e2':'#438dc7');
    px(5,2,2,5,3,'#a6e8ff');px(5,10,8,4,3,'#91d9f5');
    for(let y=0;y<TILE;y++)for(let x=0;x<TILE;x++)px(6,x,y,1,1,(x+y)%3===0?'#35724f':'#2e684a');
    px(6,2,2,12,5,'#488d5b');px(6,5,1,7,2,'#62a968');
    for(let y=0;y<TILE;y++)for(let x=0;x<TILE;x++)px(7,x,y,1,1,(x%8===0||y%8===0)?'#25365b':'#516a9b');
    px(7,3,2,10,12,'#796b70');px(7,4,3,8,10,'#8a7a78');px(7,9,8,1,1,'#f0c762');
    for(let y=0;y<TILE;y++)for(let x=0;x<TILE;x++)px(8,x,y,1,1,(x%8===0||y%8===0)?'#7084ac':'#8798ba');
    for(let y=0;y<TILE;y++)for(let x=0;x<TILE;x++)px(9,x,y,1,1,(x+y)%3===0?'#41c4e7':'#2189c7');
    px(9,2,2,12,2,'#81e9ff');px(9,3,12,9,2,'#52d4f3');
    for(let y=0;y<TILE;y++)for(let x=0;x<TILE;x++)px(10,x,y,1,1,(x+y)%5===0?'#c5ae9f':'#d5c4b2');
    for(let y=0;y<TILE;y++)for(let x=0;x<TILE;x++)px(11,x,y,1,1,(x%8===0||y%8===0)?'#516b9b':'#526c9b');
    px(11,2,2,12,5,'#617eaf');px(11,3,1,10,2,'#7c94bc');
    texture.refresh();
  }

  private createTileWorld(){
    const tilemap=this.make.tilemap({tileWidth:TILE,tileHeight:TILE,width:MAP_W,height:MAP_H});
    const tiles=tilemap.addTilesetImage('hospital-tiles','hospital-tiles',TILE,TILE,0,0);
    if(!tiles)return;
    const ground=tilemap.createBlankLayer('ground',tiles,0,0)!;
    const structures=tilemap.createBlankLayer('structures',tiles,0,0)!;
    ground.fill(0);
    // Road, broad pavement, hospital floor and courtyard approach.
    for(let y=0;y<MAP_H;y++){ground.putTileAt(3,1,y);ground.putTileAt(3,2,y);ground.putTileAt(3,3,y);}
    for(let x=4;x<29;x++)for(let y=8;y<11;y++)ground.putTileAt(2,x,y);
    for(let y=10;y<17;y++){ground.putTileAt(2,15,y);ground.putTileAt(2,16,y);}
    for(let x=12;x<21;x++)for(let y=13;y<18;y++)ground.putTileAt(1,x,y);
    for(let x=13;x<20;x++)for(let y=14;y<17;y++)ground.putTileAt(2,x,y);
    // Hospital front and radiology wing. Door tiles at the center stay passable.
    for(let x=8;x<24;x++)for(let y=0;y<7;y++)structures.putTileAt(4,x,y);
    for(let x=9;x<23;x+=3){structures.putTileAt(5,x,2);structures.putTileAt(5,x+1,2);structures.putTileAt(5,x,4);structures.putTileAt(5,x+1,4);}
    for(let x=8;x<24;x++)structures.putTileAt(4,x,7);
    structures.putTileAt(7,15,7);structures.putTileAt(7,16,7);
    structures.setCollision([4,5]);this.mapLayer=structures;
    // Side planting and trimmed greenery.
    for(let y=4;y<7;y++){structures.putTileAt(6,6,y);structures.putTileAt(6,25,y);}
    structures.setCollision([4,5,6]);
    // Extra side entrances and windows suggest linked hospital departments.
    structures.putTileAt(5,11,6);structures.putTileAt(5,20,6);
  }

  private createDecor(){
    const d=this.add.graphics().setDepth(5);
    const rect=(x:number,y:number,w:number,h:number,color:number)=>{d.fillStyle(color,1);d.fillRect(x,y,w,h);};
    const tree=(x:number,y:number)=>{rect(x+6,y+13,6,16,0x674b3c);rect(x+4,y+18,10,3,0x79543e);rect(x,y+3,18,13,0x245d43);rect(x+2,y,14,12,0x348254);rect(x+4,y-2,10,8,0x4e9b5d);rect(x+3,y+3,4,3,0x76b86a);rect(x+11,y+6,4,3,0x65ad62);};
    // Sign, glass entrance, ambulance bay, shelter and direction posts.
    rect(206,68,98,22,0x304b81);rect(209,70,92,17,0x2475a8);rect(213,72,84,12,0x24517e);rect(223,74,63,2,0xc7f1ff);rect(239,75,31,3,0xe6f2ff);
    rect(241,111,30,2,0x91d8ff);rect(241,113,30,7,0x263b65);rect(243,114,12,5,0x71c7ed);rect(257,114,12,5,0xa9dcf0);rect(255,116,1,3,0x33466d);
    rect(5,92,42,24,0x2c3a55);rect(8,89,34,6,0xd4e2ef);rect(10,91,30,3,0xf7f1e7);rect(12,96,24,10,0x74b8df);rect(12,107,5,3,0x344966);rect(32,107,5,3,0x344966);rect(9,96,3,5,0xe75d62);rect(36,96,4,5,0x5399e4);
    rect(70,129,32,23,0x34445f);rect(72,131,28,15,0x4b78a0);rect(74,133,24,9,0x203e62);rect(86,147,2,8,0x655548);rect(69,155,8,2,0x283b5a);rect(93,155,8,2,0x283b5a);
    // Check-in counter and waiting seats.
    rect(143,142,55,14,0x7b6758);rect(145,140,52,4,0xd5c6af);rect(147,144,46,9,0x957b67);rect(150,145,39,5,0x6f89ac);rect(160,138,13,3,0x4e6080);
    for(const x of [207,222]){rect(x,143,11,7,0x495d7e);rect(x,151,2,3,0x283955);rect(x+8,151,2,3,0x283955);rect(x+1,144,9,3,0x7194ad);}
    // Planted beds and garden edging.
    for(const [x,y] of [[88,188],[112,190],[402,191],[430,189],[92,255],[410,254]]){tree(x,y);}
    for(let x=80;x<132;x+=6){rect(x,176,4,2,0x3b7351);rect(x+1,174,2,2,(x%2)?0xf2a3b8:0xf4d47c);}
    for(let x=376;x<430;x+=6){rect(x,176,4,2,0x3b7351);rect(x+1,174,2,2,(x%2)?0xe99caa:0xf6ce73);}
    // Fountain and lampposts.
    rect(219,222,75,6,0x77665a);rect(222,218,69,6,0xb8aa99);rect(228,215,57,5,0x4f668e);rect(234,216,45,4,0x56c8ed);rect(237,214,39,2,0xb2f0ff);rect(249,207,12,10,0x98b2ce);rect(252,202,6,8,0x61ccf0);rect(248,199,4,5,0x8ce8ff);rect(260,197,4,7,0x8ce8ff);
    for(const x of [122,363]){rect(x,169,4,22,0x34455e);rect(x-3,166,10,6,0x485f82);rect(x-1,164,6,3,0xf2d78b);rect(x-2,170,8,2,0x6d7e9d);}
    // Benches, direction sign, and safety bollards.
    rect(379,145,34,3,0x795646);rect(380,149,32,2,0xad8060);rect(383,151,3,7,0x3e4559);rect(407,151,3,7,0x3e4559);
    rect(108,160,31,3,0x315181);rect(110,164,27,2,0x4c74a3);rect(112,166,3,4,0x3b4b69);rect(132,166,3,4,0x3b4b69);
    for(const x of [128,176,334,422]){rect(x,183,3,7,0x263d61);rect(x-1,181,5,3,0xf0c85d);}
    // Room marker over the radiology doors.
    rect(236,91,40,10,0x253a63);rect(237,92,38,7,0x1c75a6);rect(239,94,34,3,0xb5ecff);
    this.createLittleWallMonitors(d);
    this.drawPixelSign(d,220,74,'RADIOLOGY');
  }

  private drawPixelSign(g:Phaser.GameObjects.Graphics,x:number,y:number,text:string){
    const font:Record<string,string[]>={R:['110','101','110','101','101'],A:['010','101','111','101','101'],D:['110','101','101','101','110'],I:['111','010','010','010','111'],O:['111','101','101','101','111'],L:['100','100','100','100','111'],G:['111','100','101','101','111'],Y:['101','101','010','010','010']};
    let cursor=x;
    for(const char of text){const glyph=font[char];if(!glyph)continue;for(let row=0;row<glyph.length;row++)for(let col=0;col<glyph[row].length;col++)if(glyph[row][col]==='1'){g.fillStyle((row+col)%3===0?0xe5f3ff:0xb8eaff,1);g.fillRect(cursor+col*2,y+row*2,2,2);}cursor+=8;}
  }

  private createLittleWallMonitors(d:Phaser.GameObjects.Graphics){
    d.fillStyle(0x203962,1);d.fillRect(137,27,24,16);d.fillStyle(0x4da2d5,1);d.fillRect(139,29,20,11);d.fillStyle(0x95e8ff,1);d.fillRect(142,31,13,2);d.fillRect(142,35,8,2);d.fillStyle(0x586784,1);d.fillRect(146,43,5,3);
    d.fillStyle(0x203962,1);d.fillRect(304,32,23,16);d.fillStyle(0x65b5e6,1);d.fillRect(306,34,19,11);d.fillStyle(0xb1edff,1);d.fillRect(308,36,8,2);d.fillRect(308,40,13,1);
  }

  private createSpriteSheet(){
    if(this.textures.exists('hospital-people'))return;
    const tex=this.textures.createCanvas('hospital-people',16*48,24);if(!tex)return;
    const c=tex.getContext();
    const draw=(frame:number,kind:number,dir:number,walk:number)=>{
      const ox=frame*16;
      const p=(x:number,y:number,w:number,h:number,col:string)=>{c.fillStyle=col;c.fillRect(ox+x,y,w,h);};
      const hair=kind===2?'#342c36':'#332943';const skin=kind===2?'#edbf9c':'#edbd9e';
      p(4,2,8,2,hair);p(3,4,10,5,hair);p(4,8,8,6,skin);p(3,6,2,4,hair);p(11,4,2,4,hair);
      if(dir===1){p(4,7,8,6,hair);p(3,5,2,5,hair);p(11,5,2,5,hair);}
      else if(dir===2){p(3,8,3,5,hair);p(4,9,2,2,'#202840');p(10,10,1,1,'#d98d82');}
      else if(dir===3){p(10,8,3,5,hair);p(10,9,2,2,'#202840');p(4,10,1,1,'#d98d82');}
      else {if(walk===0){p(5,9,2,2,'#202840');p(10,9,2,2,'#202840');}else{p(5,9,1,2,'#202840');p(10,9,1,2,'#202840');}}
      if(kind===2){p(3,14,10,5,'#27518c');p(2,15,3,5,'#27518c');p(11,15,3,5,'#27518c');p(5,17,6,2,'#51c5ec');p(4,18,3,4,walk?'#344c7a':'#293e6a');p(9,18,3,4,walk?'#293e6a':'#344c7a');p(3,22,4,2,'#e7eaf2');p(9,22,4,2,'#e7eaf2');}
      else if(kind===3){p(3,14,10,5,'#d4e5f2');p(2,15,3,5,'#d4e5f2');p(11,15,3,5,'#d4e5f2');p(4,18,3,4,'#526583');p(9,18,3,4,'#526583');p(3,22,4,2,'#f2ede6');p(9,22,4,2,'#f2ede6');}
      else {p(3,14,10,5,'#eef2f6');p(2,15,3,5,'#edf1f4');p(11,15,3,5,'#edf1f4');p(7,14,2,5,'#5599c8');p(4,18,3,4,'#28456e');p(9,18,3,4,'#28456e');p(3,22,4,2,'#f1ece4');p(9,22,4,2,'#f1ece4');}
    };
    // 4 facings × 2 walking frames for student, staff, patient, and visitors.
    for(let kind=0;kind<6;kind++)for(let dir=0;dir<4;dir++)for(let walk=0;walk<2;walk++)draw(kind*8+dir*2+walk,kind,dir,walk);
    for(let frame=0;frame<48;frame++)tex.add(String(frame),0,frame*16,0,16,24);
    tex.refresh();
  }

  private createNpc(group:Phaser.Physics.Arcade.Group,x:number,y:number,kind:number){
    const npc=group.create(x,y,'hospital-people',kind*8) as Phaser.Physics.Arcade.Sprite;npc.setDepth(y+4).setImmovable(true);
    npc.setSize(10,11).setOffset(3,12);npc.setData('npc',true);
    const bob=this.tweens.add({targets:npc,y:y-1,duration:900+kind*80,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
    let idleFrame=0;this.time.addEvent({delay:800+kind*150,loop:true,callback:()=>{if(npc.active){idleFrame=1-idleFrame;npc.setFrame(kind*8+idleFrame);}}});
    return {npc,bob};
  }

  private addBlocker(group:Phaser.Physics.Arcade.StaticGroup,x:number,y:number,w:number,h:number){
    const object=group.create(x,y,'hospital-people',0);object.setVisible(false);object.setSize(w,h);object.setOffset(-w/2,-h/2);object.refreshBody();
  }
  private tryInteract(){
    const candidate=[...this.contacts].sort((a,b)=>Phaser.Math.Distance.Between(this.player.x,this.player.y,a.x,a.y)-Phaser.Math.Distance.Between(this.player.x,this.player.y,b.x,b.y))[0];
    const reach=candidate?.kind==='radiology-door'?72:36;
    if(!candidate||Phaser.Math.Distance.Between(this.player.x,this.player.y,candidate.x,candidate.y)>reach){this.game.events.emit('world-dialogue','no-one');return;}
    this.interact(candidate.kind);
  }
  private interact(kind:ContactKind){this.game.events.emit('world-dialogue',kind);}
}
