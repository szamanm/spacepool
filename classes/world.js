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
		        
			if(b.pos.subV(this.balls[i].pos).lengthSqr() < Math.sqrt(b.r + this.balls[i].r)){
				retAr.push(this.balls[i]);
				alert('a');
			}
		};
		return retAr;
	};
	return this;
})();