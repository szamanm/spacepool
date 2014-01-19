var world = (function(){
	this.init = function(game){
		this.game = game;
	};
	this.game;
	this.size = new Vec2(960,720);
	this.balls = [];
	this.add = function(b){
		this.balls.push(b);
		this.game.rootScene.addChild(b);
	};
	this.find = function(b){
		var retAr = [];
		for(var i = 0; i<this.balls.length; i++){
		    if(this.balls[i] == b)
		        continue;
		    var c1 = b.pos.addS(b.r);
		    var c2 = this.balls[i].pos.addS(this.balls[i].r);
			if(c1.subV(c2).lengthSqr() < (b.r + this.balls[i].r) *(b.r + this.balls[i].r)){
				retAr.push(this.balls[i]);
			}
		};
		return retAr;
	};
	this.keepInBounds = function(b){
	   if(b.pos.x + (2*b.r) > this.size.x)
           b.pos = b.pos.subV(new Vec2(this.size.x + (b.r*2),0));
       if(b.pos.y + (2*b.r) > this.size.y)
           b.pos = b.pos.subV(new Vec2(0,this.size.y + (b.r*2)));
       if(b.pos.x + (2*b.r) < 0)
           b.pos = b.pos.addV(new Vec2(this.size.x + (b.r*2),0));
       if(b.pos.y + (2*b.r) < 0)
           b.pos = b.pos.addV(new Vec2(0,this.size.y + (b.r*2)));
	};
	return this;
})();