var declarations = require('./declarations.js');
var application = declarations.application;
var PIXI = require('pixi.js');
exports.Object = class {
    constructor(mass, pos, velocity) {
        this.mass = mass;
        this.graphics = new PIXI.Graphics();
        this.x = pos.x;
        this.y = pos.y;
        this.onGround = false;
        this.totalDistance = 0;
        this.force = {
            gravity: 0,
            friction: {
                x: 0,
                y: 0
            },
            normal: {
                x: 0,
                y: 0
            },
        }
        this.gpe = 0;
        this.ke = {
            x: 0,
            y: 0,
        };
        this.te = 0;
        
        this.velocity = {
            x: velocity.x,
            y: velocity.y
        }
        this.radius = 20;
        application.stage.addChild(this.graphics);
    }
    update(delta) {
        this.gpe = this.mass*declarations.gravity*(application.renderer.height-this.y);
        this.ke.y = this.mass * Math.pow(this.velocity.y,2) / 2;
        this.te = this.gpe + this.ke.y;
        console.log(this.velocity.y);
        this.velocity.y += declarations.gravity*delta;
        this.x += this.velocity.x;
        this.totalDistance += this.velocity.x;
        this.y += this.velocity.y;

        if (this.y + this.radius >= application.renderer.height) {
            this.velocity.y = 0;
            this.y = application.renderer.height - this.radius;
            this.velocity.x = 0;
            this.onGround = true;
        }
    }
    draw() {
        this.graphics.lineStyle(2,0x000000, 1);
        this.graphics.beginFill(0xa9a9a9);
        this.graphics.drawCircle(this.radius, this.radius, this.radius);

        this.graphics.pivot.x = this.radius;
        this.graphics.pivot.y = this.radius;
        this.graphics.x = this.x;
        this.graphics.y = this.y;
    }
}
var objects = []; 
exports.objects = objects;