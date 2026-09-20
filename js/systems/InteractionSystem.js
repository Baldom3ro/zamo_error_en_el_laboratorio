class InteractionSystem {
    constructor(scene) {
        this.scene = scene;
        this.lastInteract = 0;
    }
    interact(playerSprite, interactables) {
        const now = this.scene.time.now;
        if (now - this.lastInteract < 500) return;
        this.lastInteract = now;

        let closest = null;
        let minDistance = 30; 

        interactables.forEach(obj => {
            const dist = Phaser.Math.Distance.Between(playerSprite.x, playerSprite.y, obj.x, obj.y);
            if (dist < minDistance) {
                closest = obj;
                minDistance = dist;
            }
        });

        if (closest && closest.parentObj && closest.parentObj.onInteract) {
            closest.parentObj.onInteract();
        }
    }
}
