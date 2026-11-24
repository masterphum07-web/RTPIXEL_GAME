import Phaser from 'phaser';

/** The radiography room uses independently layered pixel-art environment, equipment and actor assets. */
export class RoomScene extends Phaser.Scene {
  private patient!: Phaser.GameObjects.Sprite;
  private radiographer!: Phaser.GameObjects.Sprite;
  private patientPoseTween?: Phaser.Tweens.Tween;
  private patientPose: 'rest' | 'clinical' = 'rest';
  private patientBaseY = 0;
  private readonly handlePatientPose = (pose: 'rest' | 'clinical') => this.setPatientPose(pose);
  private readonly handleMissionComplete = () => {
    const burst = this.add.sprite(160, 82, 'pixel-confetti').setDepth(10).setScale(.65).play('pixel-confetti-burst');
    burst.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => burst.destroy());
  };

  constructor() { super('room'); }

  preload() {
    const base = import.meta.env.BASE_URL;
    this.load.spritesheet('pixel-confetti', `${base}assets/pixelfx-confetti.png`, { frameWidth: 200, frameHeight: 140 });
    this.load.image('xray-room-walls', `${base}assets/xray-room-walls.png`);
    this.load.image('xray-equipment', `${base}assets/xray-equipment.png`);
    this.load.spritesheet('xray-actors', `${base}assets/xray-actors-strip.png`, { frameWidth: 88, frameHeight: 112 });
  }

  create() {
    // 2x authored art is drawn at 0.5 into the established 320x180 world,
    // then scaled evenly by the existing room camera to the 512x288 viewport.
    this.cameras.main.setRoundPixels(true).setZoom(1.6).centerOn(160, 90);
    this.add.image(0, 0, 'xray-room-walls').setOrigin(0).setScale(.5).setDepth(0);
    this.add.image(0, 0, 'xray-equipment').setOrigin(0).setScale(.5).setDepth(1);

    if (!this.anims.exists('patient-walk')) {
      this.anims.create({ key: 'patient-walk', frames: [{ key: 'xray-actors', frame: 0 }, { key: 'xray-actors', frame: 1 }], frameRate: 5, repeat: -1 });
    }
    if (!this.anims.exists('pixel-confetti-burst')) {
      this.anims.create({ key: 'pixel-confetti-burst', frames: this.anims.generateFrameNumbers('pixel-confetti', { start: 0, end: 102 }), frameRate: 24, repeat: 0 });
    }

    // Feet share a stable bottom-center anchor. The patient entrance now uses
    // actual walk frames instead of sliding a static drawing across the room.
    this.patientBaseY = 113;
    this.patient = this.add.sprite(119, this.patientBaseY, 'xray-actors', 0)
      .setOrigin(.5, 1).setScale(.5).setDepth(3).play('patient-walk');
    this.tweens.add({
      targets: this.patient,
      x: 183,
      delay: 260,
      duration: 1150,
      ease: 'Stepped',
      easeParams: [14],
      onComplete: () => this.patient.setFrame(this.patientPose === 'clinical' ? 3 : 2),
    });
    // Restrained breathing idle keeps the patient alive without moving the feet.
    this.tweens.add({ targets: this.patient, y: { from: this.patientBaseY, to: this.patientBaseY - 1 }, duration: 1100, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    this.radiographer = this.add.sprite(87, 142, 'xray-actors', 4)
      .setOrigin(.5, 1).setScale(.5).setDepth(4);
    this.tweens.add({ targets: this.radiographer, y: { from: 142, to: 141 }, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    // Small, animated console-ready indicator sits on the console face.
    const readyLight = this.add.rectangle(117, 112, 2, 1, 0x9df4f4).setDepth(2);
    this.tweens.add({ targets: readyLight, alpha: { from: .35, to: 1 }, duration: 740, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    this.game.events.on('patient-pose', this.handlePatientPose);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.game.events.off('patient-pose', this.handlePatientPose));
    this.game.events.on('mission-complete', this.handleMissionComplete);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.game.events.off('mission-complete', this.handleMissionComplete));
  }

  private setPatientPose(pose: 'rest' | 'clinical') {
    this.patientPose = pose;
    this.patientPoseTween?.stop();
    if (pose === 'clinical') {
      this.patient.setFrame(3);
      this.patientPoseTween = this.tweens.add({ targets: this.patient, x: 185, duration: 230, yoyo: true, ease: 'Sine.easeInOut' });
    } else {
      this.patient.setFrame(2);
      this.patientPoseTween = this.tweens.add({ targets: this.patient, x: 183, duration: 160, ease: 'Sine.easeOut' });
    }
  }
}
