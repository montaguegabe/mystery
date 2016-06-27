module Mystery {

    export class Boot extends Phaser.State {

        preload() {
            this.load.image('preloadBar', './assets/loader.png');
        }

        create() {

            console.log('BOOTING CREATE');

            //  Single-touch
            this.input.maxPointers = 1;

            // Pause upon navigating away
            this.stage.disableVisibilityChange = true;

            // Fill screen
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.game.state.start('Preloader', true, false);
        }

    }

}
