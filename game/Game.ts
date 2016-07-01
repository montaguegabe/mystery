//
// Game: Configuration for the entire Phaser game.
//

module Mystery {

    export class Game extends Engine.MGame {

        constructor() {
            super(640, 480, Phaser.AUTO, 'content', null);

            // Go to first room
            var room : Engine.MRoom = new MainRoom();
            room.onConfig.add(this.settings, this);
            this.state.add('MainRoom', room, true);
        }

        // Configures the global game setup. Called by
        settings() {
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
