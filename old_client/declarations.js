var PIXI = require('pixi.js');
exports.frictionCoefficient = 0.5;
exports.gravity = 9.80665;

exports.framerate = 60;

var application = new PIXI.Application( {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    antialias: true,
});
exports.application = application;