class Level03Scene extends Phaser.Scene {
    constructor() {
        super('Level03Scene');
    }

    create() {
        const W = 640, H = 480;
        this.physics.world.setBounds(0, 0, W, H);

        // --- Estado ---
        this.moduloADone           = false;
        this.moduloBDone           = false;
        this.moduloCDone           = false;
        this.zamoPositioned        = false;
        this.controlAlphaActivated = false;
        this.levelCompleted        = false;
        this.terminalSequence      = [];

        // --- Sistemas ---
        this.dialogues     = new DialogueSystem(this);
        this.interaction   = new InteractionSystem(this);
        this.interactables = this.physics.add.group();
        this.walls         = this.physics.add.staticGroup();

        // --- Fondo ---
        this.add.tileSprite(W / 2, H / 2, W, H, 'floor_temp');

        // --- HUD: Objetivo (scrollFactor 0 = fijo en pantalla) ---
        this.objectiveText = this.add.text(10, 10,
            'OBJETIVO: Restaurar los tres módulos de control.', {
            fontFamily: '"Outfit", sans-serif',
            fontSize: '9px', fill: '#fff',
            backgroundColor: '#111',
            padding: { x: 5, y: 4 },
            resolution: 3
        }).setScrollFactor(0).setDepth(300);

        // --- Etiquetas de zona ---
        this.add.text(40,  107, '[ MOD-A: ENERGIA ]',        { fontFamily: '"Outfit", sans-serif', fontSize: '6px', fill: '#ffff00', resolution: 3 }).setDepth(10);
        this.add.text(395, 107, '[ MOD-B: COMUNICACION ]',   { fontFamily: '"Outfit", sans-serif', fontSize: '6px', fill: '#ffff00', resolution: 3 }).setDepth(10);
        this.add.text(238, 297, '[ MOD-C: CONTROL DUAL ]',   { fontFamily: '"Outfit", sans-serif', fontSize: '6px', fill: '#ff4444', resolution: 3 }).setDepth(10);
        this.add.text(274, 447, '[ NUCLEO DE CONTROL ]',     { fontFamily: '"Outfit", sans-serif', fontSize: '6px', fill: '#00ffff', resolution: 3 }).setDepth(10);

        // --- PAREDES separadoras ---
        // Separador horizontal A/B superior (y=100), hueco central x=152-488
        for (let x = 0; x <= W; x += 16) {
            if (x < 152 || x > 488) this.walls.create(x, 100, 'wall_temp').setImmovable(true);
        }
        // Separador vertical entre A y B (x=320, y=100-280)
        for (let y = 116; y <= 280; y += 16) {
            this.walls.create(320, y, 'wall_temp').setImmovable(true);
        }
        // Separador horizontal inferior A/B (y=280), hueco central para ModC
        for (let x = 0; x <= W; x += 16) {
            if (x < 152 || x > 488) this.walls.create(x, 280, 'wall_temp').setImmovable(true);
        }
        // Separador horizontal ModC/Nucleo (y=440), hueco central
        for (let x = 0; x <= W; x += 16) {
            if (x < 288 || x > 352) this.walls.create(x, 440, 'wall_temp').setImmovable(true);
        }

        // --- HELPER ---
        const createObj = (x, y, texture, action) => {
            const obj = new PuzzleObject(this, x, y, texture);
            obj.onInteract = action;
            this.interactables.add(obj.sprite);
            obj.sprite.parentObj = obj;
            return obj;
        };

        // ================================================
        // ZONA 1: CENTRO DE CONTROL (y=0-100)
        // ================================================
        this.doorIn = new Door(this, 320, 8, 'door_temp');
        this.doorIn.open();

        createObj(300, 65, 'machine_temp', () => {
            const sa = this.moduloADone ? 'OK' : 'ERROR';
            const sb = this.moduloBDone ? 'OK' : 'ERROR';
            const sc = this.moduloCDone ? 'OK' : 'ERROR';
            this.dialogues.show([
                'SISTEMA CENTRAL\nESTADO: INESTABLE\nPROTOCOLO DE CONTENCION: ACTIVO',
                `[ MODULO A ]  ${sa}\n[ MODULO B ]  ${sb}\n[ MODULO C ]  ${sc}`,
                'RESTAURAR TODOS LOS MODULOS\nPARA DESACTIVAR LA CONTENCION.'
            ]);
        });

        // Puerta hacia ModC (bloqueada hasta B)
        this.doorModC = new Door(this, 320, 290, 'door_temp');

        // ================================================
        // ZONA 2: MODULO A — ENERGIA (izquierda, x<320)
        // ================================================
        createObj(80, 125, 'machine_temp', () =>
            this.dialogues.show(dialogues.level03.moduloALabel)
        );

        createObj(80, 180, 'machine_temp', () =>
            this.dialogues.show(dialogues.level03.circuitDiagram)
        );

        // 4 switches de circuito (solución: índices 0 y 2 activos; 1 y 3 causan sobrecarga)
        this.circuitStates = [false, false, false, false];
        this.circuitObjs   = [];
        const CORRECT_A    = [0, 2];

        const checkModuloA = () => {
            const allOn  = CORRECT_A.every(i =>  this.circuitStates[i]);
            const noBad  = [1, 3].every(i => !this.circuitStates[i]);
            if (allOn && noBad && !this.moduloADone) {
                this.moduloADone = true;
                this.cameras.main.flash(400, 0, 180, 0, true);
                this.dialogues.show(dialogues.level03.moduloASuccess, () => {
                    screenA.sprite.setTint(0x00ffff);
                    this.objectiveText.setText('OBJETIVO: Restaurar comunicacion (Modulo B).');
                });
            }
        };

        for (let i = 0; i < 4; i++) {
            const sw = createObj(55 + i * 48, 235, 'machine_temp', () => {
                if (this.moduloADone) return;
                this.circuitStates[i] = !this.circuitStates[i];
                sw.toggle();

                if (this.circuitStates[1] && this.circuitStates[3]) {
                    this.cameras.main.shake(250, 0.02);
                    this.dialogues.show(dialogues.level03.circuitOverload, () => {
                        this.circuitStates.fill(false);
                        this.circuitObjs.forEach(s => { s.active = false; s.sprite.setTint(0xffffff); });
                    });
                    return;
                }
                checkModuloA();
            });
            this.circuitObjs.push(sw);
        }

        // Pantalla resultado A (revela secuencia para B tras completar A)
        this.add.text(255, 158, '[ PANTALLA AUX-A ]', {
            fontFamily: '"Outfit", sans-serif', fontSize: '5px', fill: '#00ffff', resolution: 3
        }).setOrigin(0.5).setDepth(10);

        const screenA = createObj(255, 180, 'machine_temp', () => {
            if (this.moduloADone) {
                this.dialogues.show(dialogues.level03.sequenceReveal);
            } else {
                this.dialogues.show([
                    'PANTALLA AUXILIAR — SIN SEÑAL.',
                    'Activar Modulo A para recibir transmision de enlace.'
                ]);
            }
        });

        // ================================================
        // ZONA 3: MODULO B — COMUNICACION (derecha, x>320)
        // ================================================
        createObj(520, 125, 'machine_temp', () =>
            this.dialogues.show(dialogues.level03.moduloBLabel)
        );

        // Panel de transmision con la guia de equivalencias
        this.add.text(430, 107, '[ PANEL GUIA ]', {
            fontFamily: '"Outfit", sans-serif', fontSize: '5px', fill: '#00ffff', resolution: 3
        }).setOrigin(0.5).setDepth(10);

        createObj(430, 125, 'machine_temp', () =>
            this.dialogues.show(dialogues.level03.moduloBGuide)
        );

        // 4 terminales (T1=△ T2=○ T3=□ T4=◆)
        // Secuencia correcta de A: △→○→□→△ = índices 0,1,2,0
        const SYMBOLS   = ['△', '○', '□', '◆'];
        const T_LABELS  = ['T1-DELTA', 'T2-CIRCULO', 'T3-CUADRADO', 'T4-ROMBO'];
        const CORRECT_B = [0, 1, 2, 0];

        for (let i = 0; i < 4; i++) {
            const tx = 355 + i * 58;
            const ty = 205;

            // Etiqueta visual clara sobre cada terminal
            this.add.text(tx, ty - 28, `${SYMBOLS[i]}\n${T_LABELS[i]}`, {
                fontFamily: '"Outfit", sans-serif',
                fontSize: '5px',
                fill: '#ffff55',
                align: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: { x: 3, y: 2 },
                resolution: 3
            }).setOrigin(0.5).setDepth(10);

            const termObj = createObj(tx, ty, 'machine_temp', () => {
                if (!this.moduloADone) {
                    this.dialogues.show([
                        'TERMINAL INACTIVO.',
                        'El sistema no tiene energia. Estabiliza el Modulo A primero.'
                    ]);
                    return;
                }
                if (this.moduloBDone) {
                    this.dialogues.show('TERMINAL SINCRONIZADO.\nTransmision completada con exito.');
                    return;
                }

                // Efecto visual al presionar
                termObj.sprite.setTint(0x00ff88);
                this.time.delayedCall(250, () => {
                    if (!this.moduloBDone) termObj.sprite.setTint(0xffffff);
                });

                this.terminalSequence.push(i);
                const pos = this.terminalSequence.length - 1;
                this.dialogues.show(
                    `${T_LABELS[i]} [${SYMBOLS[i]}] transmitido.\nSecuencia: ${this.terminalSequence.length}/4`
                );

                if (this.terminalSequence[pos] !== CORRECT_B[pos]) {
                    this.time.delayedCall(900, () => {
                        this.cameras.main.shake(150, 0.01);
                        this.terminalSequence = [];
                        this.dialogues.show(dialogues.level03.moduloBError);
                    });
                    return;
                }

                if (this.terminalSequence.length === CORRECT_B.length) {
                    this.time.delayedCall(600, () => {
                        this.moduloBDone = true;
                        this.cameras.main.flash(400, 0, 180, 0, true);
                        this.dialogues.show(dialogues.level03.moduloBSuccess, () => {
                            this.doorModC.open();
                            screenB.sprite.setTint(0x00ffff);
                            this.objectiveText.setText('OBJETIVO: Sincronizar los dos controles (Modulo C).');
                        });
                    });
                }
            });
        }

        // Pantalla resultado B (hint "dos operadores")
        const screenB = createObj(600, 165, 'machine_temp', () => {
            if (this.moduloBDone) {
                this.dialogues.show(dialogues.level03.dualOperatorHint);
            } else {
                this.dialogues.show('PROTOCOLO DE CONTENCION\nMODULO B REQUERIDO.');
            }
        });

        // ================================================
        // ZONA 4: MODULO C — CONTROL DUAL (y=300-430)
        // ================================================
        createObj(320, 325, 'machine_temp', () => {
            if (!this.moduloBDone) {
                this.dialogues.show('ACCESO RESTRINGIDO.\nCompletar Modulo B primero.');
                return;
            }
            this.dialogues.show(dialogues.level03.moduloCProtocol);
        });

        // Control Alpha (izquierda del ModC)
        const controlAlpha = createObj(215, 395, 'machine_temp', () => {
            if (!this.moduloBDone) { this.dialogues.show('ACCESO RESTRINGIDO.'); return; }
            if (this.moduloCDone)  return;

            if (!this.zamoPositioned) {
                this.dialogues.show(dialogues.level03.moduloCZamoCall, () => {
                    this.zamo.goTo(425, 395, () => {
                        this.zamoPositioned = true;
                        this.dialogues.show(dialogues.level03.zamoReady);
                    });
                });
            } else if (!this.controlAlphaActivated) {
                this.controlAlphaActivated = true;
                controlAlpha.toggle();
                this.dialogues.show('CONTROL-ALPHA: ACTIVADO\nSincronizando con Control-Beta...');
                // Zamo activa Beta automáticamente tras 4 segundos
                this.time.delayedCall(4000, () => {
                    controlBeta.toggle();
                    this.cameras.main.flash(500, 0, 255, 100, true);
                    this.cameras.main.shake(300, 0.015);
                    this.completeDualControl();
                });
            } else {
                this.dialogues.show('CONTROL-ALPHA: ACTIVO\nEsperando sincronizacion con Beta...');
            }
        });

        // Control Beta (derecha del ModC — zona de Zamo)
        const controlBeta = createObj(425, 395, 'machine_temp', () => {
            if (!this.moduloBDone) { this.dialogues.show('ACCESO RESTRINGIDO.'); return; }
            if (this.zamoPositioned) {
                this.dialogues.show('Zamo esta en posicion aqui.\nActiva Control-Alpha primero.');
            } else {
                this.dialogues.show('CONTROL-BETA\nRequiere asistente en posicion.\nInteractua primero con Control-Alpha.');
            }
        });

        // ================================================
        // ZONA 5: NUCLEO (y=445-480)
        // ================================================
        this.doorOut = new Door(this, 320, 468, 'door_temp');

        // ================================================
        // JUGADOR Y ZAMO (después de física para que existan)
        // ================================================
        this.player = new Player(this, 320, 40, 'player');
        this.zamo   = new Zamo(this,   295, 40, 'zamo', this.player);

        // ================================================
        // COLISIONADORES
        // ================================================
        this.physics.add.collider(this.player.sprite, this.walls);
        this.physics.add.collider(this.zamo.sprite,   this.walls);
        this.physics.add.collider(this.player.sprite, this.interactables);

        this.physics.add.collider(this.player.sprite, this.doorModC.sprite,
            null, () => !this.doorModC.isOpen);
        this.physics.add.collider(this.player.sprite, this.doorOut.sprite,
            null, () => !this.doorOut.isOpen);
        this.physics.add.overlap(this.player.sprite, this.doorOut.sprite, () => {
            if (this.doorOut.isOpen && !this.levelCompleted) {
                this.levelCompleted = true;
                this.completeLevel();
            }
        });

        // ================================================
        // INPUT
        // ================================================
        this.keys = this.input.keyboard.addKeys('W,A,S,D,E');
        this.input.keyboard.on('keydown-E', () =>
            this.interaction.interact(this.player.sprite, this.interactables.getChildren())
        );

        // ================================================
        // CAMARA (sigue al jugador, mapa grande)
        // ================================================
        this.cameras.main.setZoom(4);
        this.cameras.main.startFollow(this.player.sprite, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, W, H);

        // ================================================
        // INTRO
        // ================================================
        this.time.delayedCall(900, () => {
            this.doorIn.close();
            this.cameras.main.shake(250, 0.012);
            this.dialogues.show(dialogues.level03.intro);
        });
    }

