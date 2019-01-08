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
        this.barrelThickness = 0.8;
        this.barrelLength = 4;
        this.graphics.x = 20;
        this.setHeight(0);
    }
    draw() {
        this.graphics.clear();
        this.graphics.lineStyle(3, 0x000000, 1);
        this.graphics.beginFill(0x303030);
        this.graphics.drawRoundedRect(0,0, this.barrelLength*declarations.PIXELS_PER_METER, this.barrelThickness*declarations.PIXELS_PER_METER, 3);

        this.graphics.pivot.y = this.barrelThickness / 2;
        this.graphics.rotation = this.angle;
    }
    fire() {
        let pos = {
            x: this.graphics.x + this.barrelLength*declarations.PIXELS_PER_METER*Math.cos(this.angle), 
            y: this.graphics.y + this.barrelLength*declarations.PIXELS_PER_METER*Math.sin(this.angle)
        }
        let velocity = {
            x: this.velocity*declarations.PIXELS_PER_METER*Math.cos(this.angle),
            y: this.velocity*declarations.PIXELS_PER_METER*Math.sin(this.angle)
        }
        object.objects.push(new object.Object({x: declarations.projectile_radius, y: declarations.projectile_radius}, declarations.projectile_mass*declarations.projectile_radius, pos, velocity, declarations.projectileShape, "cannon_object"));
        
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
    setLength(length) {
        this.barrelLength = length;
    }
}