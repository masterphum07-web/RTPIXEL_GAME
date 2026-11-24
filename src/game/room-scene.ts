import Phaser from 'phaser';

/** A hand-drawn 320×180 pixel room. Phaser scales the canvas with nearest-neighbour. */
export class RoomScene extends Phaser.Scene {
  private patientArms:Phaser.GameObjects.Container[]=[];
  private readonly handlePatientPose=(pose:'rest'|'clinical')=>this.setPatientPose(pose);
  private readonly handleMissionComplete=()=>{
    const burst=this.add.sprite(160,82,'pixel-confetti').setDepth(10).setScale(.65).play('pixel-confetti-burst');
    burst.once(Phaser.Animations.Events.ANIMATION_COMPLETE,()=>burst.destroy());
  };
  constructor(){ super('room'); }
  preload(){ this.load.spritesheet('pixel-confetti', `${import.meta.env.BASE_URL}assets/pixelfx-confetti.png`, { frameWidth:200, frameHeight:140 }); }
  create(){
    const g=this.add.graphics();
    const box=(x:number,y:number,w:number,h:number,color:number)=>{g.fillStyle(color,1);g.fillRect(x,y,w,h);};
    const line=(x:number,y:number,w:number,h:number,color:number)=>{g.lineStyle(1,color,1);g.strokeRect(x+.5,y+.5,w-1,h-1);};
    // Back wall: tiled, softly lit, with chunky seams.
    box(0,0,320,180,0x202c62); box(0,20,320,127,0x8792bd); box(0,20,320,5,0xb5bbd8);
    for(let x=0;x<320;x+=32){box(x,25,1,120,0x7785ad);box(x+1,25,1,120,0x9da8c9);}
    for(let y=28;y<145;y+=24){box(0,y,320,1,0x7382aa);box(0,y+1,320,1,0x9aa5c7);}
    // Cool light panels and wall fixtures.
    box(78,32,159,2,0xd2daf2);box(81,34,153,2,0xf0eddf);box(84,36,146,1,0x95dcff);
    box(4,29,61,4,0xdfe9ff);box(5,33,59,1,0x87d8ff);
    // Observation window, monitor silhouettes and blue reflections.
    box(4,47,72,51,0x192a58);box(6,49,68,47,0x294d88);box(8,51,64,43,0x14274d);
    box(10,54,25,2,0x315d9b);box(12,58,20,1,0x5ca6e3);box(13,60,3,22,0x223966);box(17,63,5,19,0x314c7d);box(25,65,4,18,0x1d3262);
    box(44,58,18,13,0x203b76);box(46,60,14,9,0x3783c7);box(48,62,4,2,0x72d5ff);box(54,62,4,2,0x6abfff);box(46,72,13,2,0xa9c6e9);
    box(37,50,2,44,0x9ca8ce);box(7,49,66,2,0xe1e8fc);box(7,95,66,2,0xe1e8fc);box(5,49,2,48,0xb7c8e8);box(73,49,2,48,0xb7c8e8);
    // Radiation-safety poster with a clear symbol.
    box(82,53,40,49,0xe7d8b9);box(84,55,36,45,0xf0e2c5);box(86,58,28,2,0x3b568b);box(86,62,24,2,0x3b568b);box(86,66,30,2,0x3b568b);
    box(97,74,10,10,0xe9a933);box(100,76,4,6,0x203260);box(98,75,2,3,0x203260);box(104,75,2,3,0x203260);box(98,82,2,3,0x203260);box(104,82,2,3,0x203260);
    box(86,88,20,1,0x8394b5);box(86,92,24,1,0x8394b5);box(86,96,17,1,0x8394b5);
    // Ceiling rail and suspended X-ray tube.
    box(125,20,81,5,0x555f91);box(128,21,75,2,0xbbc3e2);box(137,23,3,12,0x6774a4);box(191,23,3,12,0x6774a4);
    box(140,22,4,15,0x515d91);box(190,22,4,15,0x515d91);box(139,34,57,8,0x515b89);box(145,31,46,12,0xd5d5e6);box(151,29,34,12,0xf3e7d4);
    box(157,31,20,7,0x283c73);box(159,33,16,3,0x218bc9);box(161,34,3,1,0x80e1ff);box(166,34,4,1,0x55bdf1);
    box(166,41,4,12,0x65709a);box(163,50,10,5,0x515e91);box(165,54,6,3,0xc6d0ec);
    // Equipment cabinet, control console and lit pixel keys.
    box(121,53,12,34,0x4c5c8f);box(123,55,8,29,0x9ca9c9);box(125,58,4,7,0x456ba6);box(125,69,4,9,0x4265a0);
    box(95,95,32,30,0x4c5885);box(97,97,28,25,0xadb2c9);box(98,98,25,17,0x343f72);box(100,100,21,12,0x152b59);
    for(let i=0;i<4;i++)for(let j=0;j<2;j++){box(101+i*5,101+j*4,3,2,i%2?0x43b5ee:0x54d4f2);box(101+i*5,103+j*4,3,1,0xa1e9ff);}
    box(100,117,22,2,0xe0dfd8);box(102,119,18,2,0x7886aa);box(107,123,10,3,0x53618e);
    // Examination table: machine receptor, bright rim, lift and wheel feet.
    box(134,113,100,7,0x404b7d);box(132,109,104,5,0x273460);box(133,109,102,3,0xf1ebdc);box(136,107,96,2,0x98b9e6);
    box(145,120,81,4,0x5e6a99);box(153,124,65,4,0x475482);box(161,128,50,9,0x626f9e);box(166,136,5,9,0x4c5784);box(205,136,5,9,0x4c5784);
    box(157,143,15,2,0x27365f);box(201,143,15,2,0x27365f);box(133,118,6,2,0xffc34d);box(229,118,6,2,0xffc34d);
    // Right-side shelves, monitor cart, potted plant and medical supplies.
    box(244,86,42,3,0x765852);box(247,89,37,2,0xa47a60);box(247,111,37,3,0x765852);box(249,93,11,15,0x30477b);box(262,96,10,12,0x5177a6);box(274,92,9,16,0x7596bf);
    box(257,72,19,13,0x835a4e);box(259,74,15,10,0xa17763);box(261,69,11,4,0xcdd2df);box(264,58,5,12,0x378257);box(255,61,14,4,0x328456);box(264,55,13,4,0x49a369);box(260,52,6,7,0x61b375);box(252,65,9,4,0x45a16b);box(270,65,10,4,0x33915f);
    // Floor tiles, glossy blue shadows and safety line.
    box(0,147,320,33,0x334b81);box(0,147,320,2,0xa0adce);box(0,149,320,1,0x6278a6);
    for(let x=-10;x<340;x+=24){box(x,152,1,28,0x405a8f);box(x+1,152,1,28,0x5270a6);}
    for(let y=157;y<180;y+=9){box(0,y,320,1,0x496397);}
    box(130,145,107,2,0xf0ad3d);box(130,145,2,12,0xf0ad3d);box(235,145,2,12,0xf0ad3d);
    box(31,139,79,2,0x7186b7);box(49,141,44,2,0x50689b);
    // Small pixel shadows under the furniture.
    box(132,154,104,2,0x1b2c58);box(93,128,38,2,0x1d2e5a);box(244,117,43,2,0x1c2b56);
    // Technologist sprite at the console, crisp pixel clusters and scrub details.
    const tech=this.add.graphics();
    tech.fillStyle(0x18264e,1);tech.fillRect(78,89,22,3);tech.fillRect(76,91,25,6);tech.fillStyle(0x30263b,1);tech.fillRect(78,87,21,4);tech.fillRect(76,89,5,6);tech.fillRect(95,89,5,5);
    tech.fillStyle(0xe8b99f,1);tech.fillRect(81,92,15,14);tech.fillStyle(0xf6cbb0,1);tech.fillRect(83,93,12,11);tech.fillStyle(0x2c2630,1);tech.fillRect(84,96,2,2);tech.fillRect(92,96,2,2);tech.fillStyle(0xe68e83,1);tech.fillRect(87,101,3,1);
    tech.fillStyle(0x2751a0,1);tech.fillRect(78,105,21,20);tech.fillRect(75,107,5,15);tech.fillRect(97,108,5,12);tech.fillStyle(0x3b70c4,1);tech.fillRect(81,106,3,17);tech.fillStyle(0x6cceff,1);tech.fillRect(91,108,2,3);tech.fillStyle(0xe5e9fa,1);tech.fillRect(96,116,6,2);
    tech.fillStyle(0x15234c,1);tech.fillRect(80,124,8,13);tech.fillRect(91,124,8,13);tech.fillStyle(0x334e87,1);tech.fillRect(81,126,5,8);tech.fillRect(93,126,5,8);tech.fillStyle(0xe2e7f5,1);tech.fillRect(78,137,11,3);tech.fillRect(90,137,11,3);tech.fillStyle(0x273b67,1);tech.fillRect(78,140,12,1);tech.fillRect(90,140,12,1);
    // Patient on receptor, wearing a patterned gown. Anatomy remains stylized.
    const patient=this.add.container(0,0).setDepth(4),torso=this.add.graphics();
    torso.fillStyle(0x293866,1);torso.fillRect(174,73,18,3);torso.fillRect(172,76,22,3);torso.fillStyle(0x3a2938,1);torso.fillRect(174,70,19,5);torso.fillRect(172,73,4,4);torso.fillRect(188,72,5,3);
    torso.fillStyle(0xf0c1a5,1);torso.fillRect(177,74,14,13);torso.fillStyle(0xffd3b2,1);torso.fillRect(179,75,10,10);torso.fillStyle(0x20283e,1);torso.fillRect(180,79,2,2);torso.fillRect(187,79,2,2);torso.fillStyle(0xd9857e,1);torso.fillRect(183,84,3,1);
    torso.fillStyle(0xdceafb,1);torso.fillRect(174,87,20,27);torso.fillRect(176,114,7,2);torso.fillRect(186,114,7,2);torso.fillStyle(0x90aed9,1);torso.fillRect(176,90,16,22);
    for(let i=0;i<10;i++){torso.fillStyle(i%2?0x7f9bd0:0xb7c7e6,1);torso.fillRect(177+(i*7)%14,90+(i*11)%20,1,1);}
    torso.fillStyle(0xf4eee5,1);torso.fillRect(175,116,8,2);torso.fillRect(186,116,8,2);patient.add(torso);
    this.patientArms=[{x:175,y:89,sign:1},{x:193,y:89,sign:-1}].map(({x,y})=>{const limb=this.add.container(x,y),g=this.add.graphics();g.fillStyle(0x495f87,1).fillRect(-3,0,6,9);g.fillStyle(0xe5c5b8,1).fillRect(-3,8,6,8);g.fillStyle(0xf3d3c3,1).fillRect(-2,9,4,5);limb.add(g);patient.add(limb);return limb;});
    for(const [x,angle] of [[179,-.04],[190,.04]] as const){const leg=this.add.container(x,112),g=this.add.graphics();g.fillStyle(0x5e7090,1).fillRect(-2,0,5,8);g.fillStyle(0xf4eee5,1).fillRect(-3,7,8,3);leg.add(g);patient.add(leg);this.tweens.add({targets:leg,angle:{from:angle,to:-angle},duration:720,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});}
    this.tweens.add({targets:patient,y:{from:0,to:-1},duration:900,yoyo:true,repeat:-1,ease:'Stepped',easeParams:[2]});
    this.game.events.on('patient-pose',this.handlePatientPose);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN,()=>this.game.events.off('patient-pose',this.handlePatientPose));
    if(!this.anims.exists('pixel-confetti-burst')) this.anims.create({key:'pixel-confetti-burst',frames:this.anims.generateFrameNumbers('pixel-confetti',{start:0,end:102}),frameRate:24,repeat:0});
    this.game.events.on('mission-complete',this.handleMissionComplete);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN,()=>this.game.events.off('mission-complete',this.handleMissionComplete));
  }

  private setPatientPose(pose:'rest'|'clinical'){
    const target=pose==='clinical' ? 0.72 : 0;
    this.patientArms.forEach((arm,index)=>this.tweens.add({targets:arm,angle:(index===0?target:-target),duration:240,ease:'Sine.easeInOut'}));
  }
}
