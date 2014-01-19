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
    var game = new Core(960, 640);
    game.fps = 60;
    world.init(game);
    game.preload('background.png');
    game.onload = function(){
    	var background = new Sprite(world.size.x,world.size.y);
    	background.image = game.assets["background.png"];
    	game.rootScene.addChild(background);
    	
    	var b1 = new Ball(new Vec2(400,200),40,null);
        b1.speed = new Vec2(1,1);
        
        var b2 = new Ball(new Vec2(800,600),40,null);
        b2.speed = new Vec2(-1,-0.8);
    };
    game.start();
};