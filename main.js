enchant();


// @todo PM: make or import a vector (lib) here

//var VSprite = {};
//VSprite.__proto___ = Sprite;

Sprite.prototype.setPosV = function(vec_) {
	this.x = vec_.x;
	this.y = vec_.y;
};

Sprite.prototype.addToPosV = function(vec_) {
	this.x += vec_.x;
	this.y += vec_.y;
};


window.onload = function(){
    var game = new Core(world.size.x, world.size.y);
    game.fps = 60;
    world.init(game);
    game.preload('background.png');
    game.onload = function(){
    	var background = new Sprite(world.size.x,world.size.y);
    	background.image = game.assets["background.png"];
    	game.rootScene.addChild(background);
    
    	background.blacks = [];
    	
    	background.adb = function(e){
    		this.blacks[0] =e; 
    	},
    	background.tm = function(e){
    	    this.blacks[0] =e; 
    	},
        background.rmb = function(e){
            this.blacks = [];
        },
        background.addEventListener("enterframe", function(){
            //this.x += 0.1;
            //this.y += 0.1;
            
            
            for(var i=0; i<this.blacks.length; ++i) {
            	
               var c = new Vec2(this.blacks[i].x, this.blacks[i].y)
               var affected = world.findp(c, 460);
               for(var j=0; j<affected.length; ++j) {
            	   var to = c.subV(affected[j].pos.addS(affected[j].r));
            	   var tol = to.length();
            	   affected[j].speed = affected[j].speed.addV(to.mulS(50/(30+to.lengthSqr()) )); 
               }
            }
        });
    	
    	background.addEventListener('touchstart', background.adb);
        background.addEventListener('touchend', background.rmb);
        background.addEventListener('touchmove', background.tm);
		
    	
    	var b1 = new Ball(new Vec2(world.size.x * 0.1,world.size.y * 0.1),40,null);
        //var b2 = new Ball(new Vec2(world.size.x * 0.3,world.size.y * 0.8),40,{ballColor : "#FF3141"});
        //var b3 = new Ball(new Vec2(world.size.x * 0.5,world.size.y * 0.1),30,{ballColor : "#AA3F41"});
        //var b4 = new Ball(new Vec2(world.size.x * 0.7,world.size.y * 0.8),50,{ballColor : "#21A1F1"});
        var b5 = new Ball(new Vec2(world.size.x * 0.9,world.size.y * 0.5),40,{ballColor : "#FFFF41"});
    };
    game.start();
};