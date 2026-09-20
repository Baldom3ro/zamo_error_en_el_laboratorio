# NIVEL 3 - EL NÚCLEO DE CONTROL

## 1. OBJETIVO DEL NIVEL

El Nivel 3 representa un aumento importante en la dificultad de los puzzles.

Para este punto, el jugador ya conoce:

- Movimiento.
- Exploración.
- Interacción.
- Sistema de diálogo.
- Uso de pistas.
- Relación entre diferentes elementos.
- Participación de Zamo.
- Resolución de puzzles de varias etapas.

El Nivel 3 debe comenzar a combinar estas mecánicas.

El jugador tendrá que resolver una cadena de problemas relacionados entre sí para llegar al núcleo de control del laboratorio.

La idea principal del nivel es:

> Una solución no representa el final de un puzzle, sino el comienzo del siguiente.

El jugador debe observar, experimentar, recordar información y utilizar correctamente a Zamo.

---

# 2. SITUACIÓN NARRATIVA

Después de atravesar la zona de investigación, el jugador y Zamo llegan a una sección mucho más importante del laboratorio.

Esta zona contiene el sistema central encargado de controlar diferentes instalaciones.

Al entrar, las pantallas muestran múltiples errores.

El sistema indica:

```text
SISTEMA CENTRAL

ESTADO: INESTABLE

PROTOCOLO DE CONTENCIÓN:
ACTIVO

ACCESO AL NÚCLEO:
BLOQUEADO
````

Zamo observa las pantallas y comenta:

> "Esto parece bastante más importante que el interruptor que arreglamos antes."

Después:

> "Y también parece bastante más dispuesto a explotar."

El jugador debe encontrar una manera de desactivar el protocolo de contención y acceder al núcleo de control.

---

# 3. OBJETIVO PRINCIPAL

El objetivo general del nivel es:

```text
ACCEDER AL NÚCLEO DE CONTROL
```

Para lograrlo, el jugador deberá completar varias etapas:

```text
Explorar el área
      ↓
Descubrir el sistema de contención
      ↓
Encontrar tres módulos de control
      ↓
Restaurar cada módulo
      ↓
Utilizar información obtenida anteriormente
      ↓
Coordinar acciones con Zamo
      ↓
Desactivar el protocolo de contención
      ↓
Acceder al núcleo
```

---

# 4. ESTRUCTURA DEL NIVEL

El mapa debe ser más complejo que los niveles anteriores.

Una distribución posible:

```text
┌──────────────────────────────┐
│                              │
│       ENTRADA                │
│                              │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│                              │
│     CENTRO DE CONTROL        │
│                              │
│      Sistema principal       │
│                              │
└───────┬───────────┬──────────┘
        │           │
        ▼           ▼
┌─────────────┐ ┌─────────────┐
│ MÓDULO A    │ │ MÓDULO B    │
│             │ │             │
│ Energía     │ │ Señales     │
└──────┬──────┘ └──────┬──────┘
       │               │
       └───────┬───────┘
               ▼
        ┌─────────────┐
        │  MÓDULO C   │
        │             │
        │  Control    │
        └──────┬──────┘
               │
               ▼
      ┌──────────────────┐
      │                  │
      │ NÚCLEO DE        │
      │ CONTROL          │
      │                  │
      └──────────────────┘
```

Las zonas deben formar parte de un mismo entorno.

No es necesario convertir cada módulo en una escena independiente.

---

# 5. INICIO DEL NIVEL

El jugador comienza en el centro de control.

Al acercarse al sistema principal, aparece:

```text
SISTEMA CENTRAL

PROTOCOLO DE CONTENCIÓN ACTIVO

SE REQUIEREN:

[ MÓDULO A ]  ERROR
[ MÓDULO B ]  ERROR
[ MÓDULO C ]  ERROR
```

El sistema indica:

```text
TODOS LOS MÓDULOS DEBEN SER RESTAURADOS
ANTES DE DESACTIVAR LA CONTENCIÓN.
```

Actualizar el objetivo:

```text
OBJETIVO

