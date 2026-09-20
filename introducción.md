# PANTALLA DE BIENVENIDA
## Zamo: Error en el Laboratorio

### 1. OBJETIVO

La pantalla de bienvenida debe funcionar como una breve introducción narrativa al juego.

Su objetivo es presentar rápidamente:

- El título del juego.
- El problema principal de la historia.
- La presencia de Zamo.
- El tono de aventura, exploración y misterio.
- La acción necesaria para comenzar el juego.

La introducción debe ser breve, aproximadamente de 10 a 15 segundos, y no debe explicar toda la historia ni revelar los puzzles del juego.

La intención es despertar curiosidad y llevar rápidamente al jugador hacia el Nivel 1.

---

# 2. DISEÑO VISUAL

La pantalla debe utilizar una estética de videojuego 2D pixel art coherente con el resto del proyecto.

La resolución interna del juego debe mantenerse en:

- 320 × 180 píxeles.

El contenido debe escalarse posteriormente a la resolución disponible de la pantalla sin perder la apariencia pixel art.

## Fondo

El fondo debe representar una sección del laboratorio donde aparentemente ocurrió algún problema.

Debe incluir elementos como:

- Luces de emergencia.
- Pantallas mostrando errores.
- Máquinas apagadas o funcionando incorrectamente.
- Cables y componentes tecnológicos.
- Pequeñas partículas.
- Humo o chispas de forma sutil.
- Iluminación ambiental.
- Elementos que sugieran que el laboratorio sufrió una anomalía.

No es necesario que el escenario sea demasiado detallado en la primera implementación.

Si todavía no existen los assets definitivos del laboratorio, se pueden utilizar elementos temporales de pixel art para construir la composición.

Los assets temporales deben poder reemplazarse posteriormente sin modificar la lógica de programación.

---

# 3. TÍTULO

En la parte superior o central de la pantalla debe aparecer el título:

ZAMO

ERROR EN EL LABORATORIO

El nombre debe tener mayor presencia visual que los demás elementos.

El título debe utilizar una tipografía que combine con la estética pixel art del juego.

Evitar utilizar tipografías modernas o corporativas que hagan que la pantalla parezca una página web convencional.

---

# 4. FRASE DE INTRODUCCIÓN

Debajo del título puede aparecer una frase breve:

> "Algo salió mal en el laboratorio... y ahora tendremos que descubrir qué ocurrió."

Esta frase debe funcionar como introducción general al conflicto del juego.

No debe revelar:

- La solución de los puzzles.
- La causa exacta del problema.
- Los objetivos posteriores.
- Los acontecimientos de niveles posteriores.

---

# 5. ZAMO

Zamo debe aparecer dentro de la composición visual de la pantalla.

Debe utilizarse el sprite sheet de Zamo proporcionado para el proyecto.

No reemplazar el diseño actual de Zamo.

Características que deben mantenerse:

- Cocodrilo antropomórfico.
- Camiseta blanca con el logotipo UTGZ.
- Short verde.
- Elementos multicolor en la zona de la cintura.
- Personalidad amigable.
- Personalidad ligeramente sarcástica.

Zamo no debe aparecer únicamente como decoración.

Debe funcionar como el primer personaje que introduce al jugador al mundo del juego.

---

# 6. INTRODUCCIÓN NARRATIVA

La introducción puede comenzar mostrando brevemente una pantalla del sistema del laboratorio.

## Mensaje del sistema

Mostrar:

"SISTEMA DEL LABORATORIO"

Después:

"ERROR CRÍTICO"

Y posteriormente:

"Se detectaron anomalías en los sistemas."

Estos mensajes deben aparecer mediante una transición sencilla, por ejemplo:

1. Pantalla oscura.
2. Aparece el mensaje del sistema.
3. El mensaje presenta un pequeño efecto de interferencia.
4. La pantalla cambia hacia la escena donde aparece Zamo.

No utilizar efectos excesivos.

---

# 7. DIÁLOGO DE ZAMO

Después de mostrar el error del laboratorio, Zamo debe aparecer y comenzar el diálogo.

## Primer diálogo

Zamo:

> "Bueno... esto definitivamente no estaba en el programa."

Después:

> "Algo salió mal en el laboratorio y varios sistemas dejaron de funcionar."

Finalmente:

> "Tendremos que investigar qué pasó. Y, por favor, intenta no romper nada más."

El tono debe ser amigable y ligeramente sarcástico.

Zamo no debe comportarse como un narrador serio que explica toda la historia.

Su personalidad debe comenzar a establecerse desde esta primera interacción.

---

# 8. BOTÓN PARA COMENZAR

Después de finalizar el diálogo debe aparecer:

[ ENTER ] COMENZAR

El indicador debe tener una animación sutil para comunicar que el jugador puede interactuar.

Por ejemplo:

- Aparecer y desaparecer ligeramente.
- Cambiar suavemente de intensidad.
- Realizar un pequeño efecto de parpadeo.

No utilizar animaciones demasiado llamativas.

---

# 9. FLUJO DE LA PANTALLA

El flujo esperado debe ser:

