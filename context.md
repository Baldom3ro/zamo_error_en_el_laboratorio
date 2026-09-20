# Zamo: Error en el Laboratorio

## 1. Descripción general

**Zamo: Error en el Laboratorio** es un videojuego web 2D de aventura y puzzles, desarrollado para ejecutarse directamente en un navegador web.

El juego estará inspirado visualmente en los videojuegos clásicos de estilo pixel art y tendrá una estructura de niveles progresivos. El jugador controlará a un personaje principal que deberá explorar diferentes áreas de un laboratorio, resolver acertijos, interactuar con objetos y avanzar por la historia acompañado por **Zamo**, la mascota oficial de la universidad.

Zamo no será solamente un personaje decorativo. Será un **compañero activo durante la aventura**, participando en diálogos, interacciones y resolución de determinados problemas.

El juego debe sentirse como un videojuego independiente y no como una página web tradicional.

---

# 2. Concepto del juego

El laboratorio de la universidad ha sufrido un error o incidente que provoca que diferentes sistemas del laboratorio comiencen a funcionar incorrectamente.

El jugador deberá explorar las instalaciones y descubrir qué ocurrió mientras avanza por diferentes zonas.

Zamo acompañará al jugador durante la aventura y tendrá una personalidad amigable, pero con un toque sarcástico.

La experiencia debe combinar:

* Exploración
* Resolución de puzzles
* Interacción con objetos
* Diálogos
* Descubrimiento de la historia
* Progresión por niveles
* Participación activa de Zamo

El tono general debe ser ligero y entretenido, con momentos de humor principalmente mediante los diálogos de Zamo.

---

# 3. Personajes

## 3.1 Personaje principal

El jugador controlará al protagonista principal.

Características:

* Personaje humano.
* Estilo pixel art.
* Vista 2D.
* Movimiento mediante teclado.
* Puede explorar el escenario.
* Puede interactuar con objetos.
* Puede recoger elementos.
* Puede resolver puzzles.
* Puede interactuar con Zamo y otros elementos del escenario.

Los detalles visuales específicos del protagonista deben mantenerse separados de la lógica del juego para poder reemplazar fácilmente el sprite posteriormente.

---

## 3.2 Zamo

Zamo es la mascota oficial de la universidad.

### Características visuales

* Cocodrilo antropomórfico.
* Estilo pixel art.
* Resolución base de sprites: aproximadamente 32×32 píxeles.
* Camiseta blanca.
* La camiseta contiene el logotipo **UTGZ**.
* Shorts verdes.
* Elementos multicolor en la zona de la cintura.
* Apariencia amigable.

Zamo normalmente **no lleva teléfono celular**.

### Personalidad

Zamo debe ser:

* Amigable.
* Curioso.
* Ayudante del jugador.
* Un poco sarcástico.
* Carismático.
* Capaz de realizar comentarios humorísticos sobre determinadas situaciones.

El sarcasmo debe mantenerse ligero y apropiado para un videojuego universitario.

### Participación en el gameplay

Zamo debe participar activamente.

No debe ser simplemente un NPC que permanece quieto.

Puede:

* Acompañar al jugador.
* Dar pistas.
* Comentar situaciones.
* Participar en diálogos.
* Activar mecanismos.
* Ayudar a resolver determinados puzzles.
* Interactuar con objetos específicos.
* Desbloquear determinadas situaciones.
* Formar parte de la progresión de la historia.

La presencia de Zamo debe ser importante para la experiencia del juego.

---

# 4. Género

El juego pertenece principalmente a los siguientes géneros:

* Aventura 2D.
* Puzzle.
* Exploración.
* Pixel art.

No se busca crear un RPG complejo ni un juego de combate tradicional.

La prioridad debe estar en:

1. Exploración.
2. Puzzles.
3. Interacción.
4. Narrativa.
5. Participación de Zamo.

---

# 5. Estructura general del juego

El juego estará dividido en cuatro niveles.

```text
Menú principal
      ↓
Introducción
      ↓
Nivel 1
      ↓
Nivel 2
      ↓
Nivel 3
      ↓
Nivel 4
      ↓
Final
```

Cada nivel debe tener una identidad visual y una función narrativa propia.

Los cuatro niveles deben formar parte de una misma aventura y mantener continuidad entre ellos.

---

# 6. Tecnología

El proyecto será desarrollado como un videojuego web.

## Tecnologías principales

### HTML5

Se utilizará como estructura principal de la aplicación web.

Responsabilidades:

* Cargar el juego.
* Contener el Canvas.
* Cargar hojas de estilo.
* Cargar JavaScript.
* Definir la estructura inicial de la aplicación.

---

### CSS3

Se utilizará para elementos externos al Canvas y para la interfaz general.

