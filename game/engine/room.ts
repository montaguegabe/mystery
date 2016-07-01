//
// MRoom: Extends Phaser's 'State' class. Emits events
//

module Engine {

    export class MRoom extends Phaser.State {

        game : MGame;

        // Signal fired after configuration/resource loading
        onConfig: Phaser.Signal;

        // Signal that is fired after the room has completely loade and the create function has been called
        onStart: Phaser.Signal;

        constructor() {
            super();

            this.onConfig = new Phaser.Signal();
            this.onStart = new Phaser.Signal();
        }

        preload() {
            // (TODO: Automatically) load any resources required by the room

            this.config();
            this.onConfig.dispatch();
            this.game.onRoomConfig.dispatch();
        }

        create() {

            // TODO: Add all game objects to the room from the configuration

            this.start();
            this.onStart.dispatch();
            this.game.onRoomCreated.dispatch();
        }

        // Override these:
        config() {}
        start() {}
    }
}
