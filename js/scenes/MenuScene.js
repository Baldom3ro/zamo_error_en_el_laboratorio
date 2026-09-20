class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');
        this.cameras.main.setZoom(4).centerOn(160, 90);
        this.textures.get('intro_bg').setFilter(Phaser.Textures.FilterMode.LINEAR);

        this.bg = this.add.image(160, 90, 'intro_bg').setOrigin(0.5).setVisible(false);
        const scale = Math.max(320 / this.bg.width, 180 / this.bg.height);
        this.bg.setScale(scale);

        this.sysText = this.add.text(160, 90, '', { fontFamily: '"Cabold Comic", "CHECKBK0", "Courier New", monospace', fontSize: '12px', fontStyle: 'bold', fill: '#fff', stroke: '#07111f', strokeThickness: 2, shadow: { offsetX: 1, offsetY: 1, color: '#000', blur: 0, fill: true }, align: 'center', resolution: 3 }).setOrigin(0.5);

        this.titlePanel = this.add.rectangle(160, 30, 300, 48, 0x061321, 0.78).setStrokeStyle(1, 0x8feeff, 0.9).setVisible(false);
        this.title = this.add.text(160, 30, 'ZAMO\nERROR EN EL LABORATORIO', { fontFamily: '"Cabold Comic", "CHECKBK0", "Courier New", monospace', fontSize: '14px', fontStyle: 'bold', fill: '#ffffff', stroke: '#07111f', strokeThickness: 2, shadow: { offsetX: 1, offsetY: 1, color: '#000', blur: 0, fill: true }, align: 'center', resolution: 3 }).setOrigin(0.5).setVisible(false);
        this.zamoSprite = this.add.sprite(160, 85, 'zamo', 0).setVisible(false).setScale(0.75);
        this.enterText = this.add.text(160, 165, '[ ENTER ] COMENZAR', { fontFamily: '"Cabold Comic", "CHECKBK0", "Courier New", monospace', fontSize: '10px', fontStyle: 'bold', fill: '#a8ffcf', stroke: '#07111f', strokeThickness: 2, resolution: 3 }).setOrigin(0.5).setVisible(false);

        this.dialogues = new DialogueSystem(this);

        this.time.delayedCall(1000, () => this.showSystemText('SISTEMA DEL LABORATORIO'));
        this.time.delayedCall(3000, () => this.showSystemText('ERROR CRÍTICO', '#f00'));
        this.time.delayedCall(5000, () => this.showSystemText('Se detectaron anomalías\nen los sistemas.', '#fff'));
        this.time.delayedCall(8000, () => this.startIntro());
    }

    showSystemText(text, color = '#fff') {
        this.sysText.setText(text);
        this.sysText.setColor(color);
        this.sysText.setAlpha(0.5);
        this.time.delayedCall(100, () => this.sysText.setAlpha(1));
    }

    startIntro() {
        this.sysText.setVisible(false);
        this.cameras.main.flash(500);

        this.bg.setVisible(true);
        this.titlePanel.setVisible(true);
        this.title.setVisible(true);
        this.zamoSprite.setVisible(true);
        if (this.anims.exists('zamo_idle_down')) {
            this.zamoSprite.play('zamo_idle_down');
        }

        const lines = [
            "Bueno... esto definitivamente no estaba en el programa.",
            "Algo salió mal en el laboratorio y varios sistemas dejaron de funcionar.",
            "Tendremos que investigar qué pasó. Y, por favor, intenta no romper nada más."
        ];

        this.dialogues.show(lines, () => {
            this.showStartButton();
        });
    }

    showStartButton() {
        this.enterText.setVisible(true);
        
        this.tweens.add({
            targets: this.enterText,
            alpha: 0,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        this.time.delayedCall(100, () => {
            this.input.keyboard.once('keydown-ENTER', () => {
                this.scene.start('Level01Scene');
            });
        });
    }
}
