class Player {
    constructor(scene, x, y, texture = 'player') {
        this.scene = scene;
        const actualTexture = scene.textures.exists(texture) ? texture : (scene.textures.exists('player') ? 'player' : 'player_temp');
        this.sprite = scene.physics.add.sprite(x, y, actualTexture);
        this.sprite.setCollideWorldBounds(true);
        this.speed = 100;
        this.facing = 'down';

        // Escala y hitbox adaptados a las celdas de 72x72
        if (actualTexture === 'player') {
            this.sprite.setScale(0.45);
            this.sprite.setSize(24, 20);
            this.sprite.setOffset(24, 46);
            if (this.scene.anims.exists('player_idle_down')) {
                this.sprite.anims.play('player_idle_down');
            }
        }
    }

    update(keys) {
        this.sprite.setVelocity(0);

        let moving = false;

        if (keys.A.isDown) {
            this.sprite.setVelocityX(-this.speed);
            this.facing = 'left';
            moving = true;
        } else if (keys.D.isDown) {
            this.sprite.setVelocityX(this.speed);
            this.facing = 'right';
            moving = true;
        }

        if (keys.W.isDown) {
            this.sprite.setVelocityY(-this.speed);
            if (!keys.A.isDown && !keys.D.isDown) this.facing = 'up';
            moving = true;
        } else if (keys.S.isDown) {
            this.sprite.setVelocityY(this.speed);
            if (!keys.A.isDown && !keys.D.isDown) this.facing = 'down';
            moving = true;
        }
        
        if (this.sprite.body.velocity.x !== 0 && this.sprite.body.velocity.y !== 0) {
            this.sprite.body.velocity.normalize().scale(this.speed);
        }

        // Animaciones
        if (this.scene.anims.exists('player_walk_' + this.facing)) {
            if (moving) {
                this.sprite.anims.play('player_walk_' + this.facing, true);
            } else {
                this.sprite.anims.play('player_idle_' + this.facing, true);
            }
        }

        // El flipX se debe aplicar DESPUÉS de anims.play para que no se anule
        if (this.facing === 'left') {
            this.sprite.setFlipX(true);
        } else {
            this.sprite.setFlipX(false);
        }
    }
}
