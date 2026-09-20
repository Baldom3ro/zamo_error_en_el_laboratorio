El Nivel 2 debería subir la dificultad sin convertirse todavía en una prueba de ingeniería inversa de la NASA. Aquí el jugador ya conoce las reglas básicas, así que podemos empezar a exigirle que **relacione información de diferentes partes del escenario** y que use a Zamo de forma más integrada.

````md
# NIVEL 2 - LA ZONA DE INVESTIGACIÓN

## 1. OBJETIVO DEL NIVEL

El Nivel 2 debe aumentar progresivamente la dificultad respecto al Nivel 1.

El jugador ya conoce:

- Movimiento.
- Exploración.
- Interacción con objetos.
- Sistema de diálogo.
- Uso de pistas.
- Participación de Zamo.
- Resolución básica de puzzles.

Por lo tanto, este nivel debe introducir una nueva idea:

> Las pistas de un puzzle pueden encontrarse en diferentes partes del escenario y deben relacionarse entre sí.

El jugador deberá explorar una nueva zona del laboratorio, encontrar información aparentemente independiente y descubrir cómo utilizarla para solucionar un problema mayor.

El nivel debe enseñar principalmente:

- Exploración más amplia.
- Relación entre diferentes pistas.
- Uso combinado de objetos.
- Activación de mecanismos en un orden determinado.
- Mayor participación de Zamo.
- Experimentación.
- Resolución de un puzzle de varias etapas.

---

# 2. SITUACIÓN NARRATIVA

Después de restaurar parcialmente la energía del laboratorio en el Nivel 1, el jugador y Zamo avanzan hacia una zona más profunda del complejo.

Esta zona corresponde al área de investigación del laboratorio.

A diferencia de la zona anterior, aquí existen equipos más avanzados y sistemas que parecen haber sido afectados directamente por el error.

Al entrar, una puerta automática se cierra detrás del jugador.

Zamo observa el lugar y comenta:

> "Supongo que el laboratorio decidió que ya éramos parte del experimento."

El jugador descubre que la puerta de salida está bloqueada y que el sistema de seguridad necesita ser reiniciado.

Sin embargo, el reinicio requiere información que se encuentra distribuida por diferentes partes de la zona.

---

# 3. ESTRUCTURA DEL NIVEL

El nivel debe estar compuesto por varias áreas conectadas.

Una posible distribución:

```text
┌───────────────────────┐
│                       │
│  ZONA A               │
│  ENTRADA              │
│                       │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│                       │
│  ZONA B               │
│  INVESTIGACIÓN        │
│                       │
│  Computadoras         │
│  Documentos           │
│  Máquinas              │
│                       │
└───────┬─────────┬─────┘
        │         │
        ▼         ▼
┌────────────┐ ┌────────────┐
│ ZONA C     │ │ ZONA D     │
│ ARCHIVO    │ │ CONTROL    │
│            │ │            │
│ Pistas     │ │ Mecanismo  │
└─────┬──────┘ └─────┬──────┘
      │              │
      └───────┬──────┘
              ▼
       ┌───────────────┐
       │               │
       │ SALIDA        │
       │               │
       └───────────────┘
````

Las zonas pueden formar parte de un mismo mapa continuo.

No es necesario cargar una escena diferente para cada zona.

---

# 4. INICIO DEL NIVEL

El jugador comienza en la entrada de la zona de investigación.

Zamo aparece cerca del jugador.

Al avanzar unos pasos, la puerta detrás del jugador se cierra automáticamente.

Mostrar un pequeño diálogo:

**Zamo:**

> "Eso sonó como una puerta cerrándose."

Pausa breve.

> "Y antes de que preguntes... sí, creo que estamos encerrados."

El sistema muestra:

```text
OBJETIVO