Restaurar los tres módulos de control.
```

---

# 6. NUEVA MECÁNICA: PUZZLE EN CADENA

El principal cambio del Nivel 3 es que los puzzles están conectados.

El jugador no debe resolver tres puzzles completamente independientes.

La estructura debe ser:

```text
Módulo A
   ↓
obtiene información
   ↓
Módulo B
   ↓
utiliza información de A
   ↓
obtiene acceso a C
   ↓
Módulo C
   ↓
utiliza información de A + B + Zamo
   ↓
desactiva la contención
```

Cada solución debe proporcionar una pieza útil para la siguiente etapa.

---

# 7. MÓDULO A - SISTEMA DE ENERGÍA

El primer módulo controla la distribución de energía.

Al interactuar:

```text
MÓDULO DE ENERGÍA

ESTADO:
INESTABLE

REQUIERE CALIBRACIÓN MANUAL
```

El jugador encuentra varios controles.

Por ejemplo:

```text
[ 1 ] [ 2 ] [ 3 ] [ 4 ]
```

Cada control modifica una parte diferente del circuito.

---

# 8. PUZZLE DEL MÓDULO A

El jugador debe descubrir cómo estabilizar el sistema.

La información necesaria está distribuida entre:

* Una pantalla.
* Indicadores luminosos.
* Un pequeño esquema técnico.
* Una máquina cercana.

Los elementos deben mostrar relaciones lógicas.

Por ejemplo:

```text
LUZ VERDE = CIRCUITO ACTIVO
LUZ AMARILLA = CIRCUITO INESTABLE
LUZ ROJA = CIRCUITO SOBRECARGADO
```

El jugador debe configurar correctamente el sistema evitando sobrecargar los circuitos.

No utilizar una combinación aleatoria.

La solución debe poder deducirse de los indicadores.

---

# 9. RESULTADO DEL MÓDULO A

Cuando el sistema queda estabilizado:

```text
MÓDULO A

ESTADO:
ESTABLE

ENERGÍA RESTAURADA
```

Una pantalla cercana se activa.

La pantalla muestra una parte del protocolo necesario para el siguiente módulo.

Por ejemplo:

```text
PROTOCOLO DE COMUNICACIÓN

SECUENCIA:
△ → ○ → □ → △
```

El jugador debe recordar o poder consultar esta información posteriormente.

Esta información será necesaria para el Módulo B.

---

# 10. MÓDULO B - SISTEMA DE COMUNICACIÓN

El segundo módulo controla la comunicación entre diferentes sistemas del laboratorio.

Al llegar:

```text
MÓDULO DE COMUNICACIÓN

SEÑAL INTERRUMPIDA

REQUIERE SINCRONIZACIÓN
```

El jugador encuentra varias terminales.

Cada terminal muestra diferentes símbolos.

El jugador debe utilizar la secuencia obtenida del Módulo A.

---

# 11. PUZZLE DEL MÓDULO B

El jugador debe introducir correctamente la secuencia.

Sin embargo, la secuencia no debe ser suficiente por sí sola.

El jugador debe determinar:

* El orden.
* El punto de inicio.
* Qué terminal corresponde a cada símbolo.

Para ello existen indicadores visuales en el escenario.

La solución debe requerir observación.

Ejemplo conceptual:

```text
Información del Módulo A
        +
Símbolos de las terminales
        +
Indicadores del escenario
        ↓
Secuencia correcta
```

---

# 12. ERROR EN EL MÓDULO B

Si la secuencia es incorrecta:

```text
SINCRONIZACIÓN FALLIDA
```

No reiniciar el Módulo A.

El jugador puede seguir experimentando.

Zamo puede comentar:

> "Creo que estamos hablando con las máquinas en el idioma equivocado."

No proporcionar inmediatamente la solución.

---

# 13. RESULTADO DEL MÓDULO B

Cuando el jugador sincroniza correctamente el sistema:

```text
COMUNICACIÓN RESTAURADA

