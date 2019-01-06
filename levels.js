var PIXI = require('pixi.js');
var object = require('./object.js');
var declarations = require('./declarations.js');

Level = class {
    constructor() {
        this.objects = [];
    }
    addCircle(rad, mas, pos, typ) {
        object.objects.push(new object.Object(
            {x: rad, y: rad},
            mas,
            pos,
            {x:0,y:0},
            typ
        ));
    }
    addRect(dim, mas, pos, typ) {
        object.objects.push(new object.Object(
            dim,
            mas,
            pos,
            {x:0,y:0},
            typ
        ));
    }
}
exports.Level = Level;
var levels = [];

function loadLevels() {
    for (var i = 0; i < declarations.level_count; i++) {
        levels.push(new Level());
    }
    switch (declarations.current_level) {
        case 0:
        for (var i = 0; i < 7; i++) {
            levels[0].addRect({x:25, y:25}, 5, {x: 1000, y: 25+100*i}, "square");
            levels[0].addRect({x:25, y:25}, 5, {x: 1200, y: 25+100*i}, "square");
            levels[0].addRect({x:200, y:25}, 5, {x: 1100, y: 75+100*i}, "square");
        }
        break;
        case 1:
        for (var i = 0; i < 10; i++) {
            for (var a = 0; a < 4; a++) {
                levels[1].addRect({x:30, y:30}, 50-i*4, {x: 900+a*60, y: 30+i*60}, "square");
            }
        }
        levels[1].addRect({x: 120, y: 30}, 50, {x:1000, y:700}, "square");
        break;
    }
}
exports.loadLevels = loadLevels;

