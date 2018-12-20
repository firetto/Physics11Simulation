var object = require('./object.js');
var declarations = require('./declarations.js');
var application = declarations.application;
var PIXI = require('pixi.js');

exports.Cannon = class {
    constructor() {
        this.graphics = new PIXI.Graphics();
        application.stage.addChild(this.graphics);
        this.angle = 0;
        this.height = 0;
        this.velocity = 10;
        this.barrelThickness = 40;
        this.barrelLength = 200;
        this.graphics.x = 20;
        this.graphics.y = application.renderer.height - this.height - this.barrelThickness - 5;
    }
    draw() {
        this.graphics.lineStyle(3, 0x000000, 1);
        this.graphics.beginFill(0x303030);
        this.graphics.drawRoundedRect(0,0, this.barrelLength, this.barrelThickness, 3);

        this.graphics.pivot.y = this.barrelThickness / 2;
        this.graphics.rotation = this.angle;
    }
    fire() {
        let pos = {
            x: this.graphics.x + this.barrelLength*Math.cos(this.angle), 
            y: this.graphics.y + this.barrelLength*Math.sin(this.angle)
        }
        let velocity = {
            x: this.velocity*Math.cos(this.angle),
            y: this.velocity*Math.sin(this.angle)
        }
        object.objects.push(new object.Object(2, pos, velocity));
        
    }
    setAngle(deg) {
        this.angle = deg*Math.PI / 180;
    }
    setVelocity(vel) {
        this.velocity = vel;
    }
}