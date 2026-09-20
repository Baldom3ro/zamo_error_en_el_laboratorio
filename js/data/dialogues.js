const dialogues = {
    level01: {
        intro: [
            "Parece que el sistema de seguridad cerró las puertas.",
            "Si queremos salir de aquí, tendremos que volver a poner en marcha la energía.",
            "Busca alguna forma de activar el sistema. Yo echaré un vistazo por aquí."
        ],
        computer: [
            "SISTEMA DE LABORATORIO\nENERGÍA PRINCIPAL: DESACTIVADA\nSISTEMA DE RESPALDO: ACTIVO",
            "CONTROL MANUAL REQUERIDO.\nSe requiere activar el circuito auxiliar."
        ],
        machineDiagnostic: [
            "CIRCUITO AUXILIAR\n1 - INACTIVO\n2 - INACTIVO\n3 - INACTIVO\n4 - INACTIVO"
        ],
        screenSequence: [
            "SECUENCIA DE ARRANQUE\n○ ● ○ ●"
        ],
        zamoHole: [
            "Ese interruptor está al otro lado.",
            "Creo que yo sí puedo llegar."
        ],
        zamoHint1: [
            "Tal vez esa pantalla y los interruptores tengan algo que ver entre sí."
        ],
        zamoHint2: [
            "No creo que esas luces estén ahí solamente para decorar."
        ],
        powerRestored: [
            "¡Funcionó!",
            "Ves, no rompimos nada. Todavía."
        ],
        powerError: [
            "CONFIGURACIÓN INCORRECTA.",
            "El circuito se reinició. Revisa las pistas y prueba otra vez."
        ]
    },
    level02: {
        intro: [
            "Eso sonó como una puerta cerrándose.",
            "Y antes de que preguntes... sí, creo que estamos encerrados."
        ],
        computer: [
            "TERMINAL PRINCIPAL: PROTOCOLO DE SEGURIDAD\nEl sistema requiere una clave de 3 fases.\n[ FASE 1 ] -> [ FASE 2 ] -> [ FASE 3 ]",
            "REGISTRO DE TELEMETRÍA:\n- Símbolo ◆ (Rombo) desactivado por sobretensión.\n- FASE 1: Requiere figura geométrica de 3 lados (▲).\n- Consultar archivo físico y diagnóstico auxiliar."
        ],
        archiveDoc: [
            "EXPEDIENTE DE INVESTIGACIÓN #204\nRegistro de contingencia en archivo físico:",
            "- FASE 3: Asignada a estructura de 4 ángulos rectos (■).\n- FASE 2: Registro ilegible por daño físico.\n(Nota: La lectura de Fase 2 solo reside en Diagnóstico Auxiliar)."
        ],
        machineDiagnostic: [
            "DIAGNÓSTICO AUXILIAR - ENERGÍA RESTAURADA\nLectura de sensores ópticos:",
            "FASE 1: [Sensor desconectado - Consultar Terminal]\nFASE 2: Frecuencia estable detectada -> Forma circular continua (●)\nFASE 3: [Sensor desconectado - Consultar Archivo]"
        ],
        zamoHole: [
            "Ese espacio parece hecho para alguien más pequeño.",
            "Por suerte, conozco a alguien que cabe."
        ],
        protocolError: [
            "PROTOCOLO INCORRECTO\nLa combinación de símbolos no coincide."
        ],
        protocolSuccess: [
            "SECUENCIA CORRECTA\nPROTOCOLO ACEPTADO\nREINICIO DEL SISTEMA REQUERIDO."
        ],
        zamoReactionError: [
            "Esa no es la combinación.",
            "Revisa la terminal, el archivo y la máquina de diagnóstico. ¡Cada uno tiene una pieza!"
        ],
        powerRestored: [
            "SISTEMA RESTAURADO\nACCESO DESBLOQUEADO"
        ],
        zamoFinal: [
            "Mira eso. Dos cerebros y ningún incendio.",
            "Estamos mejorando."
        ]
    },
    level03: {
        intro: [
            "Esto parece bastante mas importante que el interruptor que arreglamos antes.",
            "Y tambien parece bastante mas dispuesto a explotar.",
            "Hay tres modulos en error. Tendremos que restaurarlos uno por uno."
        ],
        moduloALabel: [
            "MODULO A — SISTEMA DE ENERGIA\nESTADO: INESTABLE\nREQUIERE CALIBRACION MANUAL"
        ],
        circuitDiagram: [
            "DIAGRAMA DE CIRCUITOS\nLUZ VERDE = CIRCUITO ACTIVO\nLUZ ROJA = SOBRECARGA",
            "NOTA TECNICA: Activar circuitos 2 y 4 juntos causa sobrecarga.\nSolo los circuitos 1 y 3 son compatibles entre si."
        ],
        circuitOverload: [
            "SOBRECARGA DETECTADA.\nCIRCUITO REINICIADO.",
            "Te dije que habia algo en ese diagrama. Ya sabes que NO hacer."
        ],
        moduloASuccess: [
            "MODULO A — ENERGIA RESTAURADA\nESTADO: ESTABLE",
            "Eso si que suena bien. Mira esa pantalla auxiliar a la derecha: se acaba de encender."
        ],
        sequenceReveal: [
            "PROTOCOLO DE COMUNICACION — CODIGO DE ENLACE",
            "SECUENCIA REQUERIDA:\n[1] DELTA (△)\n[2] CIRCULO (○)\n[3] CUADRADO (□)\n[4] DELTA (△)",
            "Ingresa esta secuencia en las terminales del Modulo B para restablecer la transmision."
        ],
        moduloBLabel: [
            "MODULO B — SISTEMA DE COMUNICACION\nSEÑAL INTERRUMPIDA\nREQUIERE TRANSMISION ENCADENADA",
            "Las terminales transmiten simbolos geometricos.",
            "Debes ingresar el protocolo obtenido al restaurar el Modulo A."
        ],
        moduloBGuide: [
            "PANEL DE TRANSMISION — ASIGNACION DE TERMINALES:\nTerminal 1: △ DELTA\nTerminal 2: ○ CIRCULO\nTerminal 3: □ CUADRADO\nTerminal 4: ◆ ROMBO",
            "Revisa la pantalla auxiliar del Modulo A para conocer la secuencia correcta."
        ],
        moduloBError: [
            "SINCRONIZACION FALLIDA\nSecuencia incorrecta. Terminales reiniciadas.",
            "Creo que nos equivocamos de simbolo o de orden. Revisa la pantalla auxiliar del Modulo A."
        ],
        moduloBSuccess: [
            "COMUNICACION RESTAURADA\nNUEVO ACCESO DESBLOQUEADO",
            "La puerta central hacia el Modulo C se abrio. Y mira lo que dice esa pantalla..."
        ],
        dualOperatorHint: [
            "PROTOCOLO DE CONTENCION\nREQUIERE DOS OPERADORES",
            "Dos operadores... somos exactamente dos. Que casualidad tan sospechosa."
        ],
        moduloCProtocol: [
            "PROTOCOLO DE CONTENCION\nOPERADOR PRINCIPAL: CONTROL-ALPHA\nASISTENTE: CONTROL-BETA",
            "Ambos controles deben activarse dentro del intervalo de sincronizacion."
        ],
        moduloCZamoCall: [
            "Los controles estan demasiado separados para uno solo.",
            "Entendido. Voy al Control-Beta. Tu encargate del Alpha."
        ],
        zamoReady: [
            "Listo en posicion. Di la palabra y lo activo.",
            "Ahora regresa y activa Control-Alpha para iniciar la sincronizacion."
        ],
        contencionOff: [
            "Lo logramos. Sin explosiones ni nada.",
            "La puerta del nucleo esta abierta. Vamos a ver que hay dentro."
        ],
        zamoFinal: [
            "Llegamos hasta aqui.",
            "Ahora solo falta descubrir que fue lo que provoco todo este desastre."
        ]
    },
    level04: {
        intro: [
            "Asi que este es el famoso nucleo.",
            "Y parece que no esta teniendo un buen dia.",
            "ADVERTENCIA: Sistema central inestable. Reinicio manual requerido."
        ],
        systemStatus: [
            "SISTEMA CENTRAL — ESTABILIDAD: 32%\nENERGIA: INESTABLE\nSEÑAL: PENDIENTE\nCONTENCION: ACTIVA\nSINCRONIA: PENDIENTE",
            "Todos los sistemas deben estabilizarse antes de iniciar el reinicio."
        ],
        incidentLog1: [
            "REGISTRO DEL SISTEMA #01:\nFALLO CRITICO TRAS DESPLIEGUE AUTOMATICO.",
            "ERROR DE COMPILACION:\nSyntaxError: Unexpected token '}'\nCausa: Falta ';' en linea 42 del commit.",
            "El sistema intento compilar el codigo roto y colapso en bucle de contencion."
        ],
        incidentLog2: [
            "REGISTRO DEL SISTEMA #02:\nAutor del commit: 'becario_sistemas_04'.",
            "Mensaje del commit: 'fix rapido de fin de semana sin probar y me voy'.",
            "Al faltar el punto y coma, las alarmas interpretaron el fallo como ciberataque."
        ],
        energyClue: [
            "SERVIDOR-ALPHA — CALIBRACION ELECTRICA:\nCircuito principal requiere:\n[A] ACTIVO\n[B] ACTIVO\n[C] INACTIVO\n[D] ACTIVO"
        ],
        energySuccess: [
            "ENERGIA DEL NUCLEO ESTABILIZADA\nFlujo de voltaje normalizado al 100%.",
            "Un problema menos. Ahora la energia no va a estallar."
        ],
        symbolClue: [
            "MONITOR DE FRECUENCIA:\nOrden de calibracion segun lados y vertices:\n▲ (3 lados) → ■ (4 lados) → ◆ (Rombo) → ● (Circulo continuo)"
        ],
        symbolSuccess: [
            "SECUENCIA DE FRECUENCIA ACEPTADA\nSenales de comunicacion sincronizadas.",
            "Bien pensado. El orden geometrico funciono perfecto."
        ],
        symbolError: [
            "SECUENCIA INCORRECTA\nFrecuencia distorsionada. Terminales reiniciadas.",
            "Revisa el monitor de frecuencia para verificar el orden de las figuras."
        ],
        contencionCheckFail: [
            "CONTENCION ACTIVA — DESACTIVACION BLOQUEADA\nRequisitos pendientes:\nEnergia y Secuencia deben estar estabilizadas primero."
        ],
        contencionSuccess: [
            "REQUISITOS CUMPLIDOS\nPROTOCOLO DE CONTENCION DESACTIVADO\nConsolas de reinicio manual desbloqueadas."
        ],
        dualControlReady: [
            "REINICIO MANUAL — SE REQUIEREN DOS OPERADORES\nOperador 1: Consola Alpha (Izquierda)\nOperador 2: Consola Beta (Derecha)",
            "Creo que necesitamos trabajar juntos una ultima vez. Yo voy a Beta."
        ],
        zamoInPosition: [
            "Listo en Consola Beta. Activa la Consola Alpha cuando estes listo."
        ],
        syncSuccess: [
            "SINCRONIZACION DUAL CORRECTA\nAmbos operadores confirmados.",
            "¡Perfecto! El nucleo esta respondiendo."
        ],
        incidentResolution: [
            "REGISTRO FINAL DEL SISTEMA:\nLinea 42 corregida: ';' añadido exitosamente.",
            "Compilacion final completada sin errores de sintaxis.",
            "Laboratorio seguro y operativo al 100%."
        ],
        zamoFinalTalk: [
            "¿Me estas diciendo que todo este desastre fue por un maldito punto y coma?",
            "¡Recorrimos cuatro sectores, casi nos electrocutamos y casi volamos en pedazos por UN PUNTO Y COMA!",
            "A ese practicante le van a revocar la matricula universitaria.",
            "Bueno... al menos sobrevivimos. Y no rompimos nada... demasiado.",
            "Creo que por hoy ya tuvimos suficiente codigo y experimentos. ¡Vamos!"
        ],
        fenixEpilogue: [
            "FENIX: Si claro... fue solo un error de codigo...",
            "FENIX: Creen que fue un simple punto y coma.",
            "FENIX: Disfruta tu victoria, lagarto de pacotilla...",
            "FENIX: La antigua mascota regresara a reclamar el laboratorio."
        ]
    }
};
