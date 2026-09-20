class Level01Scene extends Phaser.Scene {
    constructor() {
        super('Level01Scene');
    }

    create() {
        this.add.tileSprite(160, 90, 320, 180, 'floor_temp');
        this.add.text(10, 10, 'Nivel 1: Laboratorio', { fontFamily: '"Outfit", sans-serif', fontSize: '10px', fill: '#fff', resolution: 3 }).setScrollFactor(0);

        this.dialogues = new DialogueSystem(this);
        this.interaction = new InteractionSystem(this);

        this.walls = this.physics.add.staticGroup();
        this.interactables = this.physics.add.group();
        this.physics.world.setBounds(0, 0, 320, 180);

        this.player = new Player(this, 50, 50, 'player');
        this.zamo = new Zamo(this, 30, 50, 'zamo', this.player);

        // Puerta salida
        this.door = new Door(this, 300, 90, 'door_temp');

        this.switches = [false, false, false, false];
        this.energiaRestaurada = false;

        // Objetos
        const createObj = (x, y, texture, action) => {
            let obj = new PuzzleObject(this, x, y, texture);
            obj.onInteract = action;
            this.interactables.add(obj.sprite);
            obj.sprite.parentObj = obj;
            return obj;
        };

        const showComputerStatus = () => {
            const energyState = this.energiaRestaurada ? 'ACTIVA' : 'DESACTIVADA';
            this.dialogues.show([
                'SISTEMA DE LABORATORIO',
                `ENERGÍA PRINCIPAL: ${energyState}`,
                'SISTEMA DE RESPALDO: ACTIVO',
                this.energiaRestaurada ? 'CIRCUITO AUXILIAR RESTABLECIDO.' : 'CONTROL MANUAL REQUERIDO.'
            ]);
        };

        const showCircuitStatus = () => {
            const status = this.switches.map((isActive, index) => `${index + 1} - ${isActive ? 'ACTIVO' : 'INACTIVO'}`);
            this.dialogues.show(['CIRCUITO AUXILIAR', ...status]);
        };

        // Computadora inicio
        createObj(50, 20, 'machine_temp', showComputerStatus);

        // Máquina diagnóstico
        createObj(250, 20, 'machine_temp', showCircuitStatus);

        // Pantalla secuencia
        createObj(280, 20, 'machine_temp', () => this.dialogues.show(dialogues.level01.screenSequence));

        // Panel eléctrico
        // La pantalla muestra cuatro posiciones: apagado, encendido, apagado, encendido.
        this.panelSequence = [1, 3];
        this.panelProgress = 0;
        
        const checkEnergy = () => {
            if (this.panelProgress === this.panelSequence.length && this.zamoActivated) {
                this.energiaRestaurada = true;
                this.door.open();
                this.dialogues.show(dialogues.level01.powerRestored);
            }
        };

        const resetPanel = (message) => {
            this.panelProgress = 0;
            this.switches.fill(false);
            this.panelObjects.forEach((panelSwitch) => {
                panelSwitch.active = false;
                panelSwitch.sprite.setTint(0xffffff);
            });
            this.cameras.main.shake(100, 0.01);
            this.dialogues.show(message);
        };

        this.zamoActivated = false;
        createObj(100, 160, 'wall_temp', () => {
            if(!this.zamoActivated) {
                this.dialogues.show(dialogues.level01.zamoHole, () => {
                    this.zamo.goTo(100, 165, () => {
                        this.zamoActivated = true;
                        this.dialogues.show("Zamo: ¡Listo! Conecté los cables de este lado.", () => {
                            this.zamo.followPlayer();
                            checkEnergy();
                        });
                    });
                });
            }
        });

        this.panelObjects = [];
        const panelStartX = 140;
        for (let i=0; i<4; i++) {
            let sw = createObj(panelStartX + (i*20), 160, 'machine_temp', () => {
                if(!this.energiaRestaurada) {
                    if (!this.zamoActivated) {
                        this.dialogues.show("Falta un mecanismo por activar.");
                        return;
                    }

                    const expectedSwitch = this.panelSequence[this.panelProgress];
                    if (i !== expectedSwitch || sw.active) {
                        resetPanel(dialogues.level01.powerError);
                        return;
                    }

                    sw.toggle();
                    this.switches[i] = true;
                    this.panelProgress++;
                    checkEnergy();
                }
            });
            this.panelObjects.push(sw);
        }

        this.physics.add.collider(this.player.sprite, this.walls);
        this.physics.add.collider(this.zamo.sprite, this.walls);
        this.physics.add.collider(this.player.sprite, this.interactables);

        this.physics.add.collider(this.player.sprite, this.door.sprite, null, () => !this.door.isOpen);
        this.door.sprite.parentObj = this.door;
        this.door.onInteract = () => this.completeLevel();

        this.keys = this.input.keyboard.addKeys('W,A,S,D,E');
        this.input.keyboard.on('keydown-E', () => {
            this.interaction.interact(this.player.sprite, this.interactables.getChildren());
            if (this.door.isOpen && Phaser.Math.Distance.Between(this.player.sprite.x, this.player.sprite.y, this.door.sprite.x, this.door.sprite.y) < 30) {
                this.completeLevel();
            }
        });

        this.cameras.main.setZoom(4);
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBounds(0, 0, 320, 180);

        // Intro
        this.time.delayedCall(500, () => this.dialogues.show(dialogues.level01.intro));
    }

    update() {
        this.player.update(this.keys);
        this.zamo.update();
    }

    completeLevel() {
        this.physics.add.overlap(this.player.sprite, this.door.sprite, () => {
            if (this.door.isOpen) {
                this.add.text(160, 90, '¡NIVEL COMPLETADO!', { fontFamily: '"Outfit", sans-serif', fontSize: '20px', fill: '#0f0', backgroundColor: '#000', resolution: 3 }).setOrigin(0.5).setScrollFactor(0).setDepth(100);
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1500, () => {
                    this.scene.start('Level02Scene');
                });
            }
        });
    }
}