Responsabilidades:

* Pantallas de menú.
* Botones.
* Elementos de interfaz.
* Pantallas de carga.
* Contenedores.
* Adaptación visual.
* Elementos HTML que no pertenezcan directamente al mundo del juego.

El diseño debe ser coherente con la estética pixel art del videojuego.

---

### JavaScript

Será el lenguaje principal de programación.

Se utilizará para:

* Lógica del juego.
* Movimiento.
* Interacciones.
* Puzzles.
* Diálogos.
* Cambios de nivel.
* Gestión de personajes.
* Eventos.
* Progresión.
* Guardado.
* Audio.

El código debe estar modularizado y dividido por responsabilidades.

No colocar toda la lógica del juego dentro de un único archivo.

---

### Phaser

Se utilizará **Phaser** como framework/motor principal para el desarrollo del videojuego 2D.

Phaser será responsable principalmente de:

* Renderizado.
* Sprites.
* Animaciones.
* Escenas.
* Física.
* Colisiones.
* Entrada de teclado.
* Cámara.
* Audio.
* Gestión de objetos.
* Transiciones entre escenas.

El proyecto debe utilizar Phaser en lugar de implementar manualmente un motor de videojuegos desde cero utilizando únicamente Canvas.

---

### Canvas

Phaser utilizará Canvas/WebGL para representar el juego.

La resolución interna recomendada será:

```text
320 × 180
```

La resolución podrá escalarse para adaptarse a la pantalla del usuario.

El escalado debe conservar la estética pixel art y evitar deformaciones.

---

# 7. Estilo visual

El juego debe utilizar una estética:

**Pixel Art 2D de baja resolución.**

La referencia base para los personajes será aproximadamente:

```text
32 × 32 píxeles
```

Los escenarios, objetos, personajes e interfaz deben mantener una estética visual coherente.

Evitar mezclar estilos gráficos diferentes.

Por ejemplo:

* No utilizar personajes pixel art junto con fotografías.
* No utilizar fondos realistas.
* No utilizar sprites con estilos de pixel art radicalmente diferentes.
* No utilizar elementos 3D salvo que exista una razón específica.

---

# 8. Estructura del proyecto

La estructura inicial recomendada es:

```text
zamo-error-laboratorio/
│
├── index.html
├── README.md
│
├── css/
│   ├── style.css
│   ├── menu.css
│   └── game.css
│
├── js/
│   ├── main.js
│   │
│   ├── config/
│   │   └── gameConfig.js
│   │
│   ├── scenes/
│   │   ├── BootScene.js
│   │   ├── PreloadScene.js
│   │   ├── MenuScene.js
│   │   ├── Level01Scene.js
│   │   ├── Level02Scene.js
│   │   ├── Level03Scene.js
│   │   ├── Level04Scene.js
│   │   └── GameOverScene.js
│   │
│   ├── entities/
│   │   ├── Player.js
│   │   └── Zamo.js
│   │
│   ├── objects/
│   │   ├── Door.js
│   │   ├── Lever.js
│   │   ├── Collectible.js
│   │   ├── PuzzleObject.js
│   │   └── Hazard.js
│   │
│   ├── systems/
│   │   ├── DialogueSystem.js
│   │   ├── PuzzleSystem.js
│   │   ├── InteractionSystem.js
│   │   ├── SaveSystem.js
│   │   └── AudioSystem.js
│   │
│   └── data/
│       ├── levels.js
│       ├── dialogues.js
│       └── items.js
│
├── assets/
│   ├── characters/
│   │   ├── player/
│   │   └── zamo/
│   │
│   ├── environments/
│   │   ├── laboratory/
│   │   ├── corridors/
│   │   ├── storage/
│   │   └── final-area/
│   │
│   ├── objects/
│   │   ├── doors/
│   │   ├── switches/
│   │   ├── machines/
│   │   └── collectibles/
│   │
│   ├── tilesets/
│   │
│   ├── maps/
│   │   ├── level01.json
│   │   ├── level02.json
│   │   ├── level03.json
│   │   └── level04.json
│   │
│   ├── audio/
│   │   ├── music/
│   │   └── sfx/
│   │
│   └── ui/
│       ├── buttons/
│       ├── dialogue/
│       └── icons/
│
└── lib/
    └── phaser.min.js
```

---

# 9. Responsabilidad de cada directorio

## `scenes/`

Contiene las diferentes escenas del videojuego.

Ejemplo:

```text
BootScene
    ↓
PreloadScene
    ↓
MenuScene
    ↓
Level01Scene
    ↓
Level02Scene
    ↓
Level03Scene
    ↓
Level04Scene
    ↓
Final
```

Cada nivel debe tener su propia escena.

---

## `entities/`

