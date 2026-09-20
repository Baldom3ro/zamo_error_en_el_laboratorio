window.onload = function() {
    const config = Object.assign(gameConfig, {
        scene: [
            BootScene,
            PreloadScene,
            MenuScene,
            Level01Scene,
            Level02Scene,
            Level03Scene,
            Level04Scene
        ]
    });
    
    const game = new Phaser.Game(config);
};
