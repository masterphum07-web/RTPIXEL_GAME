import Phaser from 'phaser';

type ContactKind='mentor'|'reception'|'radiologist'|'radiology-door'|'engineer'|'librarian'|'student'|'quest-board'|'hidden-cache'|'lab-gate';
interface Contact { x:number; y:number; kind:ContactKind; sprite?:Phaser.Physics.Arcade.Sprite; }
const TILE=16, MAP_W=32, MAP_H=18;

/** Top-down, tile-based hospital courtyard. The world is authored at native pixel scale. */
export class HospitalScene extends Phaser.Scene {
  private player!:Phaser.Physics.Arcade.Sprite;
  private keys!:Record<string,Phaser.Input.Keyboard.Key>;
  private facing=0;
  private coatEquipped=false;
  private positionSaveClock=0;
  private lastSavedX=0;
  private lastSavedY=0;
  private contacts:Contact[]=[];
  private interactionPrompt!:Phaser.GameObjects.Text;
  private joystick={x:0,y:0};
  private interactLock=false;
  private keyboardInteractHeld=false;
  private virtualInteractHeld=false;
  private virtual:{up:boolean;down:boolean;left:boolean;right:boolean}={up:false,down:false,left:false,right:false};
  private readonly handleKeyInteract=()=>{if(this.keyboardInteractHeld)return;this.keyboardInteractHeld=true;if(!this.interactLock&&this.tryInteract(true))this.interactLock=true;};
  private readonly releaseKeyInteract=()=>{this.keyboardInteractHeld=false;if(!this.virtualInteractHeld)this.interactLock=false;};
  private readonly handleVirtualInteract=(active:boolean)=>{if(active===this.virtualInteractHeld)return;this.virtualInteractHeld=active;if(active){if(!this.interactLock&&this.tryInteract(true))this.interactLock=true;}else if(!this.keyboardInteractHeld)this.interactLock=false;};
  private readonly handleQuestUpdated=()=>this.events.emit('quest-world-refresh');
  private readonly handleVirtualMove=(direction:keyof HospitalScene['virtual'],active:boolean)=>{this.virtual[direction]=active;};
  private readonly handleJoystick=(x:number,y:number)=>{this.joystick={x:Phaser.Math.Clamp(x,-1,1),y:Phaser.Math.Clamp(y,-1,1)};};
  private readonly handleOutfit=(equipped:boolean)=>{this.coatEquipped=equipped;};
  constructor(){super('hospital');}

  preload(){
    this.load.image('hospital-world',`${import.meta.env.BASE_URL}assets/hospital-world.png`);
    this.load.image('hospital-props',`${import.meta.env.BASE_URL}assets/hospital-props.png`);
  }

