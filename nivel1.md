# NIVEL 1 - EL LABORATORIO FUERA DE CONTROL

## 1. OBJETIVO DEL NIVEL

El Nivel 1 debe funcionar como la introducción jugable de **Zamo: Error en el Laboratorio**.

El jugador debe aprender las mecánicas principales sin sentir que está realizando un tutorial separado del juego.

Durante este nivel el jugador debe aprender:

* Movimiento del personaje.
* Exploración.
* Colisiones.
* Interacción con objetos.
* Sistema de diálogo.
* Observación del escenario.
* Uso de pistas.
* Cooperación con Zamo.
* Resolución de un puzzle.
* Activación de mecanismos.
* Apertura de una puerta de salida.
* Transición al siguiente nivel.

El nivel debe ser relativamente corto, pero debe contener suficientes elementos para que el jugador sienta que realmente está resolviendo un problema.

---

# 2. SITUACIÓN NARRATIVA

El jugador comienza dentro del laboratorio después de la falla que se mostró en la pantalla de bienvenida.

Varios sistemas del laboratorio dejaron de funcionar correctamente.

Las puertas automáticas están bloqueadas, algunas máquinas están apagadas y parte de la energía del laboratorio se encuentra desactivada.

Zamo acompaña al jugador y explica que necesitan encontrar una manera de restaurar el sistema para poder continuar.

Zamo no debe actuar únicamente como personaje decorativo.

Durante el nivel debe participar activamente en al menos una parte del puzzle.

---

# 3. ESTRUCTURA GENERAL DEL NIVEL

El nivel debe estar dividido visualmente en varias zonas conectadas:

```text
┌─────────────────────┐
│                     │
│  ZONA A             │
│  ENTRADA             │
│                     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│                     │
│  ZONA B             │
│  LABORATORIO        │
│                     │
│  Máquinas / pistas  │
│                     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│                     │
│  ZONA C             │
│  CONTROL            │
│                     │
│  Puzzle principal   │
│                     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│                     │
│  SALIDA             │
│                     │
└─────────────────────┘
```

No es necesario que sean cuatro habitaciones completamente separadas.

Pueden formar parte de un mismo escenario continuo, utilizando paredes, máquinas, mobiliario y cambios de iluminación para diferenciar las áreas.

---

# 4. INICIO DEL NIVEL

El jugador aparece dentro del laboratorio.

Zamo debe encontrarse cerca del jugador.

Al comenzar, mostrar un pequeño diálogo.

### Diálogo inicial

**Zamo:**

> "Parece que el sistema de seguridad cerró las puertas."

Después:

> "Si queremos salir de aquí, tendremos que volver a poner en marcha la energía."

Después:

> "Busca alguna forma de activar el sistema. Yo echaré un vistazo por aquí."

El jugador queda libre para explorar.

No explicar inmediatamente la solución del puzzle.

---

# 5. MECÁNICA DE MOVIMIENTO

El jugador debe poder desplazarse libremente por el escenario.

Controles:

```text
W / ↑    Moverse hacia arriba
S / ↓    Moverse hacia abajo
A / ←    Moverse hacia la izquierda
D / →    Moverse hacia la derecha
```

Si el diseño final utiliza movimiento exclusivamente horizontal, adaptar los controles al diseño del mapa.

El personaje debe tener:

* Movimiento fluido.
* Animaciones de caminar.
* Colisiones con paredes.
* Colisiones con objetos sólidos.
* Límites del mapa.
* Cámara siguiendo al jugador.

No permitir atravesar objetos del escenario.

---

# 6. MECÁNICA DE INTERACCIÓN

Utilizar la tecla:

```text
E
```

para interactuar.

Cuando el jugador se encuentre cerca de un objeto interactuable, mostrar:

```text
[E] INTERACTUAR
```

El mensaje debe aparecer únicamente cuando el objeto realmente pueda utilizarse.

Ejemplos de objetos interactuables:

