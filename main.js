enchant();


// @todo PM: make or import a vector (lib) here

//var VSprite = {};
//VSprite.__proto___ = Sprite;

//Sprite.prototype.setPos = function()


window.onload = function(){
    var game = new Core(320, 320);
    game.fps = 60;
    game.preload("chara1.png");
    game.onload = function(){
        var ball = new Sprite(50, 50);
        ball.image = game.assets["chara1.png"];
        var surface = new Surface(50, 50);
        surface.context.beginPath();
        surface.context.arc(25, 25, 25, 0, Math.PI*2, true);
        surface.context.fill();
        ball.image = surface;
        
        ball.x = 0;
        ball.y = 0;
        
        ball.speed = {};
        ball.speed.x = 2;
        ball.speed.y = 1;
        
        //ball.frame = 5;
        game.rootScene.addChild(ball);

        ball.addEventListener("enterframe", function(){
            //this.x += 1;
        	this.x += this.speed.x;
        	this.y += this.speed.y;
        	
            //this.frame = this.age % 2 + 6;
        });

        ball.addEventListener("touchstart", function(){
            game.rootScene.removeChild(ball);
        });
    };
    game.start();
};