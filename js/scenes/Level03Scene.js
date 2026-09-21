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

        // --- Estado de seguridad y confinamiento ---
        this.securityErrors = 0;
        this.confinamientoActivo = false;
        this.confinamientoTimer = 0;
        this.confinamientoTimerEvent = null;

        // Overlay de confinamiento
        this.lockdownOverlay = this.add.rectangle(W / 2, H / 2, W, H, 0xff0000, 0).setScrollFactor(0).setDepth(200);

        // ─── HUD de Confinamiento: DIV HTML flotante (igual a DialogueSystem) ───
        let lockdownDiv = document.getElementById('lockdown-hud');
        if (!lockdownDiv) {
            lockdownDiv = document.createElement('div');
            lockdownDiv.id = 'lockdown-hud';
            lockdownDiv.style.cssText = [
                'position:fixed',
                'top:18px',
                'left:50%',
                'transform:translateX(-50%)',
                'background:rgba(20,8,8,0.96)',
                'color:#ffffff',
                'font-family:"Outfit","Courier New",monospace',
                'padding:10px 18px',
                'border:2px solid #ff3333',
                'border-radius:8px',
                'box-shadow:0 0 16px rgba(255,50,50,0.7)',
                'z-index:99998',
                'display:none',
                'text-align:center',
                'min-width:320px',
                'max-width:90vw',
                'pointer-events:none'
            ].join(';');
            lockdownDiv.innerHTML = `
                <div style="font-size:13px;font-weight:bold;color:#ff3333;letter-spacing:1px;margin-bottom:6px;">
                    🚨 PROTOCOLO DE CONFINAMIENTO ACTIVO 🚨
                </div>
                <div style="width:100%;height:14px;background:#181818;border-radius:4px;overflow:hidden;border:1px solid #550000;margin-bottom:6px;">
                    <div id="lockdown-fill" style="width:100%;height:100%;background:#ff3333;transition:width 0.2s linear;"></div>
                </div>
                <div id="lockdown-status" style="font-size:12px;font-weight:bold;color:#ffffff;">
                    ¡SELLADO TOTAL EN: 20s! Cancela en la Terminal Central
                </div>
            `;
            document.body.appendChild(lockdownDiv);
        }
        this.lockdownDiv = lockdownDiv;
        this.lockdownFill = document.getElementById('lockdown-fill');
        this.lockdownStatus = document.getElementById('lockdown-status');

        this.events.once('shutdown', () => {
            if (this.lockdownDiv) this.lockdownDiv.style.display = 'none';
        });
        this.events.once('destroy', () => {
            if (this.lockdownDiv) this.lockdownDiv.style.display = 'none';
        });

        this.registrarErrorSeguridad = (motivo) => {
            if (this.confinamientoActivo) return;
            this.securityErrors++;

            if (this.securityErrors === 1) {
                this.cameras.main.shake(200, 0.015);
                this.dialogues.show([
                    motivo || "ADVERTENCIA: Intento incorrecto detectado.",
                    "SISTEMA: Registro de intrusión (1/3).",
                    "Zamo: Creo que el laboratorio ya sabe que estamos improvisando."
                ]);
            } else if (this.securityErrors === 2) {
                this.cameras.main.shake(250, 0.02);
                this.dialogues.show([
                    motivo || "ADVERTENCIA CRÍTICA: Intento no autorizado.",
                    "SISTEMA: Protocolo de seguridad en alerta (2/3).",
                    "Zamo: Solo una observación: deberíamos dejar de probar combinaciones al azar."
                ]);
            } else if (this.securityErrors >= 3) {
                activarConfinamiento();
            }
        };

        const actualizarBarraConfinamiento = () => {
            const pct = Math.max(0, Math.min(100, (this.confinamientoTimer / 20) * 100));
            if (this.lockdownFill) {
                this.lockdownFill.style.width = pct + '%';
            }
            if (this.lockdownStatus) {
                if (this.confinamientoTimer <= 7) {
                    this.lockdownStatus.innerHTML = `<span style="color:#ff3333;font-weight:bold;">¡COMPUERTAS CERRÁNDOSE EN ${this.confinamientoTimer}s! ¡CORRE AL CENTRO!</span>`;
                } else {
                    this.lockdownStatus.innerHTML = `¡SELLADO TOTAL EN: ${this.confinamientoTimer}s! Cancela en la Terminal Central`;
                }
            }
        };

        const activarConfinamiento = () => {
            this.confinamientoActivo = true;
            this.confinamientoTimer = 20;

            this.cameras.main.flash(400, 255, 0, 0);
            this.cameras.main.shake(500, 0.025);

            this.tweens.add({
                targets: this.lockdownOverlay,
                fillAlpha: 0.3,
                duration: 500,
                yoyo: true,
                repeat: -1
            });

            if (this.lockdownDiv) this.lockdownDiv.style.display = 'block';
            actualizarBarraConfinamiento();

            this.dialogues.show([
                "Zamo: Era una sugerencia, por cierto.",
                "¡PROTOCOLO DE SEGURIDAD ACTIVADO!",
                "El laboratorio entra en modo de confinamiento.",
                "¡Cancela el protocolo en la Terminal Central antes del cierre total!"
            ]);

            this.confinamientoTimerEvent = this.time.addEvent({
                delay: 1000,
                repeat: 20,
                callback: () => {
                    this.confinamientoTimer--;
                    if (this.confinamientoTimer >= 0) {
                        actualizarBarraConfinamiento();
                        if (this.confinamientoTimer === 0) {
                            derrotaConfinamiento();
                        }
                    }
                }
            });
        };

        this.cancelarConfinamiento = () => {
            this.confinamientoActivo = false;
            this.securityErrors = 1; // Resetea a 1 advertencia
            if (this.lockdownDiv) this.lockdownDiv.style.display = 'none';
            if (this.confinamientoTimerEvent) this.confinamientoTimerEvent.remove();
            this.tweens.killTweensOf(this.lockdownOverlay);
            this.lockdownOverlay.fillAlpha = 0;

            this.cameras.main.flash(300, 0, 255, 100);
            this.dialogues.show([
                "PROTOCOLO DE CONFINAMIENTO ABORTADO.",
                "Compuertas desbloqueadas temporalmente.",
                "Zamo: Eso estuvo demasiado cerca."
            ]);
        };

        const derrotaConfinamiento = () => {
            this.confinamientoActivo = false;
            if (this.lockdownDiv) this.lockdownDiv.style.display = 'none';
            if (this.confinamientoTimerEvent) this.confinamientoTimerEvent.remove();
            this.doorIn.close();
            this.doorModC.close();
            this.cameras.main.shake(800, 0.035);

            this.time.delayedCall(800, () => {
                this.scene.start('GameOverScene', {
                    level: 'Level03Scene',
                    title: 'PROTOCOLO DE CONFINAMIENTO COMPLETADO',
                    subtitle: 'Se superó el límite de infracciones. Todas las compuertas de seguridad fueron selladas permanentemente.',
                    zamoQuote: 'Bueno... técnicamente nadie puede entrar. Ni nosotros salir.',
                    accentColor: '#ff2222'
                });
            });
        };

        // ================================================
        // ZONA 1: CENTRO DE CONTROL (y=0-100)
        // ================================================
        this.doorIn = new Door(this, 320, 8, 'door_temp');
        this.doorIn.open();

        createObj(300, 65, 'machine_temp', () => {
            if (this.confinamientoActivo) {
                this.cancelarConfinamiento();
                return;
            }
            const sa = this.moduloADone ? 'OK' : 'ERROR';
            const sb = this.moduloBDone ? 'OK' : 'ERROR';
            const sc = this.moduloCDone ? 'OK' : 'ERROR';
            this.dialogues.show([
                'SISTEMA CENTRAL\nESTADO: INESTABLE\nPROTOCOLO DE CONTENCION: ACTIVO',
                `[ MODULO A ]  ${sa}\n[ MODULO B ]  ${sb}\n[ MODULO C ]  ${sc}`,
                `FALLOS REGISTRADOS: ${this.securityErrors}/3`,
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
                    this.circuitStates.fill(false);
                    this.circuitObjs.forEach(s => { s.active = false; s.sprite.setTint(0xffffff); });
                    this.registrarErrorSeguridad("SOBRECARGA ELÉCTRICA EN MÓDULO A.");
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
                    this.time.delayedCall(700, () => {
                        this.cameras.main.shake(150, 0.01);
                        this.terminalSequence = [];
                        this.registrarErrorSeguridad("SECUENCIA DE TRANSMISIÓN INCORRECTA (MÓDULO B).");
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
