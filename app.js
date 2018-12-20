var PIXI = require('pixi.js');
var declarations = require('./declarations.js');
var application = declarations.application;
var object = require('./object.js');
var cannon = require('./cannon.js');

window.addEventListener("resize", function(event) { 
    application.renderer.resize(window.innerWidth, window.innerHeight); 
});
document.getElementById('game-wrapper').appendChild(application.view);

var cann = new cannon.Cannon();
document.getElementById('fire-button').onclick = function() {
    cann.fire();
};
cann.setAngle(-45);
document.getElementById('velocity-slider').oninput = function() {
    cann.setVelocity(this.value);
}
document.getElementById('angle-input').oninput = function() {
    cann.setAngle(-this.value);
}
setInterval(function() {
    cann.draw();
    for (var i = 0; i < object.objects.length; i++) {
        object.objects[i].update();
        object.objects[i].draw();
        if (object.objects[i].onGround) {
            application.stage.removeChild(object.objects[i].graphics);
            object.objects.splice(i, 1);
        }
    }
}, 1000/declarations.framerate);