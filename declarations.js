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


exports.projectile_mass = 0.2;
exports.projectile_radius = PIXELS_PER_METER / 3;
exports.projectile_velocity = 8;
exports.current_level = 0;
exports.level_count = 4;

exports.surface_proj = new p2.Material();
exports.surface_ground = new p2.Material();
exports.draggingCannon = false;
exports.rotatingCannon = false;
exports.cannonDragPos = [0,0];
exports.projectileType = "circle";