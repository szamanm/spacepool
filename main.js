enchant();


// @todo PM: make or import a vector (lib) here

//var VSprite = {};
//VSprite.__proto___ = Sprite;

Sprite.prototype.setPosV = function(vec_) {
	this.x = vec_.x;
	this.y = vec_.y;
};

Sprite.prototype.addToPosV = function(vec_) {
	console.log(vec_);
	this.x += vec_.x;
	this.y += vec_.y;
};

var world = {};


window.onload = function(){
    var game = new Core(960, 640);
    game.fps = 60;
    game.preload('background.png');
    game.onload = function(){
    	var background = new Sprite(960,640);
    	background.image = game.assets["background.png"];
    	game.rootScene.addChild(background);
    	
        var ball = new Sprite(50, 50);
        //ball.image = game.assets["chara1.png"];
        var surface = new Surface(50, 50);
        surface.context.beginPath();
        surface.context.arc(25, 25, 25, 0, Math.PI*2, true);
        surface.context.fillStyle = '#FFFF00';
        surface.context.fill();
        ball.image = surface;
        
        ball.x = 0;
        ball.y = 0;
        
        ball.speed = new Vec2(2,1);
        
        
        
        
        //ball.frame = 5;
        game.rootScene.addChild(ball);

        ball.addEventListener("enterframe", function(){
            //this.x += 1;
        	//this.x += this.speed.x;
        	//this.y += this.speed.y;
        	this.addToPosV(this.speed);
        	
        	
        	
            //this.frame = this.age % 2 + 6;
        });

        ball.addEventListener("touchstart", function(){
            game.rootScene.removeChild(ball);
        });
    };
    game.start();
};