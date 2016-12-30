$(document).ready(function () {
  // Canvas stuff
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  var w = $("#canvas").width();
  var h = $("#canvas").height();

  // Saving the snakes cell width in a variable for easy control.
  var cw = 10;
  var direction;
  var food;
  var score;

  // Snake
  var snakeArray; //An array of cells that make up the snake.

  function init() {

      direction = "right"; //Sets default direction.
      createSnake();
      createFood();
      score = 0;

      //Lets move the snake now using a timer which will trigger the paint function
  //every 200ms
      if(typeof gameLoop != "undefined") clearInterval(gameLoop);
  gameLoop = setInterval(snakeStyle, 100);
  }

  init();

  function createSnake() {
    var length = 5;
    snakeArray = [];

    for (var i = length -1; i >= 0; i--) {

      //This will create a horizontal snake starting from the top left.
      snakeArray.push({x:i, y:0})

    };
  };

  // Food
  function createFood() {
    food = {
      x: Math.round(Math.random()*(w-cw)/cw),
      y: Math.round(Math.random()*(h-cw)/cw),
      //This will create a cell with x/y between 0-44
		//Because there are 45(450/10) positions accross the rows and columns
    }
  }

  // Snake style
  function snakeStyle() {

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

      //This will restart the game if the snake hits the wall
      if (newX == -1 || newX == w/cw || newY == -1 || newY == h/cw || checkCollision(newX, newY, snakeArray)) {

        init();
        //restarts game
        return;
      }

      //Lets write the code to make the snake eat the food
      //The logic is simple
      //If the new head position matches with that of the food,
      //Create a new head instead of moving the tail

      if (newX == food.x && newY == food.y) {
        var tail = {x: newX, y: newY};
        score++;
        //create new food
        createFood();
      }
      else {
        {
          var tail = snakeArray.pop();//pops out the last cell.
          tail.x = newX;
          tail.y = newY;
        }
      }

      snakeArray.unshift(tail);//puts back the tail as the first cell

    for (var i = 0; i < snakeArray.length; i++) {

      var color = snakeArray[i];
      ctx.fillStyle = "#F4743C";
      ctx.fillRect(color.x*cw, color.y*cw, cw, cw);
      ctx.strokeStyle = "white";
      ctx.strokeRect(color.x*cw, color.y*cw, cw, cw);
    };
    //food style
    styleCells(food.x, food.y);
    var scoreText = "Score: " + score;
    ctx.fillText(scoreText, 5, h-5);
  };
  snakeStyle();

  //generic function to draw cells
  function styleCells(x,y) {

    ctx.fillStyle = "blue";
    ctx.fillRect(x*cw, y*cw, cw, cw);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x*cw, y*cw, cw, cw);
  };

  function checkCollision(x, y, array){
    //This function will check if the provided x/y coordinates exist
    //in an array of cells or not
    for (var i = 0; i < array.length; i++) {
      if (array[i].x == x && array[i].y == y)
        return true;
    };
    return false;
  };

  //Lets add the keyboard controls now
	$(document).keydown(function(e){
		var key = e.which;
		//We will add another clause to prevent reverse gear
		if(key == "37" && direction != "right") direction = "left";
		else if(key == "38" && direction != "directionown") direction = "up";
		else if(key == "39" && direction != "left") direction = "right";
		else if(key == "40" && direction != "up") direction = "down";
	})


});
