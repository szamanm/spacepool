enchant();

window.onload = function(){
    var game = new Core(320, 320);
    game.fps = 15;
    game.preload("chara1.png");
    game.onload = function(){
        var ball = new Sprite(32, 32);
        ball.image = game.assets["chara1.png"];
        ball.x = 0;
        ball.y = 0;
        ball.frame = 5;
        game.rootScene.addChild(ball);

        ball.addEventListener("enterframe", function(){
            this.x += 1;
            this.frame = this.age % 2 + 6;
        });

        ball.addEventListener("touchstart", function(){
            game.rootScene.removeChild(ball);
        });
    };
    game.start();
};