/*var PIXI = require('pixi.js');
var p2 = require('p2');
var declarations = require('./declarations.js');
// Create a physics world, where bodies and constraints live
declarations.world = new p2.World({ gravity:[0, -9.81] });

var obj = new object.Object(1, 3, {x: 0, y: 50});

// Create an infinite ground plane.
var groundBody = new p2.Body({
    mass: 0 // Setting mass to 0 makes the body static
});
var groundShape = new p2.Plane();
groundBody.addShape(groundShape);
declarations.world.addBody(groundBody);
 
// To get the trajectories of the bodies,
// we must step the world forward in time.
// This is done using a fixed time step size.
var timeStep = 1 / 60; // seconds
 
// The "Game loop". Could be replaced by, for example, requestAnimationFrame.
declarations.application.ticker.add(function() {
 
    // The step method moves the bodies forward in time.
    declarations.world.step(timeStep);
 
    // Print the circle position to console.
    // Could be replaced by a render call.
    console.log("Circle y position: " + obj.position[1]);
 
});*/

var PIXI = require('pixi.js');
var object = require('./object.js');
var p2 = require('p2');
var declarations = require('./declarations.js');
var cannon = require('./cannon.js');
var levels = require('./levels.js');
var application = declarations.application;
var world = declarations.world;
var draggingCannon = declarations.draggingCannon;

var lastPosition = [0,0];
var currPosition = [0,0];

document.getElementById('game-wrapper').appendChild(application.view);

var cann = new cannon.Cannon();
document.getElementById('fire-button').onclick = function() {
    cann.fire();
};
cann.setAngle(45);
document.getElementById('velocity-input').oninput = function() {
    cann.setVelocity(this.value);
}
document.getElementById('angle-input').oninput = function() {
    cann.setAngle(this.value);
}
document.getElementById('height-input').oninput = function() {
    cann.setHeight(this.value);
}
document.getElementById('radius-input').oninput = function() {
    declarations.projectile_radius = this.value * declarations.PIXELS_PER_METER;
}
document.getElementById("length-input").oninput = function() {
    cann.setLength(this.value);
}

document.getElementById("projectile-type-input").oninput = function() {
    declarations.projectileShape = this.value;
}
document.getElementById("clear-button").onclick = function() {
    reset();
}
document.getElementById("level-input").oninput = function() {
    declarations.current_level = parseInt(this.value, 10);
    reset();
}
function reset() {
    for (var i = 0; i < object.objects.length; i++) {
        application.stage.removeChild(object.objects[i].graphics);
        world.removeBody(object.objects[i]);
    }
    object.objects.splice(0,object.objects.length);
    levels.loadLevels();
}
var groundShape = new p2.Plane({
    material: declarations.surface_ground
});
var wallShape = new p2.Plane({material:declarations.surface_ground});
var groundBody = new p2.Body({
    mass:0,
    position: [0, 0],
});
var wallBody = new p2.Body({
    mass:0,
    position: [application.renderer.width, 0],
    angle: Math.PI/2
});
var leftWallBody = new p2.Body({
    mass:0,
    position:[0,0],
    angle: Math.PI*1.5
});
wallBody.addShape(wallShape);
groundBody.addShape(groundShape);
leftWallBody.addShape(new p2.Plane({material:declarations.surface_ground}));
world.addBody(groundBody);
//world.addBody(wallBody);
world.addBody(leftWallBody);
application.stage.scale.y = -1;
application.stage.position.y = application.renderer.height;
world.addContactMaterial(new p2.ContactMaterial(declarations.surface_proj, declarations.surface_ground, {
    restitution: 0.3,
    friction: 1.5
}));
world.addContactMaterial(new p2.ContactMaterial(declarations.surface_proj, declarations.surface_proj, {
    friction: 10
}));

document.getElementById("bounce-input").oninput = function() {
    world.contactMaterials[0].restitution = this.value;
    console.log(world.contactMaterials[0].restitution);
}

window.addEventListener("resize", function(event) { 
    application.renderer.resize(window.innerWidth, window.innerHeight); 
    wallBody.position[0] = application.renderer.width;
}); 
var startTime = Date.now();
var endTime, timeDiff;
var timeStep = 1/60, maxSubSteps = 10, lastTime;
levels.loadLevels();
application.ticker.add(function() {
    delta = Date.now() - startTime;
    startTime = Date.now();
    //var dt = t !== undefined && lastTime !== undefined ? t / 1000 - lastTime : 0;
    world.step(timeStep, delta/1000, maxSubSteps);
   // lastTime = t / 1000;
    for (var i = 0; i < object.objects.length; i++) {
        object.objects[i].draw();
        if (i != object.objects.length-1) object.objects[i].world.on('beginContact', function(){});
    }
    if (object.objects.length > 0) {
        document.getElementById("clear-button").style.display="block";
        object.objects[object.objects.length - 1].world.on('beginContact', function () {
            if (!object.objects[object.objects.length - 1].touched) {
                lastPosition = object.objects[object.objects.length - 1].position;
                document.getElementById('last-projectile-distance').innerHTML = lastPosition[0];
                document.getElementById('last-projectile-distance-wrapper').style.left = lastPosition[0] + "px";
                if(object.objects[object.objects.length-1].projectileType === "cannon_object") {
                    object.objects[object.objects.length - 1].touched = true;
                }
            }
        });
    }
    else {
        document.getElementById("clear-button").style.display="none";
    }
    cann.draw();
});