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

            this.testSprites = [];
            let sprite;
            for (let y = 0; y < this.game.height; y = y + 60) {
                for (let x = 0; x < this.game.width; x = x + 60) {
                    sprite = this.add.sprite(x, y, 'test');
                    sprite.anchor.setTo(0.5, 0.5);
                    sprite.angle = this.game.rnd.integerInRange(0, 359);
                    sprite.scale.setTo(this.game.rnd.realInRange(0.1, 2), this.game.rnd.realInRange(0.1, 2));
                    this.testSprites.push(sprite);
                }
            }

        }

        update() {
            for (let testSprite of this.testSprites) {
                testSprite.angle = (testSprite.angle + 1);
            }
        }

        render() {
            this.game.debug.text("FPS: " + this.game.time.fps, 2, 14, "#00ff00");
        }

    }

}