Encontrar una forma de desbloquear
la puerta de seguridad.
```

El jugador queda libre para explorar.

---

# 5. NUEVA MECÁNICA: PISTAS DISTRIBUIDAS

El principal cambio respecto al Nivel 1 es que una única pista ya no debe ser suficiente para resolver el puzzle.

El jugador encontrará información en diferentes lugares.

Por ejemplo:

* Una computadora contiene una secuencia.
* Un documento explica qué significa la secuencia.
* Una máquina muestra un símbolo.
* Un panel contiene varios símbolos.
* Zamo puede acceder a una zona donde se encuentra información adicional.

Ninguna de estas piezas debe revelar por sí sola la solución.

El jugador debe combinarlas.

---

# 6. PUZZLE PRINCIPAL

## Nombre

### EL PROTOCOLO DE SEGURIDAD

La puerta de salida está protegida por un sistema de seguridad.

Para desbloquearla, el jugador debe introducir correctamente una secuencia en un panel de control.

El panel presenta varios símbolos.

Por ejemplo:

```text
┌─────────────────────┐
│  PANEL DE SEGURIDAD │
│                     │
│   ▲   ●   ■   ◆     │
│                     │
│   [ ? ] [ ? ] [ ? ] │
│                     │
└─────────────────────┘
```

La solución no debe encontrarse directamente en el panel.

---

# 7. PRIMERA PISTA

En una computadora de la zona de investigación aparece:

```text
PROTOCOLO DE SEGURIDAD

El sistema utiliza tres símbolos
para iniciar el protocolo.

Consultar registro de investigación.
```

Esto indica al jugador que debe buscar otra fuente de información.

---

# 8. SEGUNDA PISTA

En la zona de archivo existe un documento (cuadro amarillo del medio).

El documento indica información parcial:

```text
EXPEDIENTE DE INVESTIGACIÓN #204

- FASE 3: Asignada a estructura de 4 ángulos rectos (■).
- FASE 2: Registro ilegible por daño físico.
(Nota: La lectura de Fase 2 solo reside en Diagnóstico Auxiliar).
```

No proporciona la solución completa. Solo aporta la Fase 3 y dirige al jugador hacia la máquina de diagnóstico.

---

# 9. TERCERA PISTA

En otra parte del laboratorio existe una máquina de diagnóstico (requiere que Zamo active la energía por el conducto).

La máquina muestra:

```text
DIAGNÓSTICO AUXILIAR - ENERGÍA RESTAURADA

FASE 1: [Sensor desconectado - Consultar Terminal]
FASE 2: Frecuencia estable detectada -> Forma circular continua (●)
FASE 3: [Sensor desconectado - Consultar Archivo]
```

El jugador debe relacionar las 3 fuentes para armar la secuencia final: ▲ (Terminal) + ● (Diagnóstico) + ■ (Archivo).

La intención es que el jugador relacione:

```text
Documento
     +
Máquina
     +
Panel
     ↓
Secuencia correcta
```

---

# 10. PARTICIPACIÓN DE ZAMO

Zamo debe volver a participar activamente.

En una parte del laboratorio existe una pequeña sala o conducto donde el jugador no puede entrar.

Dentro se encuentra un panel secundario.

Zamo puede acceder a ese espacio.

Cuando el jugador se acerca:

```text
[E] INTERACTUAR
```

Zamo puede responder:

> "Ese espacio parece hecho para alguien más pequeño."

Después:

> "Por suerte, conozco a alguien que cabe."

Zamo entra en el espacio y encuentra el panel.

---

# 11. MECÁNICA DE ZAMO

En este nivel, Zamo no debe simplemente activar un interruptor.

Debe realizar una acción ligeramente más compleja.

Por ejemplo:

1. El jugador encuentra el panel principal.
2. Descubre que falta información.
3. Zamo entra en una zona inaccesible.
4. Zamo activa un pequeño terminal.
5. El terminal muestra información en una pantalla del laboratorio.
6. El jugador utiliza esa información para continuar el puzzle.

Esto introduce una mecánica importante:

> El jugador y Zamo pueden obtener información desde lugares diferentes.

---

# 12. SISTEMA DE PISTAS

Las pistas deben estar conectadas entre sí.

El jugador debería poder construir mentalmente algo similar a:

```text
La computadora dice que existe un protocolo.
             ↓
El documento explica parte del protocolo.
             ↓
La máquina muestra información incompleta.
             ↓
Zamo activa el terminal secundario.
             ↓
Aparece la información faltante.
             ↓
El jugador puede determinar la secuencia.
```

La solución debe ser deducible.

No debe depender de probar todas las combinaciones posibles.

---

# 13. INTERACCIÓN CON EL PANEL

El panel de seguridad debe permitir al jugador introducir la secuencia.

Ejemplo:

```text
SECUENCIA:

[ ▲ ] [ ● ] [ ■ ]

        [ CONFIRMAR ]
```

El jugador puede seleccionar diferentes símbolos.

Controles posibles:

```text
A / D     Cambiar símbolo
ENTER     Confirmar
E         Interactuar
```

Adaptar los controles al sistema de interacción general del juego.

---

# 14. RESPUESTA INCORRECTA

Si el jugador introduce una secuencia incorrecta:

```text
PROTOCOLO INCORRECTO

