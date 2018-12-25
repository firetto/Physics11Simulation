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
        this.velocity = declarations.projectile_velocity;
        this.barrelThickness = 40;
        this.barrelLength = 200;
        this.graphics.x = 20;
        this.setHeight(0);
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
            x: this.velocity*declarations.PIXELS_PER_METER*Math.cos(this.angle),
            y: this.velocity*declarations.PIXELS_PER_METER*Math.sin(this.angle)
        }
        object.objects.push(new object.Object(declarations.projectile_radius, declarations.projectile_radius, pos, velocity));
        
    }
    setAngle(deg) {
        this.angle = deg*Math.PI / 180;
    }
    setVelocity(vel) {
        this.velocity = vel;
    }
    setHeight(height) {
        this.height = height*declarations.PIXELS_PER_METER;
        this.graphics.y = this.height;
    }
}