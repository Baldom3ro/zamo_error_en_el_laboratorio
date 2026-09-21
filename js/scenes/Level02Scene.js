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

        this.machineryActive = false;
        this.machineryTimer = 0;
        this.machineryTimerEvent = null;

        // ─── HUD de Maquinaria: DIV HTML flotante (igual a DialogueSystem) ───
        let machineryDiv = document.getElementById('machinery-hud');
        if (!machineryDiv) {
            machineryDiv = document.createElement('div');
            machineryDiv.id = 'machinery-hud';
            machineryDiv.style.cssText = [
                'position:fixed',
                'top:18px',
                'left:50%',
                'transform:translateX(-50%)',
                'background:rgba(20,15,8,0.96)',
                'color:#ffffff',
                'font-family:"Outfit","Courier New",monospace',
                'padding:10px 18px',
                'border:2px solid #ffaa00',
                'border-radius:8px',
                'box-shadow:0 0 16px rgba(255,170,0,0.7)',
                'z-index:99998',
                'display:none',
                'text-align:center',
                'min-width:320px',
                'max-width:90vw',
                'pointer-events:none'
            ].join(';');
            machineryDiv.innerHTML = `
                <div style="font-size:13px;font-weight:bold;color:#ffaa00;letter-spacing:1px;margin-bottom:6px;">
                    ⚙ PROTOCOLO AUTOMÁTICO DE TRANSPORTE ⚙
                </div>
                <div style="width:100%;height:14px;background:#181818;border-radius:4px;overflow:hidden;border:1px solid #553300;margin-bottom:6px;">
                    <div id="machinery-fill" style="width:100%;height:100%;background:#ffaa00;transition:width 0.2s linear;"></div>
                </div>
                <div id="machinery-status" style="font-size:12px;font-weight:bold;color:#ffffff;">
                    ¡CIERRE DE SECTOR EN: 18s! Acciona el freno a la izquierda
                </div>
            `;
            document.body.appendChild(machineryDiv);
        }
        this.machineryDiv = machineryDiv;
        this.machineryFill = document.getElementById('machinery-fill');
        this.machineryStatus = document.getElementById('machinery-status');

        this.events.once('shutdown', () => {
            if (this.machineryDiv) this.machineryDiv.style.display = 'none';
        });
        this.events.once('destroy', () => {
            if (this.machineryDiv) this.machineryDiv.style.display = 'none';
        });

        // Barrera / brazos mecánicos en movimiento (gráficos dinámicos)
        this.hazardGfx = this.add.graphics().setDepth(120);

        // Palanca / freno de parada de emergencia
        this.emergencyBrake = createObj(25, 20, 'machine_temp', () => {
            if (this.machineryActive) {
                this.detenerMaquinaria();
            } else {
                this.dialogues.show("FRENO DE EMERGENCIA: Sistema inactivo.");
            }
        });
        this.emergencyBrake.sprite.setTint(0x555555);
        this.add.text(25, 38, '[ FRENO ]', {
            fontFamily: '"Outfit", sans-serif', fontSize: '4px', fill: '#ffaa00', resolution: 3
        }).setOrigin(0.5).setDepth(10);

        const checkProtocol = () => {
            if (this.currentSequence[0] === 0 && this.currentSequence[1] === 1 && this.currentSequence[2] === 2) {
                this.protocolSuccess = true;
                this.dialogues.show(dialogues.level02.protocolSuccess);
            } else {
                // Activar protocolo automático peligroso
                startMachineryHazard();
            }
        };

        const actualizarBarraMaquinaria = () => {
            const pct = Math.max(0, Math.min(100, (this.machineryTimer / 18) * 100));
            if (this.machineryFill) {
                this.machineryFill.style.width = pct + '%';
                if (this.machineryTimer <= 6) {
                    this.machineryFill.style.background = '#ff2222';
                    this.machineryDiv.style.borderColor = '#ff2222';
                    this.machineryDiv.style.boxShadow = '0 0 16px rgba(255,34,34,0.8)';
                } else {
                    this.machineryFill.style.background = '#ffaa00';
                    this.machineryDiv.style.borderColor = '#ffaa00';
                    this.machineryDiv.style.boxShadow = '0 0 16px rgba(255,170,0,0.7)';
                }
            }
            if (this.machineryStatus) {
                if (this.machineryTimer <= 6) {
                    this.machineryStatus.innerHTML = `<span style="color:#ff3333;">¡CIERRE INMINENTE EN ${this.machineryTimer}s! ¡CORRE AL FRENO!</span>`;
                } else {
                    this.machineryStatus.innerHTML = `¡CIERRE DE SECTOR EN: ${this.machineryTimer}s! Acciona el freno a la izquierda`;
                }
            }
        };

        const startMachineryHazard = () => {
            if (this.machineryActive) return;
            this.machineryActive = true;
            this.machineryTimer = 18;

            this.cameras.main.shake(400, 0.02);
            this.emergencyBrake.sprite.setTint(0xffaa00);
            this.tweens.add({
                targets: this.emergencyBrake.sprite,
                alpha: 0.3,
                duration: 250,
                yoyo: true,
                repeat: -1
            });

            if (this.machineryDiv) this.machineryDiv.style.display = 'block';
            actualizarBarraMaquinaria();

            this.dialogues.show([
                "Zamo: Creo que acabamos de activar algo.",
                "Zamo: Y por 'algo' quiero decir 'todo'.",
                "¡MOTORES DE TRANSPORTE INICIADOS! Ciclo de sellado en curso.",
                "Zamo: ¡Corre primero, investiga después!"
            ]);

            // Temporizador de peligro
            this.machineryTimerEvent = this.time.addEvent({
                delay: 1000,
                repeat: 18,
                callback: () => {
                    this.machineryTimer--;
                    if (this.machineryTimer >= 0) {
                        actualizarBarraMaquinaria();
                        
                        // Efecto visual de brazos mecánicos moviéndose
                        this.hazardGfx.clear();
                        const phase = (18 - this.machineryTimer) * 15;
                        this.hazardGfx.lineStyle(3, 0xffaa00, 0.8);
                        this.hazardGfx.strokeRect(100 + (phase % 120), 50, 40, 60);
                        this.hazardGfx.strokeRect(200 - (phase % 120), 70, 40, 50);

                        if (this.machineryTimer === 0) {
                            derrotaMaquinaria();
                        }
                    }
                }
            });
        };

        this.detenerMaquinaria = () => {
            this.machineryActive = false;
            if (this.machineryDiv) this.machineryDiv.style.display = 'none';
            if (this.machineryTimerEvent) this.machineryTimerEvent.remove();
            this.tweens.killTweensOf(this.emergencyBrake.sprite);
            this.emergencyBrake.sprite.setAlpha(1);
            this.emergencyBrake.sprite.setTint(0x555555);
            this.hazardGfx.clear();

            this.cameras.main.flash(300, 0, 255, 0);
            this.dialogues.show([
                "¡FRENO DE EMERGENCIA ACCIONADO!",
                "Brazos mecánicos replegados a posición segura.",
                "Zamo: Uff... casi nos convertimos en parte del cargamento."
            ]);
        };

        const derrotaMaquinaria = () => {
            this.machineryActive = false;
            if (this.machineryDiv) this.machineryDiv.style.display = 'none';
            if (this.machineryTimerEvent) this.machineryTimerEvent.remove();
            this.hazardGfx.clear();
            this.doorIn.close();
            this.doorOut.close();
            this.cameras.main.shake(700, 0.03);

            this.time.delayedCall(700, () => {
                this.scene.start('GameOverScene', {
                    level: 'Level02Scene',
                    title: 'PROTOCOLO AUTOMÁTICO COMPLETADO',
                    subtitle: 'El sistema automatizado de transporte cerró todas las vías y bloqueó completamente el sector.',
                    zamoQuote: 'Bueno... al menos ahora sabemos qué hacía.',
                    accentColor: '#ffaa00'
                });
            });
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
