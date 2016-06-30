//
// app.ts: The main entry point for platform-independent game logic. Launches
// the phaser game.
//

/// <reference path='interface/platform-bridge.d.ts'/>
/// <reference path='game.ts'/>

window.onload = () => {
    var game = new Mystery.Game();
};
