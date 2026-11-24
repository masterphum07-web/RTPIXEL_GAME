import Phaser from 'phaser';
import { RoomScene } from './game/room-scene';
import { HospitalScene } from './game/hospital-scene';
import { DungeonScene } from './game/dungeon-scene';
import { mountApp } from './ui/app';
import './styles.css';
import './ui/rpg.css';
// Match the full authored map (32×18 tiles at 16 px) so the hospital reads as
// a complete MMORPG town instead of a cropped camera close-up.
const game=new Phaser.Game({type:Phaser.CANVAS,parent:'game-world',width:512,height:288,backgroundColor:'#18295c',pixelArt:true,antialias:false,physics:{default:'arcade',arcade:{debug:false}},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[HospitalScene,RoomScene,DungeonScene],render:{roundPixels:true}});
if(import.meta.env.DEV)(window as Window&{__radtechGame?:Phaser.Game}).__radtechGame=game;
mountApp(game);
if('serviceWorker'in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(()=>undefined));