  create(){
    this.cameras.main.setRoundPixels(true);
    this.physics.world.setBounds(0,0,MAP_W*TILE,MAP_H*TILE);
    this.add.image(0,0,'hospital-world').setOrigin(0).setScale(.5).setDepth(-10);
    this.createPropFrames();this.createTiles(); this.createTileWorld(); this.createDecor(); this.createSpriteSheet();
    this.game.events.on('player-outfit',this.handleOutfit);
    this.game.events.emit('request-player-outfit',(equipped:boolean)=>{this.coatEquipped=equipped;});

    this.player=this.physics.add.sprite(256,205,'hospital-people',32);
    this.player.setScale(.3).setDepth(30).setCollideWorldBounds(true).setSize(34,37).setOffset(15,52);
    this.player.setData('walkFrame',0);
    const walls=this.mapLayer;
    if(walls)this.physics.add.collider(this.player,walls);
    const props=this.physics.add.staticGroup();
    this.addBlocker(props,150,151,44,16); // reception counter
    this.addBlocker(props,210,152,30,9); // waiting seats
    this.addBlocker(props,373,153,32,12); // bench
    this.addBlocker(props,88,160,22,27); // bus shelter
    this.physics.add.collider(this.player,props);

    this.contacts=[{x:306,y:156,kind:'mentor'},{x:185,y:172,kind:'reception'},{x:344,y:172,kind:'radiologist'},{x:256,y:126,kind:'radiology-door'},{x:116,y:172,kind:'librarian'},{x:394,y:172,kind:'engineer'},{x:370,y:215,kind:'student'},{x:78,y:210,kind:'quest-board'},{x:451,y:232,kind:'hidden-cache'},{x:468,y:120,kind:'lab-gate'}];
    const npcGroup=this.physics.add.group({allowGravity:false,immovable:true});
    const mentor=this.createNpc(npcGroup,306,156,0).npc; const receptionist=this.createNpc(npcGroup,185,172,1).npc; const radiologist=this.createNpc(npcGroup,344,172,5).npc; this.createNpc(npcGroup,289,208,3);
    const librarian=this.createNpc(npcGroup,116,172,4).npc; const engineer=this.createNpc(npcGroup,394,172,5).npc; const student=this.createNpc(npcGroup,370,215,2).npc;
    for(const contact of this.contacts){contact.sprite=({mentor,reception:receptionist,radiologist,librarian,engineer,student} as Partial<Record<ContactKind,Phaser.Physics.Arcade.Sprite>>)[contact.kind];}
    // A student follows a short, deterministic courtyard patrol, adding life
    // without sending an NPC through walls or away from its interaction zone.
    this.tweens.add({targets:student,x:382,duration:2300,yoyo:true,repeat:-1,ease:'Stepped',easeParams:[8]});
    this.physics.add.collider(this.player,npcGroup);
    this.player.setPosition(265,155);
    this.game.events.emit('request-world-position',(position:{x:number;y:number}|null)=>{if(position&&Number.isFinite(position.x)&&Number.isFinite(position.y))this.player.setPosition(Phaser.Math.Clamp(position.x,20,492),Phaser.Math.Clamp(position.y,20,268));});
    const keyboard=this.input.keyboard!;
    this.keys={W:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),A:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),S:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),D:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),UP:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),DOWN:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),LEFT:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),RIGHT:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),E:keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)};
    this.cameras.main.startFollow(this.player,true,.12,.12);
    this.cameras.main.setBounds(0,0,MAP_W*TILE,MAP_H*TILE);
    this.interactionPrompt=this.add.text(0,0,'E · TALK',{fontFamily:'monospace',fontSize:'7px',fontStyle:'bold',color:'#ffffff',backgroundColor:'#142752',padding:{left:4,right:4,top:2,bottom:2},stroke:'#69dfff',strokeThickness:1}).setOrigin(.5,1).setDepth(1000).setVisible(false);
    this.game.events.on('quest-updated',this.handleQuestUpdated);
    this.game.events.on('virtual-move',this.handleVirtualMove);
    this.game.events.on('virtual-joystick',this.handleJoystick);
    this.game.events.on('virtual-interact',this.handleVirtualInteract);
    keyboard.on('keydown-E',this.handleKeyInteract);
    keyboard.on('keyup-E',this.releaseKeyInteract);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN,()=>{
      keyboard.off('keydown-E',this.handleKeyInteract);
      keyboard.off('keyup-E',this.releaseKeyInteract);
      this.game.events.off('quest-updated',this.handleQuestUpdated);
      this.game.events.off('virtual-move',this.handleVirtualMove);
      this.game.events.off('virtual-joystick',this.handleJoystick);
      this.game.events.off('virtual-interact',this.handleVirtualInteract);
      this.game.events.off('player-outfit',this.handleOutfit);
      this.keyboardInteractHeld=false;
      this.virtualInteractHeld=false;
      this.interactLock=false;
      this.joystick={x:0,y:0};
    });
  }

  private mapLayer:Phaser.Tilemaps.TilemapLayer|null=null;

  private createPropFrames(){
    const texture=this.textures.get('hospital-props');
    texture.add('tree',0,0,0,64,80);texture.add('fountain',0,64,0,128,80);texture.add('ambulance',0,192,0,128,80);texture.add('bench',0,320,0,64,64);
    texture.add('streetlamp',0,0,80,48,80);texture.add('flowerbed',0,48,80,128,64);texture.add('wayfinding',0,176,80,96,64);
  }

  private addHospitalProp(frame:string,x:number,y:number){
    return this.add.image(x,y,'hospital-props',frame).setOrigin(.5,1).setScale(.5).setDepth(5);
  }

  update(_time:number,delta:number){
    const body=this.player.body as Phaser.Physics.Arcade.Body;
    if((this.keyboardInteractHeld||this.virtualInteractHeld)&&!this.interactLock&&this.tryInteract(false))this.interactLock=true;
    let dx=0,dy=0;
    if(this.keys.LEFT.isDown||this.keys.A.isDown||this.virtual.left)dx=-1;
    if(this.keys.RIGHT.isDown||this.keys.D.isDown||this.virtual.right)dx=1;
    if(this.keys.UP.isDown||this.keys.W.isDown||this.virtual.up)dy=-1;
    if(this.keys.DOWN.isDown||this.keys.S.isDown||this.virtual.down)dy=1;
    dx+=this.joystick.x;dy+=this.joystick.y;
    const magnitude=Math.hypot(dx,dy);if(magnitude>1){dx/=magnitude;dy/=magnitude;}
    body.setVelocity(dx*68,dy*68);
    const moving=Boolean(dx||dy);
    const frameBase=(this.coatEquipped?5:2)*16;
    if(moving){this.facing=Math.abs(dx)>Math.abs(dy)?(dx<0?2:3):(dy<0?1:0);const f=(Math.floor(_time/125)%4);this.player.setFrame(frameBase+this.facing*4+f);}
    else this.player.setFrame(frameBase+this.facing*4);
    if(_time-this.positionSaveClock>2000&&(Math.abs(this.player.x-this.lastSavedX)>3||Math.abs(this.player.y-this.lastSavedY)>3)){this.positionSaveClock=_time;this.lastSavedX=this.player.x;this.lastSavedY=this.player.y;this.game.events.emit('world-position',{zone:'academy',x:Math.round(this.player.x),y:Math.round(this.player.y)});}
    if(!moving&&delta>0){body.setVelocity(0,0);}
    const target=this.findInteractionTarget();
    this.interactionPrompt.setVisible(Boolean(target));
    if(target){this.interactionPrompt.setPosition(target.sprite?.x??target.x,(target.sprite?.y??target.y)-18);this.interactionPrompt.setText(`${target.kind==='radiology-door'?'E · ENTER':'E · TALK'}`);}
    this.game.events.emit('interaction-target',target?.kind??null);
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
    // The detailed 2x pixel-art backdrop replaces the low-resolution visible tiles.
    // Keep their invisible collision grid so walls and planting beds stay solid.
    ground.setVisible(false);structures.setVisible(false);
    // Extra side entrances and windows suggest linked hospital departments.
    structures.putTileAt(5,11,6);structures.putTileAt(5,20,6);
  }

  private createDecor(){
    const d=this.add.graphics().setDepth(5);
    const rect=(x:number,y:number,w:number,h:number,color:number)=>{d.fillStyle(color,1);d.fillRect(x,y,w,h);};
    // The exact 32×18 tile world remains fully visible at the configured camera size.
    // Original, transparent Astra Pixel Art cutouts provide foreground depth.
    for(const [x,y] of [[88,188],[112,190],[402,191],[430,189],[92,255],[410,254]])this.addHospitalProp('tree',x+9,y+31);
    this.addHospitalProp('fountain',256,229);this.addHospitalProp('ambulance',26,116);
    this.addHospitalProp('streetlamp',124,191);this.addHospitalProp('streetlamp',365,191);
    this.addHospitalProp('bench',396,160);this.addHospitalProp('wayfinding',124,170);
    this.addHospitalProp('flowerbed',106,183);this.addHospitalProp('flowerbed',402,183);
    for(const [x,y,delay] of [[244,214,0],[263,217,360],[253,210,700]]){
      const glint=this.add.rectangle(x,y,2,1,0xd8fbff).setDepth(7).setAlpha(.45);
      this.tweens.add({targets:glint,alpha:{from:.25,to:1},y:y-2,duration:520+delay,yoyo:true,repeat:-1,delay,ease:'Sine.easeInOut'});
    }
    // Glass entrance and equipment signage.
    rect(206,68,98,22,0x304b81);rect(209,70,92,17,0x2475a8);rect(213,72,84,12,0x24517e);rect(223,74,63,2,0xc7f1ff);rect(239,75,31,3,0xe6f2ff);
    rect(241,111,30,2,0x91d8ff);rect(241,113,30,7,0x263b65);rect(243,114,12,5,0x71c7ed);rect(257,114,12,5,0xa9dcf0);rect(255,116,1,3,0x33466d);
    rect(70,129,32,23,0x34445f);rect(72,131,28,15,0x4b78a0);rect(74,133,24,9,0x203e62);rect(86,147,2,8,0x655548);rect(69,155,8,2,0x283b5a);rect(93,155,8,2,0x283b5a);
    // Check-in counter and waiting seats.
    rect(143,142,55,14,0x7b6758);rect(145,140,52,4,0xd5c6af);rect(147,144,46,9,0x957b67);rect(150,145,39,5,0x6f89ac);rect(160,138,13,3,0x4e6080);
    for(const x of [207,222]){rect(x,143,11,7,0x495d7e);rect(x,151,2,3,0x283955);rect(x+8,151,2,3,0x283955);rect(x+1,144,9,3,0x7194ad);}
    // Safety bollards and wall-mounted mission/department markers.
    for(const x of [128,176,334,422]){rect(x,183,3,7,0x263d61);rect(x-1,181,5,3,0xf0c85d);}
    // Room marker over the radiology doors.
    rect(236,91,40,10,0x253a63);rect(237,92,38,7,0x1c75a6);rect(239,94,34,3,0xb5ecff);
    // Quest board, library sign, shop sign, research gate and a discoverable garden cache.
    rect(65,190,26,20,0x273a61);rect(68,192,20,14,0x765b48);rect(70,194,16,10,0xe0d5b7);rect(72,196,12,1,0x48699b);rect(72,199,10,1,0x6585ad);rect(72,202,12,1,0x48699b);
    rect(103,151,26,5,0x1e406e);rect(105,152,22,2,0x73d6f5);rect(391,151,29,5,0x1e406e);rect(393,152,25,2,0xffd56e);
    rect(452,107,28,22,0x183c5d);rect(455,110,22,16,0x164f71);rect(458,112,16,12,0x45c9db);rect(460,114,12,8,0x112b4c);
    rect(439,224,23,13,0x544b50);rect(441,222,19,12,0x836b57);rect(444,224,13,7,0xd5bb79);
    this.createLittleWallMonitors(d);
    this.add.text(256,78,'RADIOLOGY',{fontFamily:'monospace',fontSize:'9px',fontStyle:'bold',color:'#f0f8ff',stroke:'#183054',strokeThickness:1}).setOrigin(.5).setDepth(6);
  }

  private createLittleWallMonitors(d:Phaser.GameObjects.Graphics){
    d.fillStyle(0x203962,1);d.fillRect(137,27,24,16);d.fillStyle(0x4da2d5,1);d.fillRect(139,29,20,11);d.fillStyle(0x95e8ff,1);d.fillRect(142,31,13,2);d.fillRect(142,35,8,2);d.fillStyle(0x586784,1);d.fillRect(146,43,5,3);
    d.fillStyle(0x203962,1);d.fillRect(304,32,23,16);d.fillStyle(0x65b5e6,1);d.fillRect(306,34,19,11);d.fillStyle(0xb1edff,1);d.fillRect(308,36,8,2);d.fillRect(308,40,13,1);
  }

  private createSpriteSheet(){
    if(this.textures.exists('hospital-people'))return;
    // Draw at 2× source detail, then scale to the same 16×24 world footprint.
    // The extra source pixels let faces and uniforms hold finer pixel clusters.
    const sourceScale=2,frameWidth=32*sourceScale,frameHeight=48*sourceScale,frameCount=6*4*4;
    // Pack 8 frames per row so the high-detail atlas stays below common mobile texture limits.
    const columns=8,rows=Math.ceil(frameCount/columns);
    const tex=this.textures.createCanvas('hospital-people',frameWidth*columns,frameHeight*rows);if(!tex)return;
    const c=tex.getContext();
    const palettes=[
      {hair:'#332633',hairHi:'#765052',skin:'#f1c2a4',skinShade:'#d8917e',top:'#f0f3f4',topShade:'#c8d7e6',pants:'#4c6595',trim:'#68c9ed',role:'mentor'},
      {hair:'#493044',hairHi:'#98616c',skin:'#f2c4a8',skinShade:'#d9957f',top:'#e6f1f5',topShade:'#b7d2e0',pants:'#445b83',trim:'#58b7d9',role:'reception'},
      {hair:'#2b2633',hairHi:'#68505a',skin:'#efc09f',skinShade:'#d28a78',top:'#2861ac',topShade:'#193f7d',pants:'#253d70',trim:'#52d8f5',role:'student'},
      {hair:'#3d3034',hairHi:'#8f625d',skin:'#f1c5aa',skinShade:'#d89983',top:'#d9e7f0',topShade:'#a9bfd4',pants:'#8193ab',trim:'#91bde5',role:'patient'},
      {hair:'#553f3b',hairHi:'#aa7963',skin:'#edbd9f',skinShade:'#d28a78',top:'#e3f1f2',topShade:'#b9d6d3',pants:'#55716e',trim:'#66d4c3',role:'nurse'},
      {hair:'#272631',hairHi:'#63545a',skin:'#eec09f',skinShade:'#d08a77',top:'#edf1f5',topShade:'#c3d0de',pants:'#394c6e',trim:'#4f9dc7',role:'doctor'},
    ];
    const draw=(frame:number,kind:number,dir:number,walk:number)=>{
      const ox=(frame%columns)*frameWidth,oy=Math.floor(frame/columns)*frameHeight,pal=palettes[kind];
      const p=(x:number,y:number,w:number,h:number,col:string)=>{c.fillStyle=col;c.fillRect(ox+x*sourceScale,oy+y*sourceScale,w*sourceScale,h*sourceScale);};
      const fine=(x:number,y:number,col:string)=>{c.fillStyle=col;c.fillRect(ox+x,oy+y,1,1);};
      const sway=[0,1,0,-1][walk];
      // A compact cast shadow anchors the 48 px sprite to the courtyard floor.
      p(7,45,18,2,'#263c4d');p(10,45,12,1,'#40576a');
      // Back hair silhouette and layered highlights.
      p(9,3,14,2,'#201d2a');p(7,5,18,3,pal.hair);p(5,8,22,6,pal.hair);p(7,6,16,2,pal.hairHi);
      p(6,11,4,9,'#272431');p(22,10,4,8,'#272431');p(8,13,3,10,pal.hair);p(21,12,3,10,pal.hair);
      p(10,4,3,2,pal.hairHi);p(16,4,4,1,pal.hairHi);p(7,8,3,2,pal.hairHi);p(23,9,2,3,pal.hairHi);
      if(kind===0){p(5,16,4,10,pal.hair);p(23,15,4,11,pal.hair);p(4,23,5,4,pal.hairHi);p(24,24,4,4,pal.hairHi);}
      if(kind===1){p(21,3,5,5,'#272431');p(23,2,3,3,pal.hairHi);}
      if(kind===4){p(10,2,3,3,pal.hairHi);p(19,2,4,2,pal.hairHi);}
      if(kind===2){p(8,2,4,2,pal.hairHi);p(18,2,4,2,pal.hairHi);p(24,5,3,3,pal.hairHi);}
      // Face direction: south, north, west, east. The back view keeps only hair and ears.
      if(dir!==1){
        p(9,11,2,5,pal.skinShade);p(23,11,2,5,pal.skinShade);p(10,9,14,13,pal.skin);p(11,10,12,2,'#f7d8bb');
        p(10,17,2,3,'#e8a28d');p(22,17,2,3,'#e8a28d');p(13,20,8,1,pal.skinShade);
        if(dir===0){
          p(12,14,3,3,'#292737');p(19,14,3,3,'#292737');p(12,14,1,1,'#fff5df');p(19,14,1,1,'#fff5df');p(16,17,2,1,pal.skinShade);p(15,19,4,1,'#b96970');p(12,13,4,1,pal.hair);p(19,13,4,1,pal.hair);
        }else if(dir===2){
          p(11,14,3,3,'#292737');p(11,14,1,1,'#fff5df');p(14,17,2,1,pal.skinShade);p(12,19,4,1,'#b96970');
        }else{
          p(19,14,3,3,'#292737');p(21,14,1,1,'#fff5df');p(17,17,2,1,pal.skinShade);p(17,19,4,1,'#b96970');
        }
        // Soft pixel fringe, cropped over the forehead without hiding the eyes.
        p(9,9,7,3,pal.hair);p(15,8,5,3,pal.hair);p(19,9,5,3,pal.hair);p(11,11,3,1,pal.hairHi);
        // Fine highlights add eye sparkle, cheek texture, and individual hair strands.
        fine(26,29,'#fff8e9');fine(40,29,'#fff8e9');fine(27,30,'#a9d9f4');fine(41,30,'#a9d9f4');
        fine(22,38,'#f4a99b');fine(23,39,'#e9958a');fine(42,38,'#f4a99b');fine(41,39,'#e9958a');
        fine(18,16,pal.hairHi);fine(21,17,pal.hairHi);fine(33,15,pal.hairHi);fine(37,17,pal.hairHi);fine(45,19,pal.hairHi);
      }else{
        p(10,10,14,12,pal.hair);p(11,12,12,3,pal.hairHi);p(11,22,12,2,pal.skinShade);
      }
      // Neck, shoulder silhouette, sleeves and garment layers.
      p(13,22,6,4,pal.skinShade);p(14,22,4,3,pal.skin);
      if(pal.role==='student'){
        p(9,25,14,14,pal.top);p(7,26+sway,4,10,pal.topShade);p(21,26-sway,4,10,pal.topShade);p(10,26,12,2,'#3d7bd0');p(11,28,10,9,pal.top);
        p(13,27,6,1,'#75a9f2');p(16,29,1,6,pal.trim);p(18,30,4,5,'#e3f3ff');p(19,31,2,2,'#3d81b9');
        p(10,34,3,3,'#214d94');p(19,34,3,3,'#214d94');
      }else if(pal.role==='patient'){
        p(8,25,16,16,pal.top);p(6,26+sway,4,10,pal.topShade);p(22,26-sway,4,10,pal.topShade);p(10,27,12,12,'#eef5fa');p(12,29,8,2,'#c6d9e9');
        for(const [x,y] of [[11,31],[16,34],[20,30],[13,37],[19,39],[9,35]])p(x,y,1,1,(x+y)%2?'#85a8d0':'#a4bfdd');
        p(14,27,4,2,'#91abc6');
      }else{
        p(8,25,16,14,pal.top);p(6,26+sway,4,11,pal.topShade);p(22,26-sway,4,11,pal.topShade);p(10,26,12,12,'#f7f8f8');
        p(13,25,6,4,pal.trim);p(14,28,4,1,'#e9f4f6');p(12,31,3,6,pal.topShade);p(17,31,3,6,pal.topShade);
        p(15,29,2,7,pal.trim);p(11,30,2,1,'#9eb8d0');p(19,30,2,1,'#9eb8d0');p(12,35,2,3,'#fff');p(18,35,2,3,'#fff');
        if(kind===0){p(22,29,3,4,'#dcecff');p(23,30,1,1,'#57bce3');p(23,32,1,1,'#e48b8e');}
        if(kind===1){p(22,29,3,3,'#d9eff3');p(23,30,1,1,'#4daac8');p(9,28,2,3,'#6b8db2');}
        if(kind===4){p(22,29,3,4,'#e5f4ed');p(23,30,1,2,'#43a88a');p(14,30,4,2,'#daf2eb');}
        if(kind===5){p(22,29,3,4,'#dae9f4');p(23,30,1,2,'#357aa8');p(11,29,2,3,'#74a6c6');p(19,29,2,3,'#74a6c6');}
        if(kind===5||kind===1){p(11,14,3,1,'#313446');p(19,14,3,1,'#313446');p(11,14,3,3,'#435367');p(19,14,3,3,'#435367');p(14,15,5,1,'#435367');}
      }
      // Legs use separate light/shade pixels so the walk cycle reads at native scale.
      const leftLeg=walk===1?1:walk===3?-1:0,rightLeg=-leftLeg;
      p(10+leftLeg,38,5,5,pal.pants);p(17+rightLeg,38,5,5,pal.pants);p(10+leftLeg,38,2,4,'#6885b6');p(18+rightLeg,38,2,4,'#6885b6');
      p(8+leftLeg,43,7,3,'#26334f');p(17+rightLeg,43,7,3,'#26334f');p(7+leftLeg,44,8,2,'#f1eee8');p(17+rightLeg,44,8,2,'#f1eee8');
      // Small color accents distinguish a radiology team without text-sized details.
      if(kind===1){p(14,4,4,2,'#f5f4ef');p(15,3,2,4,'#e55261');p(12,5,8,1,'#f5f4ef');}
      if(kind===5){p(13,13,3,1,'#d9ebf7');p(20,13,3,1,'#d9ebf7');}
      // Crisp one-pixel tailoring marks remain visible in the high-resolution sheet.
      if(kind===2||kind===3){
        for(const [x,y] of [[22,56],[26,60],[39,57],[43,62],[23,69],[40,72],[28,77],[36,80]])fine(x,y,kind===2?'#9fd0ff':'#c8d9eb');
        fine(32,57,'#eef5ff');fine(33,61,'#79dcf5');fine(24,75,'#648fd0');fine(43,75,'#648fd0');
      }else{
        fine(24,58,'#ffffff');fine(27,63,pal.trim);fine(41,58,'#ffffff');fine(38,63,pal.trim);
        fine(29,67,pal.topShade);fine(35,70,pal.topShade);fine(29,74,'#eef6fb');fine(35,77,'#eef6fb');
      }
      if(kind===1||kind===4){fine(47,59,'#ffffff');fine(48,61,kind===1?'#5bbfe0':'#63d9bb');}
      if(kind===5){fine(22,29,'#ffffff');fine(42,29,'#ffffff');fine(23,31,'#4c87ac');fine(41,31,'#4c87ac');}
    };
    // 4 facings × 4 walking frames for a readable 16-bit walk cycle.
    for(let kind=0;kind<6;kind++)for(let dir=0;dir<4;dir++)for(let walk=0;walk<4;walk++)draw(kind*16+dir*4+walk,kind,dir,walk);
    for(let frame=0;frame<frameCount;frame++)tex.add(String(frame),0,(frame%columns)*frameWidth,Math.floor(frame/columns)*frameHeight,frameWidth,frameHeight);
    tex.refresh();
  }

  private createNpc(group:Phaser.Physics.Arcade.Group,x:number,y:number,kind:number){
    const npc=group.create(x,y,'hospital-people',kind*16) as Phaser.Physics.Arcade.Sprite;npc.setScale(.3).setDepth(y+4).setImmovable(true);
    npc.setSize(34,37).setOffset(15,52);npc.setData('npc',true);
    const bob=this.tweens.add({targets:npc,y:y-1,duration:900+kind*80,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
    let idleFrame=0;this.time.addEvent({delay:800+kind*150,loop:true,callback:()=>{if(npc.active){idleFrame=1-idleFrame;npc.setFrame(kind*16+idleFrame);}}});
    return {npc,bob};
  }

  private addBlocker(group:Phaser.Physics.Arcade.StaticGroup,x:number,y:number,w:number,h:number){
    const object=group.create(x,y,'hospital-people',0).setVisible(false);
    const body=object.body as Phaser.Physics.Arcade.StaticBody;
    body.setSize(w,h,true);
  }
  private tryInteract(showHint=true){
    const candidate=this.findInteractionTarget();
    if(!candidate){if(showHint)this.game.events.emit('world-dialogue','no-one');return false;}
    this.interact(candidate.kind);
    return true;
  }
  private findInteractionTarget(){
    const forward=({0:{x:0,y:1},1:{x:0,y:-1},2:{x:-1,y:0},3:{x:1,y:0}} as const)[this.facing]??{x:0,y:1};
    const priority:Record<ContactKind,number>={mentor:0,reception:0,radiologist:0,librarian:0,engineer:0,student:0,'radiology-door':1,'lab-gate':1,'quest-board':2,'hidden-cache':3};
    return this.contacts.map(contact=>{
      const x=contact.sprite?.x??contact.x,y=contact.sprite?.y??contact.y,dx=x-this.player.x,dy=y-this.player.y,distance=Math.hypot(dx,dy);
      const facingDot=distance?((dx*forward.x+dy*forward.y)/distance):1;
      return {contact,x,y,distance,facingDot,pointBlank:distance<18};
    }).filter(({contact,x,y,distance})=>distance<=(contact.kind==='radiology-door'?30:contact.kind==='lab-gate'?34:52)&&this.hasClearInteractionPath(x,y))
      .sort((a,b)=>Number(b.pointBlank)-Number(a.pointBlank)||Number(b.facingDot>=.65)-Number(a.facingDot>=.65)||a.distance-b.distance||priority[a.contact.kind]-priority[b.contact.kind])[0]?.contact??null;
  }
  private hasClearInteractionPath(x:number,y:number){
    const distance=Math.hypot(x-this.player.x,y-this.player.y),steps=Math.ceil(distance/4);
    for(let i=2;i<steps-1;i++){
      const t=i/steps,tile=this.mapLayer?.getTileAtWorldXY(this.player.x+(x-this.player.x)*t,this.player.y+(y-this.player.y)*t);
      if(tile?.collides)return false;
    }
    return true;
  }
  private interact(kind:ContactKind){this.game.events.emit('world-dialogue',kind);}
}
