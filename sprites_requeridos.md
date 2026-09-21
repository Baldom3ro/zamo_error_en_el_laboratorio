# Guía de Sprites Requeridos: Zamo: Error en el Laboratorio 🎨

Esta lista detalla todos los elementos gráficos necesarios para reemplazar los bloques temporales (`floor_temp`, `wall_temp`, `door_temp`, `machine_temp`) y dotar al juego de una estética pixel art completa, coherente y atractiva.

---

## 📐 Especificaciones Técnicas Generales
* **Estilo visual:** Pixel Art clásico (estilo 16-bit / indie retro).
* **Resolución base de tiles:** **16×16 píxeles** (o múltiplos: 32×32 para máquinas grandes).
* **Formato:** PNG con fondo transparente (RGB con canal Alfa).
* **Paleta sugerida:** Tonos metálicos, grises y azules de laboratorio, contrastados con luces neón (verde terminal, cian energía, rojo alarma, amarillo advertencia).

---

## 1. Entornos y Tilesets Base (`assets/environments/`)

### 1.1 Suelos (Pisos)
* `floor_tile.png` (16×16): Baldosa de laboratorio blanca o gris claro pulida.
* `floor_metal.png` (16×16): Rejilla metálica industrial o planchas de acero con remaches.
* `floor_hazard.png` (16×16): Franjas diagonales amarillo y negro de advertencia para zonas peligrosas.

### 1.2 Paredes y Estructuras
* `wall_tileset.png` (16×16 por celda): Muros superiores, frontales, esquinas y zócalos de laboratorio.
* `wall_glass.png` (16×32 o 32×32): Cristaleras / ventanas de observación con vista a cámaras interiores o líquido refrigerante.
* `pipes_tileset.png` (16×16): Tuberías de fluidos (rectas, codos, uniones en T, manómetros).

### 1.3 Puertas y Conductos (`assets/objects/doors/`)
* `door_lab_sheet.png` (32×32 por frame): Puerta automática corrediza horizontal o vertical.
  * Frame 1: Cerrada con luz roja.
  * Frames 2-3: Abriéndose (desplazamiento mecánico).
  * Frame 4: Abierta con luz verde.
* `door_security_heavy.png` (32×48): Compuerta blindada de confinamiento para los niveles 3 y 4.
* `zamo_vent_hole.png` (16×16 o 24×24): Conducto de ventilación en la pared o suelo con rejilla quitada (accesible para Zamo).

---

## 2. Maquinaria e Interactuables Generales (`assets/objects/machines/`)

* `computer_desk.png` (32×32): Escritorio con monitor CRT / PC de laboratorio.
  * Variante 1: Monitor encendido con interfaz verde o cian.
  * Variante 2: Monitor con pantalla de error / estática roja.
* `server_rack.png` (16×32 o 32×48): Torres de servidores con luces LED parpadeantes (animación de 2-3 frames).
* `switch_panel.png` (16×16 o 24×24): Panel con palanca o switch de circuito (estados ON y OFF con luz verde/roja).
* `emergency_button.png` (16×16): Botón tipo hongo rojo de emergencia industrial en caja amarilla (con estados pulsado y sin pulsar).

---

## 3. Elementos Específicos por Nivel

### 🧪 Nivel 1: Fuga Química y Circuitos
* `chemical_tanks.png` (32×48): Tanques cilíndricos con líquido químico verde brillante.
* `pipe_broken.png` (16×16): Tubería fracturada que expulsa vapor.
* `circuit_switches.png` (16×16 c/u): 4 interruptores numerados del 1 al 4 para calibrar la energía auxiliar.
* `emergency_shower.png` (16×32): Ducha de seguridad o interruptor de extracción de vapor.

### ⚙️ Nivel 2: Maquinaria en Movimiento
* `symbol_consoles.png` (24×24 c/u): 4 botones o terminales con los símbolos tallados/iluminados:
  * Triángulo (▲)
  * Círculo (●)
  * Cuadrado (■)
  * Rombo (◆)
* `conveyor_belt.png` (16×16): Cinta transportadora automatizada de materiales.
* `mechanical_arm.png` (32×32 o 32×48): Brazo robótico articulado industrial (para el peligro del ciclo de movimiento).
* `high_button.png` (16×16): Interruptor en la parte alta del muro con escalón (botón que Zamo salta a presionar).
* `emergency_brake_lever.png` (16×24): Palanca grande de freno de emergencia mecánica.

### 🚨 Nivel 3: Protocolo de Seguridad
* `central_console_screen.png` (48×32): Gran consola central con mapa holográfico o gráfico de módulos del laboratorio.
* `terminal_delta.png`, `terminal_circle.png`, `terminal_square.png`, `terminal_diamond.png` (24×24 c/u): Terminales de transmisión con antenas o pedestales emisores.
* `lockdown_gate.png` (32×16): Barreras láser o rejas amarillas de confinamiento.
* `dual_operator_console.png` (24×24): Consolas Alpha y Beta con almohadilla de huella digital o switch de sincronización dual.

### ⚡ Nivel 4: El Núcleo Central
* `core_reactor_sheet.png` (64×64 o 72×72): El Núcleo Central del laboratorio.
  * Animación de plasma / energía giratoria:
    * Estado Inestable: Núcleo pulsando en naranja, amarillo y chispas rojas.
    * Estado Estable: Núcleo pulsando suavemente en cian y azul celeste.
* `energy_cells.png` (16×24 c/u): Celdas / baterías de energía A, B, C, D con barras fluorescentes de carga.
* `purge_console.png` (32×32): Consola de purga y contención con pantalla táctil e indicadores de advertencia.
* `server_diagnostics.png` (32×32): Racks de servidores donde se leen los logs de la falla del punto y coma (`;`).

---

## 4. Efectos Visuales y Partículas (VFX) (`assets/objects/vfx/`)
* `sparks_anim.png` (16×16 por frame, 4 frames): Chispas eléctricas que saltan de cables rotos o máquinas sobrecargadas.
* `steam_cloud.png` (16×16 por frame): Nubes de vapor o gas químico verde.
* `siren_light.png` (16×16): Luz giratoria de alarma de emergencia roja/ámbar.

---

## 5. Interfaz de Usuario (UI) (`assets/ui/`)
* `key_e_icon.png` (16×16): Tecla `[ E ]` estilo pixel art para indicaciones de interacción sobre objetos.
* `dialogue_portrait_zamo.png` (48×48 o 64×64): Retrato de Zamo para la caja de diálogos (normal, pensativo, asustado, sarcástico).
* `dialogue_portrait_player.png` (48×48 o 64×64): Retrato del protagonista humano.
* `alert_icon.png` (16×16): Signo de exclamación `!` de advertencia pixel art.

---

## 📁 Estructura de Carpetas Recomendada en el Proyecto
```text
assets/
├── environments/
│   ├── floors/
│   ├── walls/
│   └── tilesets/
├── objects/
│   ├── doors/
│   ├── machines/
│   ├── panels/
│   └── vfx/
└── ui/
    ├── icons/
    └── portraits/
```
