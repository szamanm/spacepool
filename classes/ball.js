var Ball = Class.create(Sprite, {
	initialize : function(pos, r, owner) {
		Sprite.call(this, r * 2, r * 2);

		this.r = r;
		this.owner = owner;
		this.speed = Vec2(0, 0);
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
        	if(coliding.length == 1)
        	   var a;
            this.pos = this.pos.addV(this.speed);
        });
        world.add(this);
	},
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