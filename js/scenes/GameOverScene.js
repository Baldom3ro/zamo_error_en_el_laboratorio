class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.levelKey = data.level || 'Level01Scene';
        this.defeatTitle = data.title || '¡MISIÓN FALLIDA!';
        this.defeatSubtitle = data.subtitle || 'El sistema colapsó.';
        this.zamoQuote = data.zamoQuote || 'Bueno... tenemos que intentarlo otra vez.';
        this.accentColor = data.accentColor || '#ff3333';
    }

    create() {
        const W = 1280;
        const H = 720;

        this.cameras.main.setBackgroundColor('#050508');
        this.cameras.main.fadeIn(500, 0, 0, 0);

        // Fondo oscuro con rejilla sutil
        let bgGfx = this.add.graphics();
        bgGfx.fillStyle(0x0a0a10, 0.95);
        bgGfx.fillRect(0, 0, W, H);

        // Marco de alerta
        bgGfx.lineStyle(3, Phaser.Display.Color.HexStringToColor(this.accentColor).color, 0.8);
        bgGfx.strokeRect(60, 50, W - 120, H - 100);

        // Efecto de resplandor de advertencia superior
        let glowGfx = this.add.graphics();
        glowGfx.fillStyle(Phaser.Display.Color.HexStringToColor(this.accentColor).color, 0.15);
        glowGfx.fillRect(60, 50, W - 120, 90);

        // Título de derrota
        this.add.text(W / 2, 95, this.defeatTitle, {
            fontFamily: '"Outfit", sans-serif',
            fontSize: '32px',
            fontStyle: 'bold',
            fill: this.accentColor,
            align: 'center',
            resolution: 2
        }).setOrigin(0.5);

        // Causa / Explicación clara
        this.add.text(W / 2, 180, this.defeatSubtitle, {
            fontFamily: '"Outfit", sans-serif',
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 900 },
            resolution: 2
        }).setOrigin(0.5);

        // Caja de diálogo de Zamo
        let boxGfx = this.add.graphics();
        boxGfx.fillStyle(0x151822, 0.9);
        boxGfx.fillRoundedRect(W / 2 - 420, 260, 840, 220, 12);
        boxGfx.lineStyle(2, 0x33cc66, 0.8);
        boxGfx.strokeRoundedRect(W / 2 - 420, 260, 840, 220, 12);

        // Sprite de Zamo
        if (this.textures.exists('zamo')) {
            let zamoSprite = this.add.sprite(W / 2 - 330, 370, 'zamo', 0);
            zamoSprite.setScale(2.0);
            if (this.anims.exists('zamo_idle_down')) {
                zamoSprite.anims.play('zamo_idle_down');
            }
        }

        // Nombre Zamo
        this.add.text(W / 2 - 250, 285, 'ZAMO', {
            fontFamily: '"Outfit", sans-serif',
            fontSize: '20px',
            fontStyle: 'bold',
            fill: '#33cc66',
            resolution: 2
        });

        // Frase de Zamo
        this.add.text(W / 2 - 250, 330, `"${this.zamoQuote}"`, {
            fontFamily: '"Outfit", sans-serif',
            fontSize: '18px',
            fontStyle: 'italic',
            fill: '#e0e0e0',
            wordWrap: { width: 620 },
            lineSpacing: 8,
            resolution: 2
        });

        // Instrucción para reintentar
        const retryText = this.add.text(W / 2, 560, 'PRESIONA [ ENTER ] O [ ESPACIO ] PARA REINTENTAR', {
            fontFamily: '"Outfit", sans-serif',
            fontSize: '22px',
            fontStyle: 'bold',
            fill: '#ffff00',
            backgroundColor: '#111',
            padding: { x: 20, y: 12 },
            resolution: 2
        }).setOrigin(0.5);

        this.tweens.add({
            targets: retryText,
            alpha: 0.3,
            duration: 700,
            yoyo: true,
            repeat: -1
        });

        // Controles de reintento
        const restartAction = () => {
            this.cameras.main.fade(400, 0, 0, 0);
            this.time.delayedCall(450, () => {
                this.scene.start(this.levelKey);
            });
        };

        this.input.keyboard.once('keydown-ENTER', restartAction);
        this.input.keyboard.once('keydown-SPACE', restartAction);
        this.input.once('pointerdown', restartAction);
    }
}