NUEVO ACCESO DESBLOQUEADO
```

Se abre una puerta hacia el Módulo C.

Además, aparece una nueva información:

```text
PROTOCOLO DE CONTENCIÓN

REQUIERE DOS OPERADORES
```

Esto anticipa la participación necesaria de Zamo.

---

# 14. MÓDULO C - CONTROL DUAL

El tercer módulo debe ser el puzzle principal del nivel.

El sistema requiere que dos mecanismos sean activados prácticamente al mismo tiempo.

El jugador no puede activar ambos por sí mismo.

Aquí Zamo se vuelve indispensable.

---

# 15. PARTICIPACIÓN DE ZAMO

El área contiene dos controles:

```text
CONTROL A                 CONTROL B
    ●                         ●
```

Los controles están demasiado separados para que el jugador pueda activarlos dentro del tiempo requerido.

Zamo debe activar uno mientras el jugador activa el otro.

El jugador debe descubrir esta posibilidad mediante la información obtenida anteriormente.

---

# 16. MECÁNICA DE COOPERACIÓN

El jugador se acerca a uno de los controles.

Al interactuar:

```text
[E] ACTIVAR MECANISMO
```

El jugador puede indicar a Zamo que se coloque en el segundo control.

Zamo responde:

> "Tú encárgate de ese. Yo voy con el otro."

Después, ambos mecanismos deben activarse dentro de un intervalo determinado.

Por ejemplo:

```text
CONTROL A ACTIVADO
        ↓
Temporizador
        ↓
CONTROL B debe activarse
```

El intervalo no debe ser demasiado corto.

El objetivo es introducir coordinación, no convertir el puzzle en una prueba de reflejos.

---

# 17. VARIACIÓN DEL PUZZLE

Antes de realizar la activación simultánea, el jugador debe descubrir cuál control corresponde a cada sistema.

Puede existir una pantalla:

```text
PROTOCOLO DE CONTENCIÓN

OPERADOR PRINCIPAL → CONTROL A
ASISTENTE → CONTROL B
```

Esto conecta nuevamente la información encontrada anteriormente con la solución.

---

# 18. FALLA DEL PUZZLE

Si el jugador activa los controles fuera del tiempo:

```text
PROTOCOLO INTERRUMPIDO

SINCRONIZACIÓN FALLIDA
```

Los controles regresan a su estado inicial.

No existe penalización importante.

El jugador puede volver a intentarlo.

Zamo puede comentar:

> "Casi."

Después:

> "La próxima vez intenta hacerlo antes de que todo vuelva a apagarse."

---

# 19. DESACTIVACIÓN DEL PROTOCOLO

Cuando los dos controles se activan correctamente:

```text
PROTOCOLO DE CONTENCIÓN

DESACTIVANDO...

25%
50%
75%
100%

CONTENCIÓN DESACTIVADA
```

Las luces del laboratorio cambian.

Las alarmas dejan de sonar.

Las pantallas muestran un estado estable.

El acceso al núcleo de control queda desbloqueado.

---

# 20. ACCESO AL NÚCLEO

El jugador llega a la puerta principal del núcleo.

Al interactuar:

```text
[E] ENTRAR
```

La puerta se abre.

Antes de pasar, Zamo puede decir:

> "Llegamos hasta aquí."

Pausa.

> "Ahora solo falta descubrir qué fue lo que provocó todo este desastre."

Esto prepara narrativamente el Nivel 4.

---

# 21. OBJETIVOS DINÁMICOS

El objetivo debe cambiar durante el nivel.

### Inicio

```text
OBJETIVO

Restaurar los tres módulos de control.
```

### Módulo A

```text
OBJETIVO

Estabilizar el sistema de energía.
```

### Módulo B

```text
OBJETIVO

Restaurar la comunicación.
```

### Módulo C

```text
OBJETIVO

Sincronizar los dos controles.
```

### Final

```text
OBJETIVO

