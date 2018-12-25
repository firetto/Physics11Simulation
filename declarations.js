var PIXI = require('pixi.js');
var p2 = require('p2');
const PIXELS_PER_METER = 50;
exports.PIXELS_PER_METER = PIXELS_PER_METER;
exports.world = new p2.World({
    gravity:[0,-9.81*PIXELS_PER_METER]
});

exports.framerate = 60;

var application = new PIXI.Application( {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    antialias: true,
});
exports.application = application;


exports.projectile_mass = 5;
exports.projectile_radius = 25;
exports.projectile_velocity = 8;

exports.surface_ball = new p2.Material();
exports.surface_ground = new p2.Material();