* Computadora.
* Panel de control.
* Máquina.
* Interruptor.
* Documento o nota.
* Consola.
* Mecanismo relacionado con el puzzle.

No todos los objetos del escenario deben ser interactuables.

Esto ayuda a que el jugador aprenda que ciertos objetos son importantes.

---

# 7. PRIMERA INTERACCIÓN

Antes del puzzle principal debe existir una interacción sencilla.

El jugador encuentra una computadora que todavía tiene energía.

Al interactuar:

```text
SISTEMA DE LABORATORIO

ENERGÍA PRINCIPAL: DESACTIVADA

SISTEMA DE RESPALDO: ACTIVO

CONTROL MANUAL REQUERIDO.
```

Después puede aparecer una segunda línea:

```text
Se requiere activar el circuito auxiliar.
```

Esta interacción sirve como primera pista del objetivo.

No mostrar directamente cómo resolverlo.

---

# 8. PUZZLE PRINCIPAL

## Nombre

### RESTABLECER LA ENERGÍA

El jugador necesita activar correctamente el sistema eléctrico para desbloquear la puerta de salida.

El puzzle debe requerir observación y relación entre diferentes elementos del escenario.

No debe consistir simplemente en encontrar un objeto y utilizarlo sobre una puerta.

---

# 9. ELEMENTOS DEL PUZZLE

Distribuir por el laboratorio varios elementos:

### A. Panel eléctrico

Contiene varios interruptores.

Por ejemplo:

```text
[ A ] [ B ] [ C ] [ D ]
```

Inicialmente algunos están apagados.

El panel no debe indicar directamente cuál es la combinación correcta.

---

### B. Máquina de diagnóstico

Una máquina cercana muestra un patrón de funcionamiento.

Por ejemplo:

```text
CIRCUITO AUXILIAR

1  -  ACTIVO
2  -  INACTIVO
3  -  ACTIVO
4  -  INACTIVO
```

Esta información funciona como pista.

---

### C. Pantalla secundaria

Otra pantalla muestra una secuencia o patrón relacionado con los interruptores.

Por ejemplo:

```text
SECUENCIA DE ARRANQUE

○ ● ○ ●
```

El jugador debe relacionar esta información con el panel eléctrico.

---

### D. Mecanismo inaccesible

Uno de los elementos necesarios para completar el circuito se encuentra en una zona que el jugador no puede alcanzar directamente.

Aquí entra Zamo.

---

# 10. PARTICIPACIÓN DE ZAMO

Zamo debe ser necesario para completar el puzzle.

El jugador encuentra una pequeña abertura o espacio donde existe un interruptor/mecanismo.

El jugador no puede acceder directamente porque el espacio es demasiado pequeño.

Al acercarse, puede aparecer:

```text
[E] INTERACTUAR
```

Al interactuar, Zamo responde.

### Diálogo

**Zamo:**

> "Ese interruptor está al otro lado."

Después:

> "Creo que yo sí puedo llegar."

El jugador debe indicarle a Zamo que active el mecanismo.

Zamo se desplaza hacia el mecanismo y lo activa.

Esto demuestra que Zamo no es solamente un acompañante visual.

---

# 11. MECÁNICA DE COMPAÑERO

Implementar inicialmente un comportamiento sencillo para Zamo:

* Seguir al jugador.
* Mantener una distancia determinada.
* Evitar atravesar paredes.
* Detenerse cuando el jugador se detiene.
* Poder desplazarse hacia un punto específico cuando una interacción del puzzle lo requiera.

No es necesario implementar todavía una IA compleja.

Para este nivel es suficiente con un sistema de seguimiento controlado.

---

# 12. RESOLUCIÓN DEL PUZZLE

El jugador debe observar las diferentes pistas y experimentar con los interruptores.

La lógica debe seguir aproximadamente este proceso:

