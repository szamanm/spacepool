   var Ball = Class.create(Sprite, {
      initialize: function(radius) { 
          Sprite.call(this, radius*2, radius*2); 
          this.image = core.assets['ball.gif'];
       }
    });




