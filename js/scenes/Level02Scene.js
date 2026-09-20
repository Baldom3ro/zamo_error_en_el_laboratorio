class Level02Scene extends Phaser.Scene {
    constructor() {
        super('Level02Scene');
    }

    create() {
        this.cameras.main.setBackgroundColor('#111');
        this.add.tileSprite(160, 90, 320, 180, 'floor_temp');
        this.add.text(10, 10, 'Nivel 2: Investigación', { fontFamily: '"Outfit", sans-serif', fontSize: '10px', fill: '#fff', resolution: 3 }).setScrollFactor(0);

        this.dialogues = new DialogueSystem(this);
        this.interaction = new InteractionSystem(this);

        this.walls = this.physics.add.staticGroup();
        this.interactables = this.physics.add.group();
        this.physics.world.setBounds(0, 0, 320, 180);

        this.player = new Player(this, 30, 90, 'player');
        this.zamo = new Zamo(this, 10, 90, 'zamo', this.player);

        this.doorIn = new Door(this, 5, 90, 'door_temp'); 
        this.doorIn.open(); 

        this.doorOut = new Door(this, 300, 90, 'door_temp'); 
        this.levelCompleted = false;

        const createObj = (x, y, texture, action) => {
            let obj = new PuzzleObject(this, x, y, texture);
            obj.onInteract = action;
            this.interactables.add(obj.sprite);
            obj.sprite.parentObj = obj;
            return obj;
        };

        // Computadora principal (pista 1)
        createObj(80, 20, 'machine_temp', () => this.dialogues.show(dialogues.level02.computer));

        // Archivo (pista 2)
        createObj(150, 20, 'machine_temp', () => this.dialogues.show(dialogues.level02.archiveDoc));

        // Hueco Zamo (para máquina de diagnóstico)
        this.machineOn = false;
        createObj(50, 160, 'wall_temp', () => {
            if(!this.machineOn) {
                this.dialogues.show(dialogues.level02.zamoHole, () => {
                    this.zamo.goTo(50, 165, () => {
                        this.machineOn = true;
                        this.dialogues.show("Zamo: ¡Listo! Encontré un panel secundario.", () => {
                            this.zamo.followPlayer();
                        });
                    });
                });
            }
        });

        // Máquina diagnóstico (pista 3)
        createObj(200, 20, 'machine_temp', () => {
            if (this.machineOn) {
                this.dialogues.show(dialogues.level02.machineDiagnostic);
            } else {
                this.dialogues.show([
                    "La máquina no tiene energía.",
                    "Zamo: Ese conducto estrecho abajo debe conectar con la alimentación."
                ]);
            }
        });

        // Panel de seguridad (3 símbolos)
        this.symbols = ['▲', '●', '■', '◆'];
        this.currentSequence = [0, 0, 0];
        this.protocolSuccess = false;
        this.systemReset = false;

        const updatePanelText = () => {
            return `[ ${this.symbols[this.currentSequence[0]]} ] [ ${this.symbols[this.currentSequence[1]]} ] [ ${this.symbols[this.currentSequence[2]]} ]`;
        };

        const checkProtocol = () => {
            if (this.currentSequence[0] === 0 && this.currentSequence[1] === 1 && this.currentSequence[2] === 2) {
                this.protocolSuccess = true;
                this.dialogues.show(dialogues.level02.protocolSuccess);
            } else {
                this.dialogues.show(dialogues.level02.protocolError, () => {
                    this.time.delayedCall(1000, () => this.dialogues.show(dialogues.level02.zamoReactionError));
                });
            }
        };

        // Panel principal y confirmar
        createObj(280, 160, 'machine_temp', () => {
            if (this.systemReset) return; 
            if (this.protocolSuccess) {
                this.dialogues.show(dialogues.level02.protocolSuccess);
                return;
            }
            checkProtocol();
        });

        // 3 botones del panel
        for(let i=0; i<3; i++) {
            createObj(220 + (i*20), 160, 'machine_temp', () => {
                if (this.protocolSuccess) return;
                this.currentSequence[i] = (this.currentSequence[i] + 1) % this.symbols.length;
                this.dialogues.show("Secuencia: " + updatePanelText());
            });
        }

        // Botón de reinicio alto para Zamo
        createObj(150, 160, 'wall_temp', () => {
            if (this.protocolSuccess && !this.systemReset) {
                this.dialogues.show("El botón está muy alto.\nZamo: Yo me encargo.", () => {
                    this.zamo.goTo(150, 165, () => {
                        this.systemReset = true;
                        this.doorOut.open();
                        this.dialogues.show(dialogues.level02.powerRestored, () => {
                            this.zamo.followPlayer();
                            this.dialogues.show(dialogues.level02.zamoFinal);
                        });
                    });
                });
            } else if (!this.protocolSuccess) {
                this.dialogues.show("Mecanismo inactivo.");
            }
        });

        this.physics.add.collider(this.player.sprite, this.walls);
        this.physics.add.collider(this.zamo.sprite, this.walls);
        this.physics.add.collider(this.player.sprite, this.interactables);

        this.physics.add.collider(this.player.sprite, this.doorOut.sprite, null, () => !this.doorOut.isOpen);
        this.physics.add.overlap(this.player.sprite, this.doorOut.sprite, () => {
            if (this.doorOut.isOpen && !this.levelCompleted) {
                this.levelCompleted = true;
                this.add.text(160, 90, '¡NIVEL COMPLETADO!', { fontFamily: '"Outfit", sans-serif', fontSize: '20px', fill: '#0f0', backgroundColor: '#000', resolution: 3 }).setOrigin(0.5).setScrollFactor(0).setDepth(100);
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1500, () => this.scene.start('Level03Scene'));
            }
        });

        this.keys = this.input.keyboard.addKeys('W,A,S,D,E');
        this.input.keyboard.on('keydown-E', () => this.interaction.interact(this.player.sprite, this.interactables.getChildren()));

        this.cameras.main.setZoom(4);
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBounds(0, 0, 320, 180);

        // Intro
        this.time.delayedCall(1000, () => {
            this.doorIn.close();
            this.cameras.main.shake(200, 0.01);
            this.dialogues.show(dialogues.level02.intro);
        });
    }

    update() {
        this.player.update(this.keys);
        this.zamo.update();
    }
}
