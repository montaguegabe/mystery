/// <reference path="../vendor/phaser-official/typescript/phaser.d.ts"/>
/// <reference path='MainRoom.ts'/>

module Mystery {

    export class Game extends Phaser.Game {

        constructor() {
            super(640, 480, Phaser.AUTO, 'content', null);

            this.state.add('MainRoom', MainRoom, false);
            this.state.start('MainRoom');
        }
    }
}