La secuencia no coincide.
```

No reiniciar el nivel.

El jugador debe poder volver a intentarlo.

Zamo puede realizar un comentario ocasional:

> "Bueno... técnicamente hicimos algo."

Después:

> "Aunque no fue exactamente lo que queríamos."

Evitar que Zamo dé directamente la solución.

---

# 15. PISTAS OPCIONALES

Si el jugador permanece demasiado tiempo sin avanzar, Zamo puede proporcionar pistas progresivas.

### Primera pista

> "Creo que esa computadora estaba hablando de un protocolo."

### Segunda pista

> "Tal vez el documento del archivo explique qué significan esos símbolos."

### Tercera pista

> "Tenemos información de tres lugares diferentes. Probablemente no estén ahí por casualidad."

Las pistas deben orientar al jugador sin resolver automáticamente el puzzle.

---

# 16. SEGUNDO OBSTÁCULO

Una vez descubierta la secuencia, el jugador puede activar el panel.

Sin embargo, el sistema de seguridad no desbloquea inmediatamente la puerta.

Mostrar:

```text
SECUENCIA CORRECTA

PROTOCOLO ACEPTADO

REINICIO DEL SISTEMA REQUERIDO.
```

Esto introduce una segunda etapa.

El jugador debe encontrar un botón o mecanismo de reinicio.

---

# 17. SEGUNDA ETAPA DEL PUZZLE

El botón de reinicio se encuentra en una zona elevada o inaccesible.

El jugador no puede alcanzarlo directamente.

Zamo puede ayudar nuevamente.

El jugador debe posicionarse cerca del mecanismo y utilizar una interacción para pedirle a Zamo que active el reinicio.

Zamo se desplaza hasta el mecanismo y lo activa.

Esto conecta las dos etapas del nivel:

```text
Resolver la secuencia
        ↓
Activar el panel
        ↓
Descubrir que se necesita reinicio
        ↓
Utilizar a Zamo
        ↓
Reiniciar el sistema
        ↓
Desbloquear la puerta
```

---

# 18. RESTAURACIÓN DEL SISTEMA

Después de activar el reinicio:

* Las luces del laboratorio cambian.
* Las pantallas se actualizan.
* Las máquinas vuelven a funcionar.
* La puerta de seguridad se desbloquea.
* Se reproduce un sonido de sistema.
* Puede mostrarse una pequeña animación de los equipos reiniciándose.

Mostrar:

```text
SISTEMA RESTAURADO

ACCESO DESBLOQUEADO
```

---

# 19. DIÁLOGO DE ZAMO

Después de completar el puzzle:

**Zamo:**

> "Mira eso. Dos cerebros y ningún incendio."

Pausa.

> "Estamos mejorando."

Este diálogo debe reforzar la relación entre el jugador y Zamo.

---

# 20. OBJETIVOS DINÁMICOS

El objetivo mostrado en pantalla debe actualizarse.

### Inicio

```text
OBJETIVO

Encontrar una forma de desbloquear
la puerta de seguridad.
```

### Después de encontrar el sistema

```text
OBJETIVO

Descubrir el protocolo de seguridad.
```

### Después de encontrar las pistas

```text
OBJETIVO

Determinar la secuencia correcta.
```

### Después de introducir la secuencia

```text
OBJETIVO

Reiniciar el sistema de seguridad.
```

### Final

```text
OBJETIVO