    // ------------------------------------------------
    completeDualControl() {
        this.moduloCDone = true;
        this.zamo.followPlayer();

        const pasos = [
            'PROTOCOLO DE CONTENCION\nDESACTIVANDO...\n[=....] 25%',
            'PROTOCOLO DE CONTENCION\nDESACTIVANDO...\n[==...] 50%',
            'PROTOCOLO DE CONTENCION\nDESACTIVANDO...\n[===..] 75%',
            'PROTOCOLO DE CONTENCION\nDESACTIVANDO...\n[=====] 100%\n\nCONTENCION DESACTIVADA'
        ];
        let idx = 0;
        const avanzar = () => {
            if (idx < pasos.length) {
                this.dialogues.show(pasos[idx], () => {
                    idx++;
                    this.time.delayedCall(300, avanzar);
                });
            } else {
                this.doorOut.open();
                this.objectiveText.setText('OBJETIVO: Acceder al nucleo de control.');
                this.dialogues.show(dialogues.level03.contencionOff);
            }
        };
        avanzar();
    }

    // ------------------------------------------------
    completeLevel() {
        this.dialogues.show(dialogues.level03.zamoFinal, () => {
            this.add.text(320, 240, '¡NIVEL COMPLETADO!', {
                fontFamily: '"Outfit", sans-serif',
                fontSize: '20px', fill: '#0f0',
                backgroundColor: '#000', resolution: 3
            }).setOrigin(0.5).setScrollFactor(0).setDepth(500);
            this.cameras.main.fade(1500, 0, 0, 0);
            this.time.delayedCall(1600, () => {
                this.scene.start('Level04Scene');
            });
        });
    }

    // ------------------------------------------------
    update() {
        this.player.update(this.keys);
        this.zamo.update();
    }
}
