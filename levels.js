var PIXI = require('pixi.js');
var object = require('./object.js');
var declarations = require('./declarations.js');

function addCircle(rad, mas, pos) {
    object.objects.push(new object.Object(
        {x: rad, y: rad},
        mas,
        pos,
        {x:0,y:0},
        "circle"
    ));
}
function addRect(dim, mas, pos) {
    object.objects.push(new object.Object(
        dim,
        mas,
        pos,
        {x:0,y:0},
        "square"
    ));
}

function loadLevels() {
    switch (declarations.current_level) {
        case 0:
        for (var i = 0; i < 7; i++) {
            addRect({x:25, y:25}, 5, {x: 1000, y: 25+100*i});
            addRect({x:25, y:25}, 5, {x: 1200, y: 25+100*i});
            addRect({x:200, y:25}, 5, {x: 1100, y: 75+100*i});
        }
        break;

        case 1:
        for (var i = 0; i < 10; i++) {
            for (var a = 0; a < 4; a++) {
                addRect({x:30, y:30}, 50-i*4, {x: 900+a*60, y: 30+i*60});
            }
        }
        addRect({x: 120, y: 30}, 50, {x:1000, y:700});
        break;
        
        case 2:
        addRect({x:25, y: 50}, 5, {x: 900, y: 50});
        addRect({x:25, y:50}, 5, {x: 1100, y:50});
        addRect({x:250, y: 25}, 5, {x: 1000, y: 125});
        addRect({x:25, y: 50}, 5, {x: 850, y: 200});
        addRect({x:25, y: 50}, 5, {x: 1150, y: 200});
        addRect({x:250, y: 25}, 5, {x: 1000, y: 275});
        addRect({x: 50, y: 200}, 50, {x: 1000, y: 500});

        break;
        case 3:
        addRect({x:50, y: 250}, 50, {x: 900, y: 250});
        addCircle(100, 50, {x:900, y: 600});
        
        for (var i = 0; i < 5; i++) {
            addRect({x: 10, y: 50}, 3, {x: 1100, y: i*140+50});
            addRect({x: 10, y: 50}, 3, {x: 1300, y: i*140+50});
            addRect({x: 10, y: 50}, 3, {x: 1200, y: i*140+50});
            addRect({x: 120, y: 20}, 9, {x: 1200, y: i*140+120});
        }
        

        break;
    }   
}
exports.loadLevels = loadLevels;

