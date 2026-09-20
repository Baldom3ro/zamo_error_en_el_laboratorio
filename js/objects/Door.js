class Door {
    constructor(scene, x, y, texture) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, texture);
        this.sprite.setImmovable(true);
        this.sprite.setPushable(false);
        this.isOpen = false;
    }
    open() {
        this.isOpen = true;
        this.sprite.setAlpha(0.2); 
    }
    close() {
        this.isOpen = false;
        this.sprite.setAlpha(1.0);
    }
}
