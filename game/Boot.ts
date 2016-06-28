/// <reference path="vendor/phaser-official/typescript/phaser.d.ts"/>

module Mystery {

    export class Boot extends Phaser.State {

        testSprites;

        preload() {

            //  Single-touch
            this.input.maxPointers = 1;

            // Pause upon navigating away
            this.stage.disableVisibilityChange = true;

            // Fill screen
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.load.image('preloadBar', './assets/loader.png');

            this.scale.refresh();

            this.game.load.baseURL = 'http://examples.phaser.io/assets/';
            this.game.load.crossOrigin = 'anonymous';

            this.game.time.advancedTiming = true;

            this.game.load.image('test', 'sprites/phaser-dude.png');
        }

        create() {

            console.log('BOOTING CREATE');

            this.game.input.addPointer();
            this.testSprites = [];
            var sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'test');
            sprite.anchor.setTo(0.5, 0.5);
            this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
            this.testSprites.push(sprite);

        }

        update() {
            for (let testSprite of this.testSprites) {
                testSprite.angle = (testSprite.angle + 1);
            }

            var click = this.game.input.activePointer.isDown
            if (click) {
                // 400 is the speed it will move towards the mouse
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
