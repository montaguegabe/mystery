//
// Game: Configuration for the entire Phaser game.
//

/// <reference path="../vendor/phaser-official/typescript/phaser.d.ts"/>
/// <reference path='main-room.ts'/>

module Mystery {

    export class Game extends Phaser.Game {

        constructor() {
            super(640, 480, Phaser.AUTO, 'content', null);

            // Go to first room
            this.state.add('MainRoom', MainRoom);
            this.state.start('MainRoom');
            this.state.onPreloadCallback(this.configure)
        }

        // Configures the global game setup. Called by
        configure() {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.time.advancedTiming = true;

            // Fill screen
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.refresh();
        }
    }
}
