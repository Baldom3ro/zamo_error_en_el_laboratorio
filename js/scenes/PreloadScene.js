class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.load.image('intro_bg', 'assets/maps/introducción.jpg');
        this.load.image('fenix', 'assets/characters/fenix.jpg');

        // Spritesheets de personajes (72x72 por celda)
        this.load.spritesheet('player', 'assets/characters/player/PlayerSprites.png', {
            frameWidth: 72,
            frameHeight: 72
        });

        this.load.spritesheet('zamo', 'assets/characters/zamo/ZamoSprites.png', {
            frameWidth: 72,
            frameHeight: 72
        });

        // Recursos temporales de respaldo
        let graphics = this.make.graphics({x: 0, y: 0, add: false});
        
        graphics.fillStyle(0x0000ff, 1);
        graphics.fillRect(0, 0, 16, 16);
        graphics.generateTexture('player_temp', 16, 16);
        graphics.clear();

        graphics.fillStyle(0x00ff00, 1);
        graphics.fillRect(0, 0, 16, 16);
        graphics.generateTexture('zamo_temp', 16, 16);
        graphics.clear();

        graphics.fillStyle(0x666666, 1);
        graphics.fillRect(0, 0, 16, 16);
        graphics.generateTexture('wall_temp', 16, 16);
        graphics.clear();
        
        graphics.fillStyle(0x222222, 1);
        graphics.fillRect(0, 0, 16, 16);
        graphics.generateTexture('floor_temp', 16, 16);
        graphics.clear();

        graphics.fillStyle(0xff0000, 1);
        graphics.fillRect(0, 0, 16, 16);
        graphics.generateTexture('door_temp', 16, 16);
        graphics.clear();

        graphics.fillStyle(0xffff00, 1);
        graphics.fillRect(0, 0, 16, 16);
        graphics.generateTexture('machine_temp', 16, 16);
        graphics.clear();
    }

    create() {
        // --- Animaciones globales de Player ---
        this.anims.create({
            key: 'player_idle_down',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 1
        });
        this.anims.create({
            key: 'player_idle_up',
            frames: [{ key: 'player', frame: 1 }],
            frameRate: 1
        });
        this.anims.create({
            key: 'player_idle_right',
            frames: [{ key: 'player', frame: 3 }],
            frameRate: 1
        });
        this.anims.create({
            key: 'player_idle_left',
            frames: [{ key: 'player', frame: 3 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'player_walk_down',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 12 }),
            frameRate: 9,
            repeat: -1
        });
        this.anims.create({
            key: 'player_walk_up',
            frames: this.anims.generateFrameNumbers('player', { start: 16, end: 20 }),
            frameRate: 9,
            repeat: -1
        });
        this.anims.create({
            key: 'player_walk_right',
            frames: this.anims.generateFrameNumbers('player', { start: 24, end: 28 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'player_walk_left',
            frames: this.anims.generateFrameNumbers('player', { start: 24, end: 28 }),
            frameRate: 10,
            repeat: -1
        });

        // --- Animaciones globales de Zamo ---
        this.anims.create({
            key: 'zamo_idle_down',
            frames: [{ key: 'zamo', frame: 0 }],
            frameRate: 1
        });
        this.anims.create({
            key: 'zamo_idle_up',
            frames: [{ key: 'zamo', frame: 1 }],
            frameRate: 1
        });
        this.anims.create({
            key: 'zamo_idle_right',
            frames: [{ key: 'zamo', frame: 3 }],
            frameRate: 1
        });
        this.anims.create({
            key: 'zamo_idle_left',
            frames: [{ key: 'zamo', frame: 3 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'zamo_walk_down',
            frames: this.anims.generateFrameNumbers('zamo', { start: 8, end: 12 }),
            frameRate: 9,
            repeat: -1
        });
        this.anims.create({
            key: 'zamo_walk_up',
            frames: this.anims.generateFrameNumbers('zamo', { start: 16, end: 20 }),
            frameRate: 9,
            repeat: -1
        });
        this.anims.create({
            key: 'zamo_walk_right',
            frames: this.anims.generateFrameNumbers('zamo', { start: 24, end: 28 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'zamo_walk_left',
            frames: this.anims.generateFrameNumbers('zamo', { start: 24, end: 28 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.start('MenuScene');
    }
}
