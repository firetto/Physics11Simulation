var PIXI = require('pixi.js');
var p2 = require('p2');
var declarations = require('./declarations.js');
exports.Object = class extends p2.Body {
    constructor(_rad, _mass, _position, _velocity) {
        
        super({
            mass: _mass,
            position: [_position.x, _position.y],
        });
        this.radius = _rad;
        
        this.addShape(new p2.Circle({
            radius: _rad, 
            material: declarations.surface_ball
        }));
        /*this.addShape(new p2.Box({
            width: _rad*2,
            height: _rad*2,
            material: declarations.surface_ball
        }))*/
        declarations.world.addBody(this);
        this.graphics = new PIXI.Graphics();
        declarations.application.stage.addChild(this.graphics);
        this.damping = 0.1;
        this.shapes[0].material = declarations.surface_ball;
        this.velocity = [_velocity.x, _velocity.y];
        this.touched = false;
    }
    draw() {
        this.graphics.clear();
        this.graphics.lineStyle(2,0x000000, 1);
        this.graphics.beginFill(0xa9a9a9);
        this.graphics.drawCircle(this.radius, this.radius, this.radius);
        //this.graphics.drawRect(0,0,this.radius*2, this.radius*2);
        
        this.graphics.pivot.x = this.radius;
        this.graphics.pivot.y = this.radius;
        this.graphics.x = this.position[0];
        this.graphics.y = this.position[1];
        this.graphics.rotation = this.angle;
    }
}
exports.objects = [];