Contiene los personajes principales.

```text
Player.js
Zamo.js
```

La lógica específica de cada personaje debe permanecer dentro de su respectiva clase.

---

## `objects/`

Contiene objetos interactivos reutilizables.

Ejemplos:

* Puertas.
* Palancas.
* Botones.
* Objetos recolectables.
* Máquinas.
* Obstáculos.
* Elementos de puzzles.

---

## `systems/`

Contiene sistemas generales reutilizables.

### DialogueSystem

Gestiona:

* Texto.
* Retratos.
* Diálogos.
* Avance del diálogo.
* Interacciones entre personajes.

### PuzzleSystem

Gestiona la lógica general de los puzzles.

### InteractionSystem

Determina qué objeto puede utilizar el jugador y qué ocurre al interactuar.

La tecla principal de interacción será:

```text
E
```

### SaveSystem

Puede utilizar `localStorage` para guardar información básica de progreso.

### AudioSystem

Gestiona:

* Música.
* Efectos.
* Volumen.
* Cambios de música entre escenas.

---

# 10. Mapas

Los escenarios deben poder representarse mediante mapas.

Se recomienda utilizar **Tiled** para crear los niveles y exportarlos a JSON.

Ejemplo:

```text
assets/maps/
├── level01.json
├── level02.json
├── level03.json
└── level04.json
```

El sistema debe estar preparado para cargar estos mapas desde Phaser.

---

# 11. Controles

Los controles iniciales serán:

| Tecla | Acción                                                     |
| ----- | ---------------------------------------------------------- |
| W     | Movimiento hacia arriba / salto según el diseño            |
| A     | Movimiento izquierda                                       |
| S     | Movimiento hacia abajo / acción secundaria según el diseño |
| D     | Movimiento derecha                                         |
| E     | Interactuar                                                |
| ESC   | Pausar                                                     |
| ENTER | Continuar diálogos / confirmar                             |

Los controles pueden modificarse posteriormente si el diseño final de los niveles lo requiere.

---

# 12. Interacción

El jugador debe poder detectar objetos interactivos cercanos.

Por ejemplo:

```text
        Jugador
           ↓
        [Objeto]

     E - Interactuar
```

Al acercarse a un objeto, puede aparecer una indicación:

```text
[E] Interactuar
```

No todos los objetos del escenario deben ser interactivos.

---

# 13. Sistema de diálogos

Los diálogos serán una parte importante del juego.

La interfaz debe permitir mostrar:

```text
┌────────────────────────────────────────────┐
│ ZAMO                                       │
│                                            │
│ Parece que alguien dejó esto encendido.   │
│ ¿Quién deja un laboratorio así?            │
│                                            │
│                         [E] Continuar      │
└────────────────────────────────────────────┘
```

Los diálogos deben poder almacenarse separadamente de la lógica del juego.

Por ejemplo:

```text
data/dialogues.js
```

Esto permitirá modificar el texto sin tener que modificar las escenas.

---

# 14. Puzzles

Los puzzles deben ser sencillos pero interesantes.

No se busca crear acertijos extremadamente complejos.

Ejemplos:

* Activar interruptores en determinado orden.
* Encontrar una llave.
* Utilizar un objeto en el lugar correcto.
* Activar una máquina.
* Resolver una combinación.
* Coordinar una acción del jugador con Zamo.
* Encontrar elementos escondidos.
* Abrir una puerta mediante diferentes mecanismos.

Algunos puzzles deben requerir la participación directa de Zamo.

---

# 15. Rol de Zamo en los puzzles

Zamo debe tener funciones jugables.

Ejemplos:

```text
Jugador ── interactúa ──> mecanismo
                           ↑
                           │
                         Zamo
```

O:

```text
Jugador → encuentra objeto
              ↓
           Zamo ayuda
              ↓
        Puzzle resuelto
```

La participación de Zamo debe variar entre niveles para evitar que su función sea repetitiva.

---

# 16. Progresión

El juego debe utilizar una progresión sencilla:

```text
Nivel 1
  ↓
Introducción al mundo
  ↓
Mecánicas básicas
  ↓
Nivel 2
  ↓
Nuevos puzzles
  ↓
Nivel 3
  ↓
Mayor complejidad
  ↓
Nivel 4
  ↓
Resolución del conflicto
  ↓
Final
```

La dificultad debe aumentar progresivamente.

---

# 17. Reglas de desarrollo

## Modularidad

Evitar archivos gigantes.

Cada archivo debe tener una responsabilidad clara.

No colocar:

* diálogos,
* movimiento,
* puzzles,
* audio,
* enemigos,
* menús

dentro de una sola clase.

---

## Reutilización

Los componentes comunes deben ser reutilizables.

Por ejemplo:

