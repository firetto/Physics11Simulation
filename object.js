var PIXI = require('pixi.js');
var p2 = require('p2');
var declarations = require('./declarations.js');
exports.Object = class extends p2.Body {
    constructor(_dim, _mass, _position, _velocity, projType) {
        
        super({
            mass: _mass,
            position: [_position.x, _position.y],
        });
        
        this.projectileType = projType;
        
        
        if (this.projectileType === "circle") {
            this.radius = _dim.x;
            this.addShape(new p2.Circle({
                radius: _dim.x, 
                material: declarations.surface_proj
            }));
        }
        else if (this.projectileType === "square") {
            this.dim = _dim;
            this.addShape(new p2.Box({
                width: _dim.x * 2,
                height: _dim.y * 2,
                material: declarations.surface_proj
            }));
        }
        
        declarations.world.addBody(this);
        this.graphics = new PIXI.Graphics();
        declarations.application.stage.addChild(this.graphics);
        this.damping = 0;
        this.shapes[0].material = declarations.surface_proj;
        this.velocity = [_velocity.x, _velocity.y];
        this.touched = false;
    }
    draw() {
        this.graphics.clear();
        this.graphics.lineStyle(2,0x000000, 1);
        this.graphics.beginFill(0xa9a9a9);
        if (this.projectileType === "circle") {
            this.graphics.drawCircle(this.radius, this.radius, this.radius);
            this.graphics.pivot.x = this.radius;
            this.graphics.pivot.y = this.radius;
        }
        else if (this.projectileType === "square") {
            this.graphics.drawRect(0,0,this.dim.x*2, this.dim.y*2);
            this.graphics.pivot.x = this.dim.x;
            this.graphics.pivot.y = this.dim.y;
        }
        //
        
        
        
        this.graphics.x = this.position[0];
        this.graphics.y = this.position[1];
        this.graphics.rotation = this.angle;
    }
}
exports.objects = [];