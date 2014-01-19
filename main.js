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
        var b2 = new Ball(new Vec2(800,600),40,{ballColor : "#FF3141"});
        var b3 = new Ball(new Vec2(100,200),30,{ballColor : "#AA3F41"});
        var b4 = new Ball(new Vec2(200,100),50,{ballColor : "#21A1F1"});
        var b5 = new Ball(new Vec2(530,200),40,{ballColor : "#FFFF41"});
    };
    game.start();
};