var PIXI = require('pixi.js');
var object = require('./object.js');
var declarations = require('./declarations.js');

function addCircle(rad, mas, pos, typ) {
    object.objects.push(new object.Object(
        {x: rad, y: rad},
        mas,
        pos,
        {x:0,y:0},
        typ
    ));
}
function addRect(dim, mas, pos, typ) {
    object.objects.push(new object.Object(
        dim,
        mas,
        pos,
        {x:0,y:0},
        typ
    ));
}

function loadLevels() {
    switch (declarations.current_level) {
        case 0:
        for (var i = 0; i < 7; i++) {
            addRect({x:25, y:25}, 5, {x: 1000, y: 25+100*i}, "square", declarations.projectileType);
            addRect({x:25, y:25}, 5, {x: 1200, y: 25+100*i}, "square", declarations.projectileType);
            addRect({x:200, y:25}, 5, {x: 1100, y: 75+100*i}, "square", declarations.projectileType);
        }
        break;

        case 1:
        for (var i = 0; i < 10; i++) {
            for (var a = 0; a < 4; a++) {
                addRect({x:30, y:30}, 50-i*4, {x: 900+a*60, y: 30+i*60}, "square", declarations.projectileType);
            }
        }
        addRect({x: 120, y: 30}, 50, {x:1000, y:700}, "square", declarations.projectileType);
        break;
        
        case 2:
        addRect({x:25, y: 50}, 5, {x: 900, y: 50}, "square", declarations.projectileType);
        addRect({x:25, y:50}, 5, {x: 1100, y:50}, "square", declarations.projectileType);
        addRect({x:250, y: 25}, 5, {x: 1000, y: 125}, "square", declarations.projectileType);
        addRect({x:25, y: 50}, 5, {x: 850, y: 200}, "square", declarations.projectileType);
        addRect({x:25, y: 50}, 5, {x: 1150, y: 200}, "square", declarations.projectileType);
        addRect({x:250, y: 25}, 5, {x: 1000, y: 275}, "square", declarations.projectileType);
        addRect({x: 50, y: 200}, 50, {x: 1000, y: 500}, "square", declarations.projectileType);
        break;
    }   
}
exports.loadLevels = loadLevels;