```text
PANTALLA OSCURA
       ↓
SISTEMA DEL LABORATORIO
       ↓
ERROR CRÍTICO
       ↓
ANOMALÍAS DETECTADAS
       ↓
TRANSICIÓN
       ↓
APARECE ZAMO
       ↓
DIÁLOGO DE ZAMO
       ↓
[ ENTER ] COMENZAR
       ↓
NIVEL 1

# 10. COMPORTAMIENTO

La pantalla debe funcionar como una escena independiente.

El jugador no debe poder comenzar a moverse mientras se encuentra en la pantalla de bienvenida.

Controles

Durante el diálogo:

ENTER: avanzar al siguiente diálogo.
ENTER después del último diálogo: comenzar el juego.
ESC: opcionalmente permitir saltar la introducción.

Después de presionar ENTER en "COMENZAR":

Welcome/Menu Scene
        ↓
Level01Scene

El juego debe iniciar directamente en el Nivel 1.

11. SISTEMA DE DIÁLOGO

La introducción debe utilizar el mismo sistema de diálogo que posteriormente se utilizará durante el juego.

No crear un sistema separado únicamente para la pantalla de bienvenida.

El sistema debe permitir posteriormente:

Mostrar el nombre del personaje.
Mostrar el texto.
Avanzar mediante ENTER.
Controlar diferentes líneas de diálogo.
Mostrar diferentes personajes.
Reutilizar el sistema en los cuatro niveles.

La implementación de la bienvenida debe servir como primera prueba del sistema de diálogo.

12. TRANSICIONES

Utilizar transiciones sencillas para conectar las diferentes partes de la introducción.

Ejemplo:

Pantalla negra
     ↓
Fade In
     ↓
Mensaje del sistema
     ↓
Fade / transición
     ↓
Escena de Zamo
     ↓
Diálogo
     ↓
Pantalla de inicio

Las transiciones deben ser rápidas.

No utilizar efectos que retrasen innecesariamente el inicio del juego.

13. AUDIO

La pantalla de bienvenida debe estar preparada para utilizar los sonidos y música del proyecto.

Si los sonidos todavía no han sido integrados, implementar inicialmente el sistema para que pueda recibirlos posteriormente.

Posibles elementos de audio:

Sonido ambiental de laboratorio.
Efecto de interferencia para los mensajes del sistema.
Pequeño efecto al avanzar el diálogo.
Sonido al seleccionar "COMENZAR".
Música ambiental suave.

El audio debe complementar la escena y no saturarla.

14. REUTILIZACIÓN DE ASSETS

La pantalla debe utilizar los assets existentes del proyecto cuando sea posible.

Actualmente se cuenta con:

Sprite sheet del jugador.
Sprite sheet de Zamo.

No modificar ni reemplazar estos sprites.

Para el laboratorio, pueden utilizarse assets temporales mientras se desarrollan los escenarios definitivos.

La lógica de la escena debe permanecer separada de los assets visuales.

Esto permitirá cambiar posteriormente:

Fondo.
Máquinas.
Decoración.
Efectos.
Interfaz.
Elementos del laboratorio.

sin tener que reescribir la lógica de la escena.

15. ESTILO GENERAL

La pantalla debe transmitir:

Misterio.
Curiosidad.
Aventura.
Tecnología.
Un pequeño toque de humor.

Debe sentirse como la introducción de un videojuego de aventura/puzzle 2D.

No debe parecer:

Una página web convencional.
Un formulario.
Un menú administrativo.
Una presentación académica.
Una interfaz demasiado moderna que contradiga el pixel art.

La prioridad es que desde los primeros segundos el jugador sienta que está entrando al mundo de:

Zamo: Error en el Laboratorio

16. PRIMERA IMPLEMENTACIÓN

La primera versión debe concentrarse únicamente en hacer funcional la pantalla.

Implementar:

Escena de bienvenida.
Fondo temporal del laboratorio.
Título del juego.
Mensajes iniciales del sistema.
Sprite de Zamo.
Sistema de diálogo.
Diálogo inicial.
Indicador [ ENTER ].
Transición hacia el Nivel 1.

No desarrollar todavía:

Pantalla de configuración.
Selección de niveles.
Créditos.
Sistema de guardado específico para la bienvenida.
Menús secundarios.
Animaciones complejas.
Efectos visuales avanzados.

La prioridad es tener una introducción funcional, clara y coherente con el estilo general del videojuego.

17. RESULTADO ESPERADO

Al ejecutar el juego, el jugador debe experimentar aproximadamente lo siguiente:

[ PANTALLA OSCURA ]

SISTEMA DEL LABORATORIO

ERROR CRÍTICO

Se detectaron anomalías en los sistemas.

        ↓

[ APARECE ZAMO ]

Zamo:
"Bueno... esto definitivamente no estaba
en el programa."

        ↓

Zamo:
"Algo salió mal en el laboratorio y varios
sistemas dejaron de funcionar."

        ↓

Zamo:
"Tendremos que investigar qué pasó.
Y, por favor, intenta no romper nada más."

        ↓

[ ENTER ] COMENZAR

        ↓

[ NIVEL 1 ]

El jugador comienza a explorar el laboratorio.

La pantalla debe ser corta, visual y narrativa.

Su función principal es introducir el conflicto y presentar la personalidad de Zamo antes de comenzar la aventura.


Puedes continuar con la pantalla de bienvenida

- :contentReference[oaicite:0]{index=0}
- :contentReference[oaicite:1]{index=1}