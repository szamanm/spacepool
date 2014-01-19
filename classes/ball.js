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
        	var coliding = world.find(this);
        	//lower 
        	this.futureSpeed = this.futureSpeed.mulS(TOUCH_MOVE_FADER);
        	if(coliding.length == 1)
        	   var a;
            this.pos = this.pos.addV(this.speed);
            world.keepInBounds(this);
        });
        world.add(this);
        
        this.addEventListener('touchstart', this.startMove);
        this.addEventListener('touchmove', this.moveByUI);
        this.addEventListener('touchend', this.setNewSpeed);
	},
	startMove : function(e){
	    this.speed = new Vec2(0,0);
        this.futureSpeed = new Vec2(0,0);
        this.moveByUI(e);
	},
	moveByUI: function(e){
	    this.movePrev = this.pos;
	    var newPos = new Vec2(e.x - this.r, e.y - this.r);
        this.futureSpeed = this.futureSpeed.addV(newPos.subV(this.pos).mulS(TOUCH_INFLUENCE_FACTOR));
        this.pos = newPos;
	},
    setNewSpeed: function(e){
        this.speed = this.futureSpeed;
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
});

*/