Acceder al núcleo de control.
```

---

# 22. EXPLORACIÓN

El escenario debe ser más complejo que el Nivel 2.

Incluir:

* Centro de control.
* Módulos tecnológicos.
* Computadoras.
* Máquinas.
* Pantallas.
* Conductos.
* Paneles eléctricos.
* Puertas automáticas.
* Señalización.
* Elementos decorativos.
* Áreas parcialmente bloqueadas.

El mapa debe dar sensación de profundidad y progresión.

---

# 23. PISTAS

Las pistas deben continuar siendo ambientales.

Utilizar:

* Pantallas.
* Diagramas.
* Indicadores luminosos.
* Documentos.
* Símbolos.
* Señalización.
* Estados de las máquinas.
* Comentarios de Zamo.

Evitar colocar mensajes que literalmente indiquen:

```text
"HAZ ESTO Y DESPUÉS HAZ ESTO."
```

El jugador debe interpretar la información.

---

# 24. PARTICIPACIÓN DE ZAMO

En este nivel, Zamo debe sentirse más integrado al gameplay.

Debe poder:

* Seguir al jugador.
* Acceder a espacios pequeños.
* Activar mecanismos.
* Obtener información.
* Participar en acciones simultáneas.
* Comentar descubrimientos.
* Proporcionar pistas cuando sea necesario.

Zamo debe tener una función real en la resolución de los puzzles.

El jugador no debería poder completar el nivel ignorándolo.

---

# 25. SISTEMA DE PISTAS

Si el jugador permanece demasiado tiempo en una etapa, Zamo puede proporcionar pistas progresivas.

### Primera pista

> "Creo que deberíamos revisar qué cambió cuando activamos ese módulo."

### Segunda pista

> "La información que encontramos antes podría servir aquí."

### Tercera pista

> "Ese sistema parece diseñado para trabajar con dos operadores."

Las pistas deben orientar al jugador sin revelar automáticamente la solución.

---

# 26. AUDIO

Utilizar:

* Música ambiental de mayor tensión.
* Sonidos de máquinas.
* Alarmas.
* Interacciones.
* Activación de módulos.
* Errores.
* Confirmaciones.
* Puertas.
* Efectos eléctricos.
* Sonidos relacionados con Zamo.

La música puede aumentar ligeramente la tensión cuando el jugador se acerque al núcleo.

---

# 27. EFECTOS VISUALES

Cuando los módulos se restauren:

* Activar luces.
* Encender pantallas.
* Cambiar indicadores.
* Activar máquinas.
* Mostrar pequeñas partículas.
* Cambiar el estado de las puertas.

No utilizar efectos excesivos.

El pixel art debe seguir siendo claramente visible.

---

# 28. CÁMARA

Mantener el sistema de cámara utilizado en los niveles anteriores.

La cámara debe:

* Seguir al jugador.
* Respetar límites del mapa.
* Mantener una escala consistente.
* Evitar movimientos bruscos.
* Permitir visualizar correctamente los elementos importantes.

---

# 29. INTERFAZ

Mantener la interfaz mínima.

Mostrar:

```text
OBJETIVO:
[objetivo actual]
```

Y los mensajes contextuales:

```text
[E] INTERACTUAR
```

Durante los puzzles pueden aparecer interfaces específicas de cada máquina.

Estas interfaces deben desaparecer al terminar la interacción.

---

# 30. DIFICULTAD

El Nivel 3 debe ser notablemente más complejo que los anteriores.

La progresión debe ser:

```text
NIVEL 1
Aprender las mecánicas.
        ↓
NIVEL 2
Relacionar diferentes pistas.
        ↓
NIVEL 3
Encadenar soluciones y combinar mecánicas.
        ↓