```text
OBSERVAR EL LABORATORIO
        ↓
ENCONTRAR LA COMPUTADORA
        ↓
DESCUBRIR QUE LA ENERGÍA ESTÁ DESACTIVADA
        ↓
ENCONTRAR EL PANEL ELÉCTRICO
        ↓
ENCONTRAR LAS PISTAS
        ↓
RELACIONAR LAS PISTAS CON LOS INTERRUPTORES
        ↓
DESCUBRIR QUE FALTA UN MECANISMO
        ↓
UTILIZAR A ZAMO
        ↓
ACTIVAR EL MECANISMO
        ↓
CONFIGURAR CORRECTAMENTE EL PANEL
        ↓
RESTAURAR LA ENERGÍA
        ↓
ABRIR LA PUERTA
```

La solución debe poder deducirse observando el entorno.

El jugador no debe necesitar adivinar una combinación arbitraria.

---

# 13. EXPERIMENTACIÓN

El jugador debe poder probar diferentes configuraciones del panel.

Si introduce una combinación incorrecta:

* No debe reiniciarse todo el nivel.
* No debe producirse un castigo exagerado.
* Puede aparecer un mensaje de error.
* Puede producirse un sonido de error.
* Las luces pueden parpadear.

Ejemplo:

```text
CONFIGURACIÓN INCORRECTA

EL CIRCUITO NO PUEDE INICIARSE.
```

Esto permite experimentar sin frustrar al jugador.

---

# 14. PISTA OPCIONAL DE ZAMO

Si el jugador permanece cerca del puzzle durante cierto tiempo sin avanzar, Zamo puede proporcionar una pista.

La pista no debe revelar directamente la solución.

Ejemplo:

> "Tal vez esa pantalla y los interruptores tengan algo que ver entre sí."

Si el jugador sigue sin avanzar:

> "No creo que esas luces estén ahí solamente para decorar."

La segunda pista debe ser más clara, pero todavía debe permitir que el jugador realice la conexión por sí mismo.

No convertir a Zamo en una máquina de soluciones.

---

# 15. RESTAURACIÓN DE LA ENERGÍA

Cuando el jugador haya configurado correctamente el sistema:

* Las luces del laboratorio cambian.
* Las máquinas vuelven a funcionar.
* Algunas pantallas se encienden.
* Se escucha un sonido de activación.
* La puerta de salida se desbloquea.

Mostrar brevemente:

```text
ENERGÍA RESTAURADA
```

Después Zamo puede decir:

> "¡Funcionó!"

Y después:

> "Ves, no rompimos nada. Todavía."

Esto mantiene su personalidad sarcástica.

---

# 16. PUERTA DE SALIDA

La puerta que inicialmente estaba bloqueada ahora puede abrirse.

Al acercarse:

```text
[E] SALIR
```

Al interactuar:

* Reproducir animación de apertura.
* Reproducir sonido.
* Mostrar una transición.
* Cargar el Nivel 2.

Flujo:

```text
Nivel 1 completado
        ↓
Puerta abierta
        ↓
Jugador interactúa
        ↓
Transición
        ↓
Level02Scene
```

---

# 17. CONDICIÓN DE COMPLETADO

El nivel solamente debe considerarse completado cuando:

```text
energíaRestaurada == true
```

y

```text
puertaSalidaAbierta == true
```

No permitir avanzar simplemente caminando hasta el final del mapa.

---

# 18. CÁMARA

Utilizar una cámara que siga al jugador.

La cámara debe:

* Seguir suavemente al jugador.
* Respetar los límites del mapa.
* No mostrar áreas fuera del escenario.
* Mantener una escala adecuada para los sprites de 32×32 píxeles.

Evitar movimientos bruscos de cámara.

---

# 19. INTERFAZ

La interfaz debe mantenerse mínima.

Durante la exploración puede mostrarse únicamente:

```text
Objetivo:
Restaurar la energía del laboratorio
```

El objetivo puede actualizarse cuando corresponda.

Ejemplo:

```text
Objetivo:
Encontrar una forma de activar el sistema.
```

Después:

