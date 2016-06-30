/// <reference path="../vendor/phaser-official/typescript/phaser.d.ts"/>

//declare var electron: any;

module Mystery {

    export class MainRoom extends Phaser.State {

        testSprites;

        preload() {

            // Settings
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.time.advancedTiming = true;

            // Fill screen
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.scale.refresh();

            // Load images
            var space = 55;
            this.game.load.spritesheet('player', 'assets/player-walk.png', 128 - space, 132 - space, 7, 0, space);
        }

        create() {

            this.game.input.addPointer();
            this.testSprites = [];
            var sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
            sprite.animations.add('walk');
            sprite.anchor.setTo(0.5, 0.5);
            sprite.animations.play('walk', 12, true);
            this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
            this.testSprites.push(sprite);
        }

        update() {

            var click = this.game.input.activePointer.isDown
            if (click) {

                var sprite = this.testSprites[0];
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
