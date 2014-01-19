var TOUCH_INFLUENCE_FACTOR = 0.3;
var TOUCH_MOVE_FADER = 0.7;

var Ball = Class.create(Sprite, {
	initialize : function(pos, r, owner) {
		Sprite.call(this, r * 2, r * 2);

		this.r = r;
		this.owner = owner;
		this.speed = new Vec2(0, 0);
		this.colidedWith = [];
		var surface = new Surface(2*r, 2*r);
		surface.context.beginPath();
		surface.context.arc(r, r, r, 0, Math.PI * 2);
		if(owner)
			surface.context.fillStyle = owner.ballColor;
		else
			surface.context.fillStyle = "#F3A312";
		surface.context.fill();
		this.image = surface;

		this.pos = pos;


        this.addEventListener("enterframe", function(){
            //lower 
            this.futureSpeed = this.futureSpeed.mulS(TOUCH_MOVE_FADER);
            this.pos = this.pos.addV(this.speed);
            world.keepInBounds(this);

            this.pos = this.pos.addV(this.speed);
            var col = world.find(this);
            if(col.length > 0) {
                for (var i = 0; i < col.length; ++i) {
                    var a = col[i];  // another ball
                    
                    if (this.colidedWith.indexOf(a) > 0)
                        continue;
                    
                    var c = this.pos.addS(this.r);   // center of this ball
                    var ca = a.pos.addS(a.r);   // center of another ball
                    var n = ca.subV(c);
                    n.normalize();
                    
                    var v = this.speed;
                    var va = a.speed;
                    
                    //var vn = n.mulS(n.dot(v));
                    //var vt = vn.subV(v);
                    
                    //var van = n.mulS(n.dot(va));
                    //var vat = van.subV(va);
                    
                    var m = this.r*this.r;
                    var ma = a.r*a.r;
                    
                    var pen = c.subV(ca).length() - this.r - a.r;
                    //pen = pen*pen; //Math.abs(pen);
                    //pen = Math.abs(pen);
                    //pen = 10 + Math.pow(pen, 1.9);
                    pen = 15 + pen*pen;
                    
                    var j = n.mulS((m+ma)*pen*0.0005);
                    this.speed = this.speed.subV(j.divS(m*1.2));
                    a.speed = a.speed.addV(j.divS(ma*1.2));
                    
                    /*
                    var nvn = vn.mulS(m-ma).addV(van.mulS(2*ma));
                    nvn = nvn.divS(m+ma);
                    
                    var nvan = van.mulS(ma-m).addV(vn.mulS(2*m));
                    nvan = nvan.divS(m+ma);
                    
                    this.speed = vt.addV(nvn);
                    this.pos = this.pos.addV(this.speed.mulS(2));
                    
                    a.speed = vat.subV(nvan);
                    a.pos = a.pos.addV(a.speed.mulS(2));
                    */
                    
                    a.colidedWith.push(this);
                }
            }

            this.speed = this.speed.mulS(this.speed.lengthSqr() > this.r ? 0.8 : 0.999999);
            this.colidedWith = [];
        });
        world.add(this);
        this.addEventListener('touchmove', this.moveByUI);
        this.addEventListener('touchend', this.setNewSpeed);
	},
	moveByUI: function(e){
	    this.movePrev = this.pos;
        this.speed = new Vec2(0,0);
	    var newPos = new Vec2(e.x - this.r, e.y - this.r);
        this.futureSpeed = this.futureSpeed.addV(newPos.subV(this.pos).mulS(TOUCH_INFLUENCE_FACTOR));
        this.pos = newPos;
	},
    setNewSpeed: function(e){
        this.speed = this.futureSpeed;
        this.futureSpeed = new Vec2(0,0);
    },
	futureSpeed : new Vec2(0,0),
	movePrev : new Vec2(0,0),
	r : 0,
	collidedWith : [],
	owner : null
});
