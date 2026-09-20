class Zamo {
    constructor(scene, x, y, texture = 'zamo', player) {
        this.scene = scene;
        const actualTexture = scene.textures.exists(texture) ? texture : (scene.textures.exists('zamo') ? 'zamo' : 'zamo_temp');
        this.sprite = scene.physics.add.sprite(x, y, actualTexture);
        this.sprite.setCollideWorldBounds(true);
        this.player = player;
        this.speed = 90; 
        this.target = null;
        this.facing = 'down';

        // Escala y hitbox adaptados a las celdas de 72x72
        if (actualTexture === 'zamo') {
            this.sprite.setScale(0.45);
            this.sprite.setSize(24, 20);
            this.sprite.setOffset(24, 46);
            if (this.scene.anims.exists('zamo_idle_down')) {
                this.sprite.anims.play('zamo_idle_down');
            }
        }
    }

    goTo(x, y, callback) {
        this.target = { x: x, y: y, callback: callback };
    }

    followPlayer() {
        this.target = null;
    }

    update() {
        let moving = false;

        if (this.target) {
            const dist = Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, this.target.x, this.target.y);
            if (dist > 5) {
                this.scene.physics.moveToObject(this.sprite, this.target, this.speed);
                moving = true;
            } else {
                this.sprite.setVelocity(0);
                if (this.target.callback) {
                    this.target.callback();
                    this.target.callback = null;
                }
            }
        } else if (this.player && this.player.sprite) {
            const dist = Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, this.player.sprite.x, this.player.sprite.y);
            
            if (dist > 35) {
                this.scene.physics.moveToObject(this.sprite, this.player.sprite, this.speed);
                moving = true;
            } else {
                this.sprite.setVelocity(0);
            }
        }

        // Determinar dirección de animación
        const vx = this.sprite.body ? this.sprite.body.velocity.x : 0;
        const vy = this.sprite.body ? this.sprite.body.velocity.y : 0;

        if (moving && (Math.abs(vx) > 3 || Math.abs(vy) > 3)) {
            if (Math.abs(vx) >= Math.abs(vy)) {
                this.facing = vx > 0 ? 'right' : 'left';
            } else {
                this.facing = vy > 0 ? 'down' : 'up';
            }
        }

        if (this.facing === 'left') {
            this.sprite.setFlipX(true);
        } else {
            this.sprite.setFlipX(false);
        }

        if (moving && (Math.abs(vx) > 3 || Math.abs(vy) > 3)) {
            if (this.scene.anims.exists('zamo_walk_' + this.facing)) {
                this.sprite.anims.play('zamo_walk_' + this.facing, true);
            }
        } else {
            if (this.scene.anims.exists('zamo_idle_' + this.facing)) {
                this.sprite.anims.play('zamo_idle_' + this.facing, true);
            }
        }
    }
}
