//
// MObject: Extends Phaser's 'Sprite' class into something that is more
// quickly customizable
//

module Engine {

    export class MObject extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
            super(game, x, y, key, frame);
        }
    }
}