Dirigirse a la salida.
```

---

# 21. DISEÑO DEL MAPA

El escenario debe sentirse más grande que el Nivel 1.

Debe contener:

* Laboratorio de investigación.
* Área de computadoras.
* Archivo.
* Máquinas experimentales.
* Zona de control.
* Conductos o espacios pequeños.
* Puerta de seguridad.
* Elementos decorativos.

El jugador debe poder explorar sin sentirse perdido.

Utilizar elementos visuales para orientar:

* Diferentes colores de iluminación.
* Señalización.
* Formas arquitectónicas.
* Puertas.
* Pantallas.
* Mobiliario.

---

# 22. MECÁNICA DE EXPLORACIÓN

No colocar todas las pistas juntas.

Distribuirlas por el escenario.

El jugador debe tener razones para explorar.

Sin embargo, evitar esconder las pistas de manera injusta.

Las pistas importantes deben destacar visualmente mediante:

* Iluminación.
* Animaciones.
* Sonidos.
* Ubicación estratégica.
* Interacción contextual.

---

# 23. AUDIO

El nivel debe utilizar:

* Música ambiental de laboratorio.
* Sonidos de máquinas.
* Sonidos de computadoras.
* Sonidos de interacción.
* Sonidos de error.
* Sonidos de confirmación.
* Sonido de reinicio.
* Sonido de puerta automática.
* Sonidos asociados a Zamo.

Los sonidos deben ayudar al jugador a comprender que ciertas acciones tuvieron consecuencias.

---

# 24. CÁMARA

Mantener la cámara siguiendo al jugador.

La cámara debe:

* Seguir suavemente al jugador.
* Respetar los límites del mapa.
* No mostrar zonas fuera del escenario.
* Mantener una escala consistente con el pixel art.
* Permitir visualizar suficiente espacio para anticipar elementos importantes.

---

# 25. INTERFAZ

Mantener una interfaz mínima.

Mostrar únicamente:

```text
OBJETIVO:
[objetivo actual]
```

y los mensajes contextuales:

```text
[E] INTERACTUAR
```

No agregar demasiados elementos en pantalla.

El escenario debe seguir siendo el protagonista.

---

# 26. DIFICULTAD

El Nivel 2 debe ser más difícil que el Nivel 1, pero todavía debe ser accesible.

La diferencia principal debe estar en el razonamiento.

Nivel 1:

```text
Encontrar pistas
        ↓
Relacionarlas
        ↓
Resolver puzzle
```

Nivel 2:

```text
Explorar
        ↓
Encontrar diferentes fuentes de información
        ↓
Determinar qué información es relevante
        ↓
Relacionar pistas
        ↓
Utilizar a Zamo
        ↓
Resolver primera etapa
        ↓
Descubrir segunda etapa
        ↓
Utilizar nuevamente a Zamo
        ↓
Completar el nivel
```

---

# 27. DURACIÓN ESTIMADA

La duración objetivo del Nivel 2 debe ser aproximadamente:

**8 a 12 minutos.**

Un jugador que ya conozca la solución podrá completarlo rápidamente.

Un jugador que no conozca la solución deberá explorar el escenario y analizar las pistas.

---

# 28. CONDICIÓN DE COMPLETADO

El nivel se considera completado cuando:

```text
protocoloResuelto == true
```

y:

```text
sistemaReiniciado == true
```

y:

```text
puertaSalidaAbierta == true
```

Solamente después de cumplir estas condiciones se debe permitir pasar al Nivel 3.

---

# 29. PROGRESIÓN DEL JUGADOR

Al terminar el Nivel 2, el jugador debe haber aprendido una nueva regla del mundo:

> La solución de un problema puede requerir información obtenida desde diferentes lugares.

También debe haber comprendido que:

> Zamo puede acceder a lugares y mecanismos que el jugador no puede utilizar directamente.

Esto prepara al jugador para los puzzles más complejos de los niveles posteriores.

---

# 30. CRITERIO DE CALIDAD DEL PUZZLE

El puzzle debe producir una sensación de descubrimiento.

El jugador debe poder pensar:

```text
"Esta información parece importante."

"Esto que vi antes tiene relación con esto."

"Zamo puede llegar ahí."

"Entonces probablemente pueda activar ese mecanismo."

"Ahora entiendo cómo funciona."
```

La solución debe parecer lógica después de descubrirla.

Evitar:

* Combinaciones aleatorias.
* Soluciones arbitrarias.
* Objetos sin función.
* Pistas que no tienen relación con el puzzle.
* Necesidad de probar todas las combinaciones.
* Objetos escondidos sin ningún indicio.
* Soluciones que solamente podrían descubrirse mediante ensayo y error.

---

# 31. PRINCIPIO DE DISEÑO

El Nivel 2 debe ampliar las reglas introducidas en el Nivel 1.

No introducir demasiadas mecánicas completamente nuevas al mismo tiempo.

La progresión debe ser:

```text
NIVEL 1
Exploración + interacción + puzzle sencillo + Zamo
             ↓
NIVEL 2
Exploración + múltiples pistas + puzzle de varias etapas + Zamo
             ↓
NIVEL 3
Puzzles más complejos + combinación de mecánicas
             ↓
NIVEL 4
Combinación de todas las mecánicas + resolución final
```

El Nivel 2 debe sentirse como una evolución natural del primer nivel, no como un juego completamente diferente.

```
```
