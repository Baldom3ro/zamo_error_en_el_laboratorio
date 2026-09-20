class Level04Scene extends Phaser.Scene {
    constructor() {
        super('Level04Scene');
    }

    preload() {
        if (!this.textures.exists('fenix')) {
            this.load.image('fenix', 'assets/characters/fenix.jpg');
        }
    }

    create() {
        const W = 640, H = 480;
        this.physics.world.setBounds(0, 0, W, H);

        // --- Estado de progresión del Nivel 4 ---
        this.energiaEstable            = false;
        this.secuenciaCorrecta         = false;
        this.contencionDesactivada     = false;
        this.zamoEnPosicion            = false;
        this.sincronizacionCompletada  = false;
        this.nucleoReiniciado          = false;
        this.laboratorioRestaurado     = false;

        // --- Sistemas ---
        this.dialogues     = new DialogueSystem(this);
        this.interaction   = new InteractionSystem(this);
        this.interactables = this.physics.add.group();
        this.walls         = this.physics.add.staticGroup();

        // --- Fondo ---
        this.add.tileSprite(W / 2, H / 2, W, H, 'floor_temp');

        // --- HUD: Objetivo ---
        this.objectiveText = this.add.text(10, 10,
            'OBJETIVO: Descubrir que ocurre con el nucleo.', {
            fontFamily: '"Outfit", sans-serif',
            fontSize: '9px', fill: '#fff',
            backgroundColor: '#111',
            padding: { x: 5, y: 4 },
            resolution: 3
        }).setScrollFactor(0).setDepth(300);

        // --- Etiquetas de sector en el escenario ---
        this.add.text(320, 35, '[ NUCLEO CENTRAL DEL LABORATORIO ]', {
            fontFamily: '"Outfit", sans-serif', fontSize: '7px', fill: '#00ffff', resolution: 3
        }).setOrigin(0.5).setDepth(10);

        this.add.text(135, 160, '[ SECTOR ENERGIA ]', {
            fontFamily: '"Outfit", sans-serif', fontSize: '6px', fill: '#ffff00', resolution: 3
        }).setOrigin(0.5).setDepth(10);

        this.add.text(505, 160, '[ SECTOR FRECUENCIA ]', {
            fontFamily: '"Outfit", sans-serif', fontSize: '6px', fill: '#ffff00', resolution: 3
        }).setOrigin(0.5).setDepth(10);

        this.add.text(320, 255, '[ CONSOLA DE CONTENCION ]', {
            fontFamily: '"Outfit", sans-serif', fontSize: '6px', fill: '#ff4444', resolution: 3
        }).setOrigin(0.5).setDepth(10);

        this.add.text(320, 395, '[ SERVIDORES DE DIAGNOSTICO ]', {
            fontFamily: '"Outfit", sans-serif', fontSize: '6px', fill: '#aaaaaa', resolution: 3
        }).setOrigin(0.5).setDepth(10);

        // --- Paredes perimetrales y divisiones internas ---
        // Paredes del perímetro
        for (let x = 0; x <= W; x += 16) {
            this.walls.create(x, 8, 'wall_temp').setImmovable(true);
            if (x < 290 || x > 350) {
                this.walls.create(x, H - 8, 'wall_temp').setImmovable(true);
            }
        }
        for (let y = 0; y <= H; y += 16) {
            this.walls.create(8, y, 'wall_temp').setImmovable(true);
            this.walls.create(W - 8, y, 'wall_temp').setImmovable(true);
        }

        // Divisiones arquitectónicas del núcleo
        // Barrera que protege el núcleo (y=115, hueco central en x: 260-380)
        for (let x = 80; x <= 560; x += 16) {
            if (x < 260 || x > 380) {
                this.walls.create(x, 115, 'wall_temp').setImmovable(true);
            }
        }

        // Barreras divisorias intermedias (y=265)
        for (let x = 60; x <= 220; x += 16) {
            this.walls.create(x, 265, 'wall_temp').setImmovable(true);
        }
        for (let x = 420; x <= 580; x += 16) {
            this.walls.create(x, 265, 'wall_temp').setImmovable(true);
        }

        // Helper para crear interactuables
        const createObj = (x, y, texture, action) => {
            const obj = new PuzzleObject(this, x, y, texture);
            obj.onInteract = action;
            this.interactables.add(obj.sprite);
            obj.sprite.parentObj = obj;
            return obj;
        };

        // ================================================
        // SECTOR INFERIOR: ENTRADA Y SERVIDORES DE REGISTRO
        // ================================================
        this.doorIn = new Door(this, 320, 460, 'door_temp');
        this.doorIn.open();

        // Servidores de Diagnóstico (revelan la historia)
        createObj(230, 360, 'machine_temp', () =>
            this.dialogues.show(dialogues.level04.incidentLog1)
        );
        this.add.text(230, 340, 'LOG #01', {
            fontFamily: '"Outfit", sans-serif', fontSize: '5px', fill: '#00ffff', resolution: 3
        }).setOrigin(0.5).setDepth(10);

        createObj(410, 360, 'machine_temp', () =>
            this.dialogues.show(dialogues.level04.incidentLog2)
        );
        this.add.text(410, 340, 'LOG #02', {
            fontFamily: '"Outfit", sans-serif', fontSize: '5px', fill: '#00ffff', resolution: 3
        }).setOrigin(0.5).setDepth(10);

        // Servidor-Alpha: Pista para el puzzle de energía
        createObj(135, 330, 'machine_temp', () =>
            this.dialogues.show(dialogues.level04.energyClue)
        );
        this.add.text(135, 310, '[ PISTA ENERGIA ]', {
            fontFamily: '"Outfit", sans-serif', fontSize: '5px', fill: '#ffff55', resolution: 3
        }).setOrigin(0.5).setDepth(10);

        // Monitor de Frecuencia: Pista para la secuencia de símbolos
        createObj(505, 330, 'machine_temp', () =>
            this.dialogues.show(dialogues.level04.symbolClue)
        );
        this.add.text(505, 310, '[ PISTA FRECUENCIA ]', {
            fontFamily: '"Outfit", sans-serif', fontSize: '5px', fill: '#ffff55', resolution: 3
        }).setOrigin(0.5).setDepth(10);

        // ================================================
        // ETAPA A: PANEL DE ENERGIA (Izquierda, y=200)
        // Solución: A=true, B=true, C=false, D=true
        // ================================================
        this.energyStates = [false, false, false, false];
        this.energyObjs   = [];
        const ENERGY_TARGET = [true, true, false, true];
        const ENERGY_LABELS = ['CIR-A', 'CIR-B', 'CIR-C', 'CIR-D'];

        const checkEnergy = () => {
            const ok = this.energyStates.every((val, idx) => val === ENERGY_TARGET[idx]);
            if (ok && !this.energiaEstable) {
                this.energiaEstable = true;
                this.cameras.main.flash(400, 0, 200, 100, true);
                this.dialogues.show(dialogues.level04.energySuccess, () => {
                    this.energyObjs.forEach(o => o.sprite.setTint(0x00ff88));
                    this.updateMainObjective();
                });
            }
        };

        for (let i = 0; i < 4; i++) {
            const ex = 75 + i * 40;
            const ey = 205;

            const elabel = this.add.text(ex, ey - 24, `${ENERGY_LABELS[i]}\n[OFF]`, {
                fontFamily: '"Outfit", sans-serif', fontSize: '5px', fill: '#ff4444',
                align: 'center', backgroundColor: 'rgba(0,0,0,0.7)', padding: { x: 2, y: 1 }, resolution: 3
            }).setOrigin(0.5).setDepth(10);

            const eobj = createObj(ex, ey, 'machine_temp', () => {
                if (this.energiaEstable) {
                    this.dialogues.show('CIRCUITO ESTABLE.\nCalibracion fijada.');
                    return;
                }
                this.energyStates[i] = !this.energyStates[i];
                eobj.toggle();

                if (this.energyStates[i]) {
                    elabel.setText(`${ENERGY_LABELS[i]}\n[ON]`).setFill('#00ff88');
                } else {
                    elabel.setText(`${ENERGY_LABELS[i]}\n[OFF]`).setFill('#ff4444');
                }
                checkEnergy();
            });
            this.energyObjs.push(eobj);
        }

        // ================================================
        // ETAPA B: CONSOLA DE FRECUENCIA GEOMETRICA (Derecha, y=200)
        // Símbolos: ▲(0), ●(1), ■(2), ◆(3)
        // Orden requerido: ▲ -> ■ -> ◆ -> ● (índices 0, 2, 3, 1)
        // ================================================
        const SYMBOLS        = ['▲', '●', '■', '◆'];
        const S_NAMES        = ['TRIANGULO', 'CIRCULO', 'CUADRADO', 'ROMBO'];
        const CORRECT_SYMBOL = [0, 2, 3, 1];
        this.symbolSequence  = [];
        this.symbolObjs      = [];

        for (let i = 0; i < 4; i++) {
            const sx = 445 + i * 40;
            const sy = 205;

            this.add.text(sx, sy - 24, `${SYMBOLS[i]}\n${S_NAMES[i]}`, {
                fontFamily: '"Outfit", sans-serif', fontSize: '5px', fill: '#ffff55',
                align: 'center', backgroundColor: 'rgba(0,0,0,0.7)', padding: { x: 2, y: 1 }, resolution: 3
            }).setOrigin(0.5).setDepth(10);

            const sobj = createObj(sx, sy, 'machine_temp', () => {
                if (this.secuenciaCorrecta) {
                    this.dialogues.show('FRECUENCIA YA SINCRONIZADA.');
                    return;
                }

                sobj.sprite.setTint(0x00ffff);
                this.time.delayedCall(200, () => {
                    if (!this.secuenciaCorrecta) sobj.sprite.setTint(0xffffff);
                });

                this.symbolSequence.push(i);
                const step = this.symbolSequence.length - 1;

                this.dialogues.show(
                    `Frecuencia: ${SYMBOLS[i]} [${S_NAMES[i]}]\nPaso: ${this.symbolSequence.length}/4`
                );

                if (this.symbolSequence[step] !== CORRECT_SYMBOL[step]) {
                    this.time.delayedCall(800, () => {
                        this.cameras.main.shake(150, 0.015);
                        this.symbolSequence = [];
                        this.dialogues.show(dialogues.level04.symbolError);
                    });
                    return;
                }

                if (this.symbolSequence.length === CORRECT_SYMBOL.length) {
                    this.time.delayedCall(500, () => {
                        this.secuenciaCorrecta = true;
                        this.cameras.main.flash(400, 0, 180, 255, true);
                        this.dialogues.show(dialogues.level04.symbolSuccess, () => {
                            this.symbolObjs.forEach(o => o.sprite.setTint(0x00ffff));
                            this.updateMainObjective();
                        });
                    });
                }
            });
            this.symbolObjs.push(sobj);
        }

        // ================================================
        // ETAPA C: CONSOLA DE CONTENCION (Centro, x=320, y=230)
        // ================================================
        const contencionMachine = createObj(320, 230, 'machine_temp', () => {
            if (this.contencionDesactivada) {
                this.dialogues.show([
                    'CONTENCION: DESACTIVADA',
                    'Acceso a consolas de reinicio manual operativo.'
                ]);
                return;
            }

            if (!this.energiaEstable || !this.secuenciaCorrecta) {
                const eStr = this.energiaEstable ? 'ESTABLE' : 'PENDIENTE';
                const sStr = this.secuenciaCorrecta ? 'CALIBRADA' : 'PENDIENTE';
                this.dialogues.show([
                    `ESTADO REQUISITOS:\nENERGIA: ${eStr}\nFRECUENCIA: ${sStr}`,
                    dialogues.level04.contencionCheckFail[0]
                ]);
                return;
            }

            // Ambos requisitos cumplidos -> Desactivar contención
            this.contencionDesactivada = true;
            contencionMachine.sprite.setTint(0x00ff00);
            this.cameras.main.flash(500, 0, 255, 100, true);
            this.dialogues.show(dialogues.level04.contencionSuccess, () => {
                this.updateMainObjective();
            });
        });

        // ================================================
        // ETAPA D: SISTEMA CENTRAL Y REINICIO DUAL (NÚCLEO)
        // ================================================
        // Núcleo central gigante (objeto interactivo principal)
        this.coreObj = createObj(320, 70, 'machine_temp', () => {
            if (this.laboratorioRestaurado) {
                this.dialogues.show(dialogues.level04.incidentResolution);
                return;
            }
            if (!this.contencionDesactivada) {
                this.dialogues.show(dialogues.level04.systemStatus);
            } else {
                this.dialogues.show([
                    'SISTEMA CENTRAL — LISTO PARA REINICIO',
                    'Usa las Consolas Alpha y Beta para la activacion coordinada.'
                ]);
            }
        });
        this.coreObj.sprite.setScale(2.5);

        // Consola Alpha (Izquierda del núcleo, x=220, y=140) — Jugador
        this.add.text(220, 118, '[ CONSOLA ALPHA ]', {
            fontFamily: '"Outfit", sans-serif', fontSize: '5px', fill: '#00ffff', resolution: 3
        }).setOrigin(0.5).setDepth(10);

        const controlAlpha = createObj(220, 140, 'machine_temp', () => {
            if (!this.contencionDesactivada) {
                this.dialogues.show('CONSOLA BLOQUEADA.\nDesactivar protocolo de contencion primero.');
                return;
            }
            if (this.laboratorioRestaurado) return;

            if (!this.zamoEnPosicion) {
                // Llamar a Zamo para coordinar
                this.dialogues.show(dialogues.level04.dualControlReady, () => {
                    this.zamo.goTo(420, 140, () => {
                        this.zamoEnPosicion = true;
                        controlBeta.sprite.setTint(0x00ff88);
                        this.dialogues.show(dialogues.level04.zamoInPosition);
                    });
                });
            } else if (!this.sincronizacionCompletada) {
                // Iniciar sincronización dual
                this.sincronizacionCompletada = true;
                controlAlpha.toggle();
                controlAlpha.sprite.setTint(0x00ff88);

                this.dialogues.show(dialogues.level04.syncSuccess, () => {
                    this.iniciarSecuenciaReinicio();
                });
            }
        });

        // Consola Beta (Derecha del núcleo, x=420, y=140) — Zamo
        this.add.text(420, 118, '[ CONSOLA BETA ]', {
            fontFamily: '"Outfit", sans-serif', fontSize: '5px', fill: '#ffaa00', resolution: 3
        }).setOrigin(0.5).setDepth(10);

        const controlBeta = createObj(420, 140, 'machine_temp', () => {
            if (!this.contencionDesactivada) {
                this.dialogues.show('CONSOLA BLOQUEADA.\nRequiere autorizacion del sistema central.');
                return;
            }
            if (this.zamoEnPosicion) {
                this.dialogues.show('Zamo esta preparado en la Consola Beta.\nActiva la Consola Alpha para sincronizar.');
            } else {
                this.dialogues.show('CONSOLA BETA\nRequiere segundo operador.\nHabla en la Consola Alpha con Zamo.');
            }
        });

        // ================================================
        // JUGADOR Y ZAMO
        // ================================================
        this.player = new Player(this, 320, 430, 'player');
        this.zamo   = new Zamo(this,   295, 430, 'zamo', this.player);

        // ================================================
        // COLISIONES
        // ================================================
        this.physics.add.collider(this.player.sprite, this.walls);
        this.physics.add.collider(this.zamo.sprite,   this.walls);
        this.physics.add.collider(this.player.sprite, this.interactables);

        // ================================================
        // INPUT
        // ================================================
        this.keys = this.input.keyboard.addKeys('W,A,S,D,E');
        this.input.keyboard.on('keydown-E', () =>
            this.interaction.interact(this.player.sprite, this.interactables.getChildren())
        );

        // ================================================
        // CAMARA
        // ================================================
        this.cameras.main.setZoom(4);
        this.cameras.main.startFollow(this.player.sprite, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, W, H);

        // ================================================
        // INTRO
        // ================================================
        this.time.delayedCall(800, () => {
            this.doorIn.close();
            this.cameras.main.shake(200, 0.01);
            this.dialogues.show(dialogues.level04.intro);
        });
    }

    // ------------------------------------------------
    updateMainObjective() {
        if (!this.energiaEstable) {
            this.objectiveText.setText('OBJETIVO: Estabilizar energia del nucleo.');
        } else if (!this.secuenciaCorrecta) {
            this.objectiveText.setText('OBJETIVO: Configurar secuencia de frecuencia.');
        } else if (!this.contencionDesactivada) {
            this.objectiveText.setText('OBJETIVO: Desactivar protocolo de contencion.');
        } else if (!this.sincronizacionCompletada) {
            this.objectiveText.setText('OBJETIVO: Coordinar reinicio con Zamo.');
        } else {
            this.objectiveText.setText('OBJETIVO: Restaurar el laboratorio.');
        }
    }

    // ------------------------------------------------
    iniciarSecuenciaReinicio() {
        this.nucleoReiniciado = true;
        this.zamo.followPlayer();

        const rebootSteps = [
            'INICIANDO REINICIO MAESTRO...\nESTABILIDAD: 10%\n[=.........]',
            'RESTAURANDO SUBSISTEMAS...\nESTABILIDAD: 25%\n[===.......]',
            'SINCRONIZANDO NODOS Y SENSORES...\nESTABILIDAD: 50%\n[=====.....]',
            'DESACTIVANDO PROTOCOLOS DE ALERTA...\nESTABILIDAD: 75%\n[=======...]',
            'SISTEMA CENTRAL AL 100%\nCONTENCION DESACTIVADA\n[==========]\n\n¡LABORATORIO RESTAURADO!'
        ];

        let idx = 0;
        const pasoReinicio = () => {
            if (idx < rebootSteps.length) {
                this.cameras.main.flash(300, 100, 200, 255, true);
                this.cameras.main.shake(200, 0.01);
                this.dialogues.show(rebootSteps[idx], () => {
                    idx++;
                    this.time.delayedCall(250, pasoReinicio);
                });
            } else {
                this.laboratorioRestaurado = true;
                this.coreObj.sprite.setTint(0x00ff88);
                this.objectiveText.setText('OBJETIVO: Mision cumplida. Laboratorio a salvo.');
                this.mostrarResolucionFinal();
            }
        };

        this.time.delayedCall(500, pasoReinicio);
    }

    // ------------------------------------------------
    mostrarResolucionFinal() {
        // Mostrar registro final de resolución y charla de Zamo
        this.dialogues.show(dialogues.level04.incidentResolution, () => {
            this.dialogues.show(dialogues.level04.zamoFinalTalk, () => {
                this.mostrarPantallaFinal();
            });
        });
    }

    // ------------------------------------------------
    mostrarPantallaFinal() {
        const scrW = this.scale.width;
        const scrH = this.scale.height;

        // Resetear cámara para ocupar toda la pantalla completa (1280x720)
        this.cameras.main.stopFollow();
        this.cameras.main.removeBounds();
        this.cameras.main.setZoom(1);
        this.cameras.main.setScroll(0, 0);

        const overlay = this.add.rectangle(scrW / 2, scrH / 2, scrW + 400, scrH + 400, 0x000000, 0.95)
            .setDepth(1000);

        const titleText = this.add.text(scrW / 2, 160, 'ZAMO: ERROR EN EL LABORATORIO\n¡AVENTURA COMPLETADA!', {
            fontFamily: '"Outfit", sans-serif',
            fontSize: '28px',
            fill: '#00ff88',
            align: 'center',
            resolution: 3
        }).setOrigin(0.5).setDepth(1001);

        const summaryText = this.add.text(scrW / 2, 330,
            'NIVELES RESTAURADOS:\n' +
            '✓ NIVEL 1: El Laboratorio Fuera de Control\n' +
            '✓ NIVEL 2: La Zona de Investigacion\n' +
            '✓ NIVEL 3: El Nucleo de Control\n' +
            '✓ NIVEL 4: El Nucleo\n\n' +
            'El sistema esta 100% operativo.\n¡Gracias por jugar!', {
            fontFamily: '"Outfit", sans-serif',
            fontSize: '18px',
            fill: '#ffffff',
            align: 'center',
            lineSpacing: 8,
            resolution: 3
        }).setOrigin(0.5).setDepth(1001);

        const returnText = this.add.text(scrW / 2, 530, '[ Presiona ENTER para continuar ]', {
            fontFamily: '"Outfit", sans-serif',
            fontSize: '16px',
            fill: '#ffff00',
            resolution: 3
        }).setOrigin(0.5).setDepth(1001);

        this.tweens.add({
            targets: returnText,
            alpha: 0.3,
            duration: 600,
            yoyo: true,
            repeat: -1
        });

        const enterKey = this.input.keyboard.addKey('ENTER');
        enterKey.once('down', () => {
            overlay.destroy();
            titleText.destroy();
            summaryText.destroy();
            returnText.destroy();
            this.mostrarEscenaFenix();
        });
    }

    // ------------------------------------------------
    mostrarEscenaFenix() {
        const scrW = this.scale.width;
        const scrH = this.scale.height;

        // Asegurar cámara limpia sin zoom ni seguimiento
        this.cameras.main.stopFollow();
        this.cameras.main.removeBounds();
        this.cameras.main.setZoom(1);
        this.cameras.main.setScroll(0, 0);

        // Fondo 100% negro absoluto cubriendo toda la pantalla
        const bg = this.add.rectangle(scrW / 2, scrH / 2, scrW + 400, scrH + 400, 0x000000, 1)
            .setDepth(2000);

        // Resplandor fuego/rojo tenue
        const glow = this.add.rectangle(scrW / 2, 280, 500, 500, 0x661100, 0.35)
            .setDepth(2001);
        this.tweens.add({
            targets: glow,
            alpha: 0.75,
            scale: 1.1,
            duration: 1200,
            yoyo: true,
            repeat: -1
        });

        // Imagen del Fénix (antigua mascota)
        const fenixImg = this.add.image(scrW / 2, 270, 'fenix')
            .setDepth(2002)
            .setDisplaySize(380, 380)
            .setAlpha(0);

        // Fade in dramático del Fénix
        this.tweens.add({
            targets: fenixImg,
            alpha: 1,
            duration: 1800,
            ease: 'Power2',
            onComplete: () => {
                // Diálogo del Fénix
                this.dialogues.show(dialogues.level04.fenixEpilogue, () => {
                    // Texto dramático CONTINUARÁ...
                    const continuaraText = this.add.text(scrW / 2, 530, 'CONTINUARÁ...', {
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: '36px',
                        fill: '#ff3300',
                        fontStyle: 'bold',
                        resolution: 3
                    }).setOrigin(0.5).setDepth(2003).setAlpha(0);

                    const returnMenu = this.add.text(scrW / 2, 610, '[ Presiona ENTER para volver al Menu Principal ]', {
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: '16px',
                        fill: '#ffffaa',
                        resolution: 3
                    }).setOrigin(0.5).setDepth(2003).setAlpha(0);

                    this.tweens.add({
                        targets: [continuaraText, returnMenu],
                        alpha: 1,
                        duration: 1200,
                        onComplete: () => {
                            const enterKey = this.input.keyboard.addKey('ENTER');
                            enterKey.once('down', () => {
                                this.cameras.main.fade(1000, 0, 0, 0);
                                this.time.delayedCall(1100, () => {
                                    this.scene.start('MenuScene');
                                });
                            });
                        }
                    });
                });
            }
        });
    }

    // ------------------------------------------------
    update() {
        this.player.update(this.keys);
        this.zamo.update();
    }
}
