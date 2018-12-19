var PIXI = require('pixi.js');

var application = new PIXI.Application( {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    antialias: true,
});
window.addEventListener("resize", function(event) { 
    application.renderer.resize(window.innerWidth, window.innerHeight); 
});
document.body.appendChild(application.view);
setInterval(function() {

}, 1000/60);