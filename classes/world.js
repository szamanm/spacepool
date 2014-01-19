var world = (function(){
	this.init = function(game){
		this.game = game;
	};
	this.game;
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
	return this;
})();