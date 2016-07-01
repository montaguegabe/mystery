module Mystery {

    export class MainRoom extends Engine.MRoom {

        sprites;

        config() {

            // Load images
            var space = 55;
            this.game.load.spritesheet('player', 'assets/player-walk.png', 128 - space, 132 - space, 7, 0, space);
        }

        start() {

            this.sprites = [];
            var sprite = new Player(this.game, this.world.centerX, this.world.centerY);
            this.sprites.push(sprite);
        }

        update() {

            var click = this.game.input.activePointer.isDown
            if (click) {

                var sprite = this.sprites[0];
                this.game.physics.arcade.moveToPointer(sprite, 400);

                //  If it's overlapping the mouse, don't move any more
                if (Phaser.Rectangle.contains(sprite.body, this.game.input.x, this.game.input.y))
                {
                    sprite.body.velocity.setTo(0, 0);
                }
            }
        }

        render() {
            this.game.debug.text("FPS: " + this.game.time.fps, 2, 14, "#00ff00");
        }

    }

}
