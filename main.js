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

Sprite.prototype.posVec = new Vec2(0,0);
Sprite.prototype.__defineGetter__("pos",function(){
	this.posVec.x = this.x;
	this.posVec.y = this.y;
	return this.posVec;
});

Sprite.prototype.__defineSetter__("pos",function(val){
	this.x = val.x;
	this.y = val.y;
});

window.onload = function(){
    var game = new Core(960, 640);
    game.fps = 60;
    game.preload('background.png');
    game.onload = function(){
    	var background = new Sprite(960,640);
    	background.image = game.assets["background.png"];
    	game.rootScene.addChild(background);
    	
    	var b1 = new Ball(new Vec2(0,0),10,null);
        b1.speed = new Vec2(2,1);
        game.rootScene.addChild(b1);
        
        var b2 = new Ball(new Vec2(800,420),10,null);
        b2.speed = new Vec2(-2,-1);
        game.rootScene.addChild(b2);
    };
    game.start();
};