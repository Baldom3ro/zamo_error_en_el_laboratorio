class DialogueSystem {

    // ─── Singleton: único div compartido por todas las escenas ─────────────
    static _init() {
        if (DialogueSystem._box) return;

        const box = document.createElement('div');
        box.id = 'zamo-dlg';
        box.style.cssText = [
            'position:fixed',
            'bottom:10%',
            'left:50%',
            'transform:translateX(-50%)',
            'background:rgba(0,0,0,0.92)',
            'color:#ffffff',
            'font-family:"Courier New",monospace',
            'font-size:14px',
            'font-weight:bold',
            'padding:12px 20px',
            'border:2px solid #ffffff',
            'border-radius:4px',
            'max-width:480px',
            'min-width:220px',
            'text-align:center',
            'white-space:pre-line',
            'line-height:1.5',
            'display:none',
            'z-index:99999',
            'pointer-events:none',
            'box-shadow:0 0 12px rgba(0,255,255,0.4)'
        ].join(';');

        document.body.appendChild(box);
        DialogueSystem._box = box;
    }

    // ──────────────────────────────────────────────────────────────────────
    constructor(scene) {
        DialogueSystem._init();
        this.scene    = scene;
        this.box      = DialogueSystem._box;
        this.lines    = [];
        this.idx      = 0;
        this.isActive = false;
        this.onComplete = null;

        this.enterKey = scene.input.keyboard.addKey('ENTER');
        this.enterKey.on('down', () => this.advance());
    }

    show(textOrArray, onCompleteCallback = null) {
        this.lines      = Array.isArray(textOrArray) ? textOrArray : [textOrArray];
        this.idx        = 0;
        this.isActive   = true;
        this.onComplete = onCompleteCallback;
        this.box.style.display = 'block';
        this._render();
    }

    advance() {
        if (!this.isActive) return;
        this.idx++;
        if (this.idx >= this.lines.length) {
            this.isActive = false;
            this.box.style.display = 'none';
            if (this.onComplete) this.onComplete();
        } else {
            this._render();
        }
    }

    _render() {
        let raw = this.lines[this.idx];
        let speaker = 'ZAMO';
        let text = raw;

        // Limpiar cualquier prefijo Zamo: repetido
        while (/^zamo:\s*/i.test(text)) {
            text = text.replace(/^zamo:\s*/i, '');
        }

        // Detectar si la linea traia otro hablante o sistema
        const match = raw.match(/^([A-Za-z0-9 _-]+):\s*([\s\S]*)$/);
        if (match && !/^zamo$/i.test(match[1].trim())) {
            speaker = match[1].trim().toUpperCase();
            text = match[2].trim();
        } else if (/^(SISTEMA|MODULO|PROTOCOLO|DIAGRAMA|CIRCUITO|EXPEDIENTE|DIAGN[OÓ]STICO|SOBRECARGA|SINCRONIZACI[OÓ]N|TERMINAL|PANTALLA|CONEXI[OÓ]N)/i.test(text)) {
            speaker = 'SISTEMA';
        }

        this.box.textContent = speaker + ':\n' + text + '\n\n[ENTER]';
    }
}

// Inicializar propiedad estática
DialogueSystem._box = null;
