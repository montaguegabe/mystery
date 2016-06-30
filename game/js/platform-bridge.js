'use strict'

// Detect engine/wrapping
var isCocoonJS = (typeof navigator['isCocoonJS'] !== "undefined");
var isElectron = window && window.process && window.process.type; // is V8