NIVEL 4
Aplicar todo lo aprendido.
```

La dificultad debe provenir principalmente del razonamiento.

No utilizar enemigos difíciles ni obstáculos basados en reflejos como principal fuente de dificultad.

---

# 31. DURACIÓN ESTIMADA

El Nivel 3 debe tener una duración aproximada de:

**10 a 15 minutos.**

Un jugador que conozca las soluciones podrá completarlo más rápidamente.

Un jugador que juegue por primera vez deberá explorar y analizar las diferentes etapas.

---

# 32. CONDICIÓN DE COMPLETADO

El nivel se considera completado cuando:

```text
moduloA.estable == true
```

y:

```text
moduloB.sincronizado == true
```

y:

```text
moduloC.completado == true
```

y:

```text
protocoloContencion == false
```

y:

```text
puertaNucleo.abierta == true
```

Solo después de cumplir todas estas condiciones se debe permitir la transición al Nivel 4.

---

# 33. PROGRESIÓN NARRATIVA

Al terminar el nivel, el jugador debe tener la sensación de que está acercándose a descubrir qué ocurrió realmente.

No revelar todavía toda la explicación.

El Nivel 3 debe responder algunas preguntas, pero generar otras.

Por ejemplo:

```text
¿Qué controla realmente el núcleo?

¿Por qué se activó el protocolo de contención?

¿Qué provocó la falla inicial?

¿Por qué algunos sistemas parecen haber cambiado?
```

Estas preguntas deben preparar el conflicto final del Nivel 4.

---

# 34. PRINCIPIO DE DISEÑO DEL NIVEL

El Nivel 3 debe enseñar al jugador que los problemas pueden tener varias capas.

La experiencia ideal debe sentirse así:

```text
"Necesito restaurar el sistema."

        ↓

"Para hacerlo necesito el primer módulo."

        ↓

"Este módulo me dio información."

        ↓

"Esta información sirve para el segundo módulo."

        ↓

"Ahora tengo acceso al tercero."

        ↓

"Este sistema necesita dos operadores."

        ↓

"Zamo puede ayudarme."

        ↓

"¡Funcionó!"

        ↓

"Ahora puedo entrar al núcleo."
```

El jugador debe sentir que está comprendiendo progresivamente el funcionamiento del laboratorio.

---

# 35. CRITERIO DE CALIDAD

El Nivel 3 debe cumplir las siguientes condiciones:

* Cada puzzle debe tener una solución lógica.
* Las pistas deben estar relacionadas con las soluciones.
* Las soluciones anteriores deben aportar información para las siguientes etapas.
* Zamo debe ser indispensable.
* El jugador debe poder experimentar sin recibir castigos excesivos.
* No debe ser necesario adivinar.
* No debe ser necesario probar todas las combinaciones.
* El escenario debe proporcionar información visual suficiente.
* La dificultad debe aumentar respecto al Nivel 2.
* El jugador debe sentir progreso constante.

La sensación buscada es:

> "Ya entendí cómo funciona este sistema."

y posteriormente:

> "Ahora tengo que descubrir cómo combinar todo lo que aprendí."

---

# 36. ASSETS TEMPORALES

Si todavía no existen los assets definitivos, utilizar elementos temporales.

Se pueden utilizar:

* Tiles temporales.
* Máquinas simples.
* Paneles.
* Puertas.
* Terminales.
* Indicadores.
* Elementos geométricos.
* Efectos visuales sencillos.

La lógica debe mantenerse independiente de los assets.

Posteriormente deben poder reemplazarse por:

* Tilesets definitivos.
* Objetos pixel art.
* Máquinas detalladas.
* Paneles.
* Decoración.
* Animaciones.

sin reescribir las mecánicas.

---

# 37. RESULTADO ESPERADO

Al terminar el Nivel 3, el jugador debe haber aprendido que:

1. Los puzzles pueden tener varias etapas.
2. Una solución puede proporcionar información para otro problema.
3. Las diferentes áreas del escenario están conectadas.
4. La observación sigue siendo fundamental.
5. Zamo es necesario para resolver determinados problemas.
6. El jugador y Zamo funcionan como un equipo.
7. El laboratorio tiene un problema mucho más grande de lo que parecía al inicio.

El Nivel 3 debe terminar con el jugador entrando al núcleo de control, preparando directamente el inicio del Nivel 4.