```text
Objetivo:
Descubrir cómo configurar el panel.
```

Finalmente:

```text
Objetivo:
Abrir la puerta de salida.
```

No llenar la pantalla con barras, indicadores o elementos innecesarios.

---

# 20. AUDIO

El nivel debe estar preparado para utilizar los sonidos disponibles en la carpeta de audio del proyecto.

Agregar soporte para:

* Música ambiental.
* Sonido de pasos.
* Interacción.
* Botones o interruptores.
* Error de puzzle.
* Activación de mecanismo.
* Restauración de energía.
* Apertura de puerta.
* Diálogo.

Si los archivos de audio todavía no están integrados, utilizar referencias preparadas para incorporarlos posteriormente.

---

# 21. DIFICULTAD

El Nivel 1 debe ser accesible para un jugador que acaba de iniciar el juego.

Sin embargo, no debe sentirse trivial.

El jugador debe tener que:

1. Explorar.
2. Observar.
3. Encontrar información.
4. Relacionar elementos.
5. Experimentar.
6. Comprender el funcionamiento.
7. Utilizar a Zamo.
8. Resolver el problema.

La dificultad debe provenir del razonamiento, no de enemigos difíciles o controles complicados.

---

# 22. DURACIÓN ESTIMADA

La primera versión del nivel debe estar diseñada para aproximadamente:

**5 a 10 minutos de juego.**

Un jugador que ya conozca la solución podría completarlo rápidamente.

Un jugador que no conozca la solución debería necesitar explorar y analizar las pistas.

---

# 23. ELEMENTOS TEMPORALES

Si todavía no existen todos los assets definitivos:

Se permite utilizar:

* Tiles temporales.
* Máquinas simples.
* Rectángulos como paneles.
* Puertas provisionales.
* Indicadores temporales.
* Efectos simples.

Sin embargo, la lógica debe diseñarse de forma que posteriormente sea posible reemplazar estos elementos por arte pixel art definitivo.

No crear dependencias de gameplay basadas en la apariencia de un asset temporal.

---

# 24. CRITERIO DE CALIDAD DEL PUZZLE

El puzzle debe producir en el jugador una sensación similar a:

> "Creo que esto tiene relación con aquello..."

y posteriormente:

> "¡Ah, claro! Era por eso."

La solución debe resultar lógica después de descubrirla.

Evitar puzzles basados en:

* Combinaciones aleatorias.
* Objetos escondidos sin ninguna pista.
* Soluciones que dependen de probar todas las posibilidades.
* Información que nunca aparece en el escenario.
* Acciones arbitrarias.
* "Usar objeto A con objeto B porque sí".

Cada elemento importante del puzzle debe tener una razón dentro del mundo del juego.

---

# 25. PRINCIPIO FUNDAMENTAL

El Nivel 1 debe enseñar las reglas del videojuego sin decirle al jugador constantemente qué hacer.

El jugador debe aprender mediante la interacción.

El flujo ideal es:

```text
EL JUEGO PRESENTA UN PROBLEMA
             ↓
EL JUGADOR EXPLORA
             ↓
ENCUENTRA INFORMACIÓN
             ↓
FORMULA UNA HIPÓTESIS
             ↓
PRUEBA SU IDEA
             ↓
DESCUBRE LA FUNCIÓN DE ZAMO
             ↓
RESUELVE EL PUZZLE
             ↓
EL LABORATORIO REACCIONA
             ↓
SE DESBLOQUEA LA SALIDA
             ↓
COMIENZA EL NIVEL 2
```

El objetivo principal del Nivel 1 es que el jugador termine entendiendo tres cosas:

1. **El laboratorio contiene problemas que deben resolverse mediante observación.**
2. **Los elementos del escenario pueden contener información útil.**
3. **Zamo es un compañero activo que puede hacer cosas que el jugador no puede.**

Si estas tres ideas quedan claras al terminar el nivel, el Nivel 1 habrá cumplido correctamente su función como introducción al juego.
