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

        this.fugaActiva = false;
        this.intoxicacion = 0; // 0 a 100%
        this.fugaTimerEvent = null;

        // Overlay de alarma roja
        this.alarmOverlay = this.add.rectangle(160, 90, 320, 180, 0xff0000, 0).setScrollFactor(0).setDepth(200);
        
        // ─── HUD de Intoxicación: DIV HTML flotante (igual a DialogueSystem) ───
        let toxicDiv = document.getElementById('toxic-hud');
        if (!toxicDiv) {
            toxicDiv = document.createElement('div');
            toxicDiv.id = 'toxic-hud';
            toxicDiv.style.cssText = [
                'position:fixed',
                'top:18px',
                'left:50%',
                'transform:translateX(-50%)',
                'background:rgba(10,15,10,0.95)',
                'color:#ffffff',
                'font-family:"Outfit","Courier New",monospace',
                'padding:10px 18px',
                'border:2px solid #00ff66',
                'border-radius:8px',
                'box-shadow:0 0 16px rgba(0,255,100,0.6)',
                'z-index:99998',
                'display:none',
                'text-align:center',
                'min-width:320px',
                'max-width:90vw',
                'pointer-events:none'
            ].join(';');
            toxicDiv.innerHTML = `
                <div style="font-size:13px;font-weight:bold;color:#00ff66;letter-spacing:1px;margin-bottom:6px;">
                    ☣ INTOXICACIÓN POR GAS TÓXICO ☣
                </div>
                <div style="width:100%;height:14px;background:#181818;border-radius:4px;overflow:hidden;border:1px solid #444;margin-bottom:6px;">
                    <div id="toxic-fill" style="width:0%;height:100%;background:#00ff66;transition:width 0.1s linear;"></div>
                </div>
                <div id="toxic-status" style="font-size:12px;font-weight:bold;color:#ffffff;">
                    0% - ¡Busca el interruptor de emergencia a la izquierda!
                </div>
            `;
            document.body.appendChild(toxicDiv);
        }
        this.toxicDiv = toxicDiv;
        this.toxicFill = document.getElementById('toxic-fill');
        this.toxicStatus = document.getElementById('toxic-status');

        // Limpiar DIV si se cambia o reinicia la escena
        this.events.once('shutdown', () => {
            if (this.toxicDiv) this.toxicDiv.style.display = 'none';
        });
        this.events.once('destroy', () => {
            if (this.toxicDiv) this.toxicDiv.style.display = 'none';
        });

        // Capa de vapor químico (ficticio)
        this.vaporGfx = this.add.graphics().setDepth(150);

        // Interruptor de emergencia
        this.emergencySwitch = createObj(25, 160, 'machine_temp', () => {
            if (this.fugaActiva) {
                this.estabilizarFuga();
            } else {
                this.dialogues.show("INTERRUPTOR DE EMERGENCIA: Sistema estable.");
            }
        });
        this.emergencySwitch.sprite.setTint(0x555555);
        this.add.text(25, 142, '[ EMERGENCIA ]', {
            fontFamily: '"Outfit", sans-serif', fontSize: '4px', fill: '#ffff00', resolution: 3
        }).setOrigin(0.5).setDepth(10);

        const actualizarBarraIntoxicacion = () => {
            const percent = Math.min(100, Math.floor(this.intoxicacion));
            if (this.toxicFill) {
                this.toxicFill.style.width = percent + '%';
                if (percent >= 70) {
                    this.toxicFill.style.background = '#ff2222';
                    this.toxicDiv.style.borderColor = '#ff2222';
                    this.toxicDiv.style.boxShadow = '0 0 16px rgba(255,34,34,0.8)';
                } else if (percent >= 40) {
                    this.toxicFill.style.background = '#ffaa00';
                    this.toxicDiv.style.borderColor = '#ffaa00';
                    this.toxicDiv.style.boxShadow = '0 0 16px rgba(255,170,0,0.7)';
                } else {
                    this.toxicFill.style.background = '#00ff66';
                    this.toxicDiv.style.borderColor = '#00ff66';
                    this.toxicDiv.style.boxShadow = '0 0 16px rgba(0,255,100,0.6)';
                }
            }
            if (this.toxicStatus) {
                if (percent >= 70) {
                    this.toxicStatus.innerHTML = `<span style="color:#ff3333;">${percent}% - ¡ASFIXIA CRÍTICA! INTERRUPTOR A LA IZQUIERDA</span>`;
                } else if (percent >= 40) {
                    this.toxicStatus.innerHTML = `<span style="color:#ffaa00;">${percent}% - Gas densificándose rápidamente</span>`;
                } else {
                    this.toxicStatus.innerHTML = `${percent}% - ¡Activa el interruptor de emergencia a la izquierda!`;
                }
            }
        };

        const triggerFugaQuimica = () => {
            if (this.fugaActiva) return;
            this.fugaActiva = true;
            this.intoxicacion = 0;

            // Descarga eléctrica y alarma
            this.cameras.main.flash(300, 255, 255, 255);
            this.cameras.main.shake(300, 0.02);

            // Luces rojas parpadeantes
            this.tweens.add({
                targets: this.alarmOverlay,
                fillAlpha: 0.35,
                duration: 350,
                yoyo: true,
                repeat: -1
            });

            // Resaltar interruptor de emergencia
            this.emergencySwitch.sprite.setTint(0xff0000);
            this.tweens.add({
                targets: this.emergencySwitch.sprite,
                alpha: 0.3,
                duration: 250,
                yoyo: true,
                repeat: -1
            });

            if (this.toxicDiv) this.toxicDiv.style.display = 'block';
            actualizarBarraIntoxicacion();

            this.dialogues.show([
                "¡DESCARGA ELÉCTRICA DETECTADA!",
                "SISTEMA DE CONTENCIÓN INESTABLE.",
                "¡Tubería fracturada liberando gas tóxico!",
                "Zamo: Eso definitivamente no era el interruptor correcto."
            ]);

            let zamoAlerted = false;

            // Intoxicación rápida: +1.25% cada 100ms -> 100% en 8 segundos
            this.fugaTimerEvent = this.time.addEvent({
                delay: 100,
                repeat: -1,
                callback: () => {
                    if (!this.fugaActiva) return;

                    this.intoxicacion += 1.25;
                    actualizarBarraIntoxicacion();

                    // Densidad de vapor visual
                    this.vaporGfx.clear();
                    const vaporAlpha = Math.min(0.65, (this.intoxicacion / 100) * 0.7);
                    this.vaporGfx.fillStyle(0x33ff66, vaporAlpha);
                    this.vaporGfx.fillRect(0, 0, 320, 180);

                    // Efectos en el jugador por inhalación (mareo / ralentización leve al superar 60%)
                    if (this.intoxicacion >= 60 && this.player) {
                        this.player.speed = 70; // Ralentizado por asfixia
                        if (Math.random() < 0.15) {
                            this.cameras.main.shake(120, 0.008);
                        }
                    }

                    // Alerta de Zamo a mitad de barra
                    if (this.intoxicacion >= 50 && !zamoAlerted) {
                        zamoAlerted = true;
                        this.dialogues.show("Zamo: ¿Podemos dejar de tocar cosas hasta saber qué hacen?");
                    }

                    // Intoxicación completa -> Derrota
                    if (this.intoxicacion >= 100) {
                        derrotaFuga();
                    }
                }
            });
        };

        const derrotaFuga = () => {
            this.fugaActiva = false;
            if (this.toxicDiv) this.toxicDiv.style.display = 'none';
            if (this.fugaTimerEvent) this.fugaTimerEvent.remove();
            this.cameras.main.shake(800, 0.035);
            this.vaporGfx.clear();
            this.vaporGfx.fillStyle(0x33ff66, 0.95);
            this.vaporGfx.fillRect(0, 0, 320, 180);

            // Zamo intenta correr hacia la salida
            this.zamo.goTo(300, 90, null);

            this.time.delayedCall(800, () => {
                this.scene.start('GameOverScene', {
                    level: 'Level01Scene',
                    title: '¡SISTEMA DE CONTENCIÓN ACTIVADO!',
                    subtitle: 'El jugador sucumbió a los vapores químicos. El laboratorio quedó clausurado por emergencia.',
                    zamoQuote: 'Bueno... técnicamente sí logramos detenerlo. Solo que también nos detuvo a nosotros.',
                    accentColor: '#33ff66'
                });
            });
        };

        this.estabilizarFuga = () => {
            this.fugaActiva = false;
            if (this.toxicDiv) this.toxicDiv.style.display = 'none';
            if (this.fugaTimerEvent) this.fugaTimerEvent.remove();
            this.tweens.killTweensOf(this.alarmOverlay);
            this.tweens.killTweensOf(this.emergencySwitch.sprite);
            this.alarmOverlay.fillAlpha = 0;
            this.emergencySwitch.sprite.setAlpha(1);
            this.emergencySwitch.sprite.setTint(0x555555);
            
            this.intoxicacion = 0;
            this.vaporGfx.clear();

            if (this.player) {
                this.player.speed = 100; // Restaurar velocidad normal
            }

            this.cameras.main.flash(300, 0, 255, 0);
            this.dialogues.show([
                "¡INTERRUPTOR ACCIONADO!",
                "Extractores de emergencia activados.",
                "Vapor neutralizado. Sistema estabilizado."
            ], () => {
                resetPanel("Panel eléctrico reiniciado.");
            });
        };

        const resetPanel = (message) => {
            this.panelProgress = 0;
            this.switches.fill(false);
            this.panelObjects.forEach((panelSwitch) => {
                panelSwitch.active = false;
                panelSwitch.sprite.setTint(0xffffff);
            });
            this.cameras.main.shake(100, 0.01);
            if (message) this.dialogues.show(message);
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
                        // Error activa fuga química de acuerdo con derrotas.md
                        triggerFugaQuimica();
                        resetPanel(null);
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
