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
var application = declarations.application;
var world = declarations.world;

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

var groundShape = new p2.Plane({
    material: declarations.surface_ground
});
var wallShape = new p2.Plane();
var groundBody = new p2.Body({
    mass:0,
    position: [0, 0],
});
var wallBody = new p2.Body({
    mass:0,
    position: [application.renderer.width, 0],
    angle: Math.PI/2
});
wallBody.addShape(wallShape);
groundBody.addShape(groundShape);
world.addBody(groundBody);
world.addBody(wallBody);
application.stage.scale.y = -1;
application.stage.position.y = application.renderer.height;
world.addContactMaterial(new p2.ContactMaterial(declarations.surface_ball, declarations.surface_ground, {
    restitution: 0.2,
    friction: 0.7
}));

window.addEventListener("resize", function(event) { 
    application.renderer.resize(window.innerWidth, window.innerHeight); 
    wallBody.position[0] = application.renderer.width;
}); 
application.ticker.add(function() {
    world.step(1 / 60); 
    for (var i = 0; i < object.objects.length; i++) object.objects[i].draw();
    cann.draw();
});