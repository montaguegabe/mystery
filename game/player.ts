module Mystery {

    export class Player extends Engine.MObject {

        constructor(game: Phaser.Game, x, y) {

            // Make Phaser sprite
            super(game, x, y, 'player');

            // Configure
            this.animations.add('walk');
            this.anchor.setTo(0.5, 0.5);
            this.animations.play('walk', 12, true);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);

            // Add to world
            this.game.add.existing(this);
        }
    }
}