```text
Door.js
```

debe poder utilizarse en varios niveles sin duplicar toda su implementación.

---

## Separación de datos y lógica

Cuando sea posible, separar:

```text
Datos
↓
data/

Lógica
↓
systems/

Presentación
↓
scenes/
```

Los diálogos, configuración de niveles e información de objetos no deberían estar completamente incrustados dentro de las escenas.

---

# 18. Desarrollo incremental

No desarrollar todo el videojuego de una sola vez.

El desarrollo debe seguir este orden aproximado:

## Fase 1 - Base técnica

Crear:

* Proyecto.
* `index.html`.
* Phaser.
* `main.js`.
* Configuración.
* Canvas.
* Primera escena.

Objetivo:

**Conseguir que el juego se ejecute correctamente en el navegador.**

---

## Fase 2 - Jugador

Implementar:

* Player.
* Sprite temporal.
* Movimiento.
* Colisiones.
* Cámara.

Objetivo:

**Poder controlar al personaje dentro de un escenario.**

---

## Fase 3 - Zamo

Implementar:

* Sprite de Zamo.
* Animaciones.
* Aparición.
* Seguimiento o comportamiento de compañero.
* Interacción.
* Primer diálogo.

Objetivo:

**Convertir a Zamo en un personaje funcional.**

---

## Fase 4 - Nivel 1

Construir completamente el primer nivel.

Debe incluir:

* Escenario.
* Jugador.
* Zamo.
* Objetos.
* Interacciones.
* Primer puzzle.
* Diálogos.
* Condición de finalización.

No avanzar al desarrollo completo de los demás niveles hasta tener un prototipo funcional del Nivel 1.

---

## Fase 5 - Sistemas

Implementar:

* Diálogos.
* Puzzles.
* Interacciones.
* Audio.
* Guardado.
* Transiciones.

---

## Fase 6 - Niveles restantes

Crear:

```text
Level02
Level03
Level04
```

Reutilizando los sistemas creados anteriormente.

No duplicar código innecesariamente.

---

## Fase 7 - Pulido

Agregar:

* Música.
* Efectos.
* Animaciones.
* Transiciones.
* Pantalla de pausa.
* Pantalla de victoria.
* Pantalla de derrota si es necesaria.
* Ajustes visuales.
* Corrección de errores.

---

# 19. Prioridad del proyecto

El objetivo principal no es crear un videojuego enorme.

El objetivo es crear un **videojuego 2D pequeño, funcional, coherente y presentable**.

Prioridades:

1. Que el juego funcione.
2. Que el jugador pueda jugar los cuatro niveles.
3. Que Zamo tenga participación real.
4. Que los puzzles funcionen.
5. Que exista una progresión narrativa.
6. Que el pixel art sea coherente.
7. Que la interfaz sea clara.
8. Que el juego sea estable.
9. Agregar efectos y detalles únicamente después de completar la funcionalidad principal.

No sacrificar funcionalidad por efectos visuales innecesarios.

---

# 20. Criterio de implementación para el agente

Antes de implementar una funcionalidad importante:

1. Revisar la estructura existente.
2. Determinar dónde debe vivir la nueva funcionalidad.
3. Evitar duplicar sistemas existentes.
4. Mantener separación de responsabilidades.
5. Mantener compatibilidad con Phaser.
6. Probar la funcionalidad antes de continuar.
7. No modificar archivos no relacionados sin necesidad.
8. No introducir dependencias adicionales sin justificar su necesidad.
9. Mantener nombres de archivos y clases consistentes.
10. Documentar decisiones técnicas importantes.

Si una decisión de implementación no está definida en esta especificación, elegir la solución más sencilla y mantenible que mantenga el concepto del juego.

---

# 21. Resultado esperado

El resultado final debe ser un videojuego web que pueda ejecutarse desde un navegador.

El jugador debe poder:

```text
Abrir el juego
    ↓
Ver el menú
    ↓
Comenzar la aventura
    ↓
Controlar al protagonista
    ↓
Explorar
    ↓
Encontrar a Zamo
    ↓
Interactuar con Zamo
    ↓
Resolver puzzles
    ↓
Avanzar por cuatro niveles
    ↓
Llegar al final
```

El producto final debe sentirse como un **videojuego 2D de pixel art**, no como una página web con elementos interactivos.

---

# 22. Principio fundamental

La implementación debe priorizar la experiencia del jugador.

**Zamo debe sentirse como un compañero real dentro del juego, no como un personaje añadido únicamente para cumplir un requisito.**

El juego debe ser sencillo de entender, divertido de jugar y suficientemente completo para funcionar como proyecto universitario presentable.

La arquitectura debe permitir ampliar posteriormente el proyecto sin tener que reconstruirlo desde cero.
