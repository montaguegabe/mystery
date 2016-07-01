//
// Game: Extends the Phaser 'Game' class
//

module Engine {
    export class MGame extends Phaser.Game {

        onRoomConfig: Phaser.Signal;
        onRoomCreated: Phaser.Signal;

        constructor(width?: number | string, height?: number | string, renderer?: number, parent?: any, state?: any, transparent?: boolean, antialias?: boolean, physicsConfig?: any) {
            super(width, height, renderer, parent, state, transparent, antialias, physicsConfig);

            this.onRoomConfig = new Phaser.Signal();
            this.onRoomCreated = new Phaser.Signal();
        }
    }
}
