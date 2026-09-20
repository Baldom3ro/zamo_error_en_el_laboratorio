class PuzzleObject {
    constructor(scene, x, y, texture) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, texture);
        this.sprite.setImmovable(true);
        this.sprite.setPushable(false);
        this.active = false;
    }
    toggle() {
        this.active = !this.active;
        this.sprite.setTint(this.active ? 0x00ff00 : 0xffffff);
    }
}
