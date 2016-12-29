$(document).ready(function () {
  // Canvas stuff
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  var w = $("#canvas").width();
  var h = $("#canvas").height();

  // Saving the snakes cell width in a variable for easy control.
  var cw = 10;

  var direction = "right"; //Sets default direction.

  // Canvas Styling
  // ctx.fillStyle = "white";
  // ctx.fillRect(0,0,w,h);
  // ctx.strokeStyle = "black";
  // ctx.strokeRect(0,0,w,h);

  // Snake
  var snakeArray; //An array of cells that make up the snake.

  createSnake();

  function createSnake() {
    var length = 5;
    snakeArray = [];

    for (var i = length -1; i >= 0; i--) {

      //This will create a horizontal snake starting from the top left.
      snakeArray.push({x:i, y:0})

    };
  };

  // Snake style
  function snakeStyle() {
    for (var i = 0; i < snakeArray.length; i++) {
      //To avoid the snake trail we need to paint the BG on every frame
      ctx.fillStyle = "white";
      ctx.fillRect(0,0,w,h);
      ctx.strokeStyle = "black";
      ctx.strokeRect(0,0,w,h);

      //The movement code for the snake to come here.
		    //The logic is simple
		      //Pop out the tail cell and place it infront of the head cell
      var newX = snakeArray[0].x;
      var newY = snakeArray[0].y;
      //These were the position of the head cell.
		  //We will increment it to get the new head position
      //Lets add proper direction based movement now
		  if (direction == 'right') newX++;
      else if (direction == 'left') newX--;
      else if (direction == 'up') newY--;
      else if (direction == 'down') newY++;



      var tail = snakeArray.pop();//pops out the last cell.
      tail.x = newX;
      snakeArray.unshift(tail);//puts back the tail as the first cell

      var color = snakeArray[i];
      ctx.fillStyle = "#F4743C";
      //Seting rectangles 10px by 10px.
      ctx.fillRect(color.x*cw, color.y*cw, cw, cw);
      ctx.strokeStyle = "white";
      ctx.strokeRect(color.x*cw, color.y*cw, cw, cw);
    };
  };
  snakeStyle();

  //Lets add the keyboard controls now
	$(document).keydown(function(e){
		var key = e.which;
		//We will add another clause to prevent reverse gear
		if(key == "37" && direction != "right") direction = "left";
		else if(key == "38" && direction != "directionown") direction = "up";
		else if(key == "39" && direction != "left") direction = "right";
		else if(key == "40" && direction != "up") direction = "down";
	})

  //Lets move the snake now using a timer which will trigger the paint function
	//every 300ms for testing

 var gameLoop = setInterval(snakeStyle, 300);

});
