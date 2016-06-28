/// <reference path="vendor/phaser-official/typescript/phaser.d.ts"/>
/// <reference path='Boot.ts'/>

module Mystery {

    export class Game extends Phaser.Game {

        constructor() {
            super(1136, 640, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.start('Boot');
        }
    }
}
