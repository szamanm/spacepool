var TOUCH_INFLUENCE_FACTOR = 0.3;
var TOUCH_MOVE_FADER = 0.7;

var Ball = Class.create(Sprite, {
	initialize : function(pos, r, owner) {
		Sprite.call(this, r * 2, r * 2);

		this.r = r;
		this.owner = owner;
		this.speed = new Vec2(0, 0);
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
                    
                    var vn = n.mulS(n.dot(v));
                    var vt = vn.subV(v);
                    
                    var van = n.mulS(n.dot(va));
                    var vat = van.subV(va);
                    
                    var m = this.r*this.r;
                    var ma = a.r*a.r;
                    
                    var nvn = vn.mulS(m-ma).addV(van.mulS(2*ma));
                    nvn = nvn.divS(m+ma);
                    
                    var nvan = van.mulS(ma-m).addV(vn.mulS(2*m));
                    nvan = nvan.divS(m+ma);
                    
                    this.speed = vt.addV(nvn);
                    this.pos = this.pos.addV(this.speed.mulS(2));
                    
                    a.speed = vat.subV(nvan);
                    a.pos = a.pos.addV(a.speed.mulS(2));
                    a.colidedWith.push(this);
                }
            }
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
	m : 0,
	owner : null
});
//TODO
/*Ball.__defineSetter("r", function(val) {
	this.r = r;
});
Ball.__defineSetter("m", function(val) {
	this.m = val;
});*/