  function getWidth()
  {
    xWidth = null;
    if(window.screen != null)
      xWidth = window.screen.availWidth;

    if(window.innerWidth != null)
      xWidth = window.innerWidth;

    if(document.body != null)
      xWidth = document.body.clientWidth;

    return xWidth;
  }
function getHeight() {
  xHeight = null;
  if(window.screen != null)
    xHeight = window.screen.availHeight;

  if(window.innerHeight != null)
    xHeight =   window.innerHeight;

  if(document.body != null)
    xHeight = document.body.clientHeight;

  return xHeight;
}


var world = (function(){
	this.init = function(game){
		this.game = game;
	};
	this.game;
	this.size = new Vec2(getWidth(),window.getHeight());
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
	
	this.findp = function(p, r){
		var retAr = [];
		for(var i = 0; i<this.balls.length; i++){
		    var c1 = p;
		    var c2 = this.balls[i].pos.addS(this.balls[i].r);
			if(c1.subV(c2).lengthSqr() < (r + this.balls[i].r) *(r + this.balls[i].r)){
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