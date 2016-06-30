//
// platform-bridge.js: Global definitions here that give information about the
// current running environment. Can be accessed from anywhere: See corresponding
// typings file
//

'use strict'

// May be used in any game Typescript
var isCocoonJS = (typeof navigator['isCocoonJS'] !== "undefined");
var isElectron = window && window.process && window.process.type; // is V8
var isWeb = !isCocoonJS && !isElectron; // is V8
