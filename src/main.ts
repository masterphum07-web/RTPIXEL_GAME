import Phaser from 'phaser';
import { RoomScene } from './game/room-scene';
import { HospitalScene } from './game/hospital-scene';
import { mountApp } from './ui/app';
import './styles.css';
import './ui/rpg.css';
const game=new Phaser.Game({type:Phaser.CANVAS,parent:'game-world',width:320,height:180,backgroundColor:'#18295c',pixelArt:true,antialias:false,physics:{default:'arcade',arcade:{debug:false}},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[HospitalScene,RoomScene],render:{roundPixels:true}});
mountApp(game);
if('serviceWorker'in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(()=>undefined));
