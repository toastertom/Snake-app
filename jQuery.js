$(document).ready(function () {
  // Canvas setup
  const canvas = $("#canvas")[0];
  const ctx = canvas.getContext("2d");
  const width = $("#canvas").width();
  const height = $("#canvas").height();

  // Constants and game variables
  const cellSize = 10;
  const initialSnakeLength = 5;
  const snakeSpeed = 100;
  let direction = "right";
  let food;
  let score;
  let snakeArray = [];
  let gameLoop;

  // Initialize game
  const init = () => {
    direction = "right";
    createSnake();
    createFood();
    score = 0;
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(updateGame, snakeSpeed);
  };

  // Create the snake
  const createSnake = () => {
    snakeArray = [];
    for (let i = initialSnakeLength - 1; i >= 0; i--) {
      snakeArray.push({ x: i, y: 0 });
    }
  };

  // Create food at a random position
  const createFood = () => {
    food = {
      x: Math.floor(Math.random() * (width / cellSize)),
      y: Math.floor(Math.random() * (height / cellSize)),
    };
  };

  // Update the game state
  const updateGame = () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, width, height);

    // Calculate new head position
    let newX = snakeArray[0].x;
    let newY = snakeArray[0].y;

    if (direction === "right") newX++;
    else if (direction === "left") newX--;
    else if (direction === "up") newY--;
    else if (direction === "down") newY++;

    // Check for collisions (wall or self)
    if (
      newX < 0 ||
      newX >= width / cellSize ||
      newY < 0 ||
      newY >= height / cellSize ||
      checkCollision(newX, newY, snakeArray)
    ) {
      init();
      return;
    }

    // Check if the snake eats the food
    let tail;
    if (newX === food.x && newY === food.y) {
      tail = { x: newX, y: newY };
      score++;
      createFood();
    } else {
      tail = snakeArray.pop();
      tail.x = newX;
      tail.y = newY;
    }

    snakeArray.unshift(tail);

    // Draw the snake
    for (const cell of snakeArray) {
      drawCell(cell.x, cell.y, "#00FF01", "white");
    }

    // Draw the food
    drawCell(food.x, food.y, "red", "white");

    // Draw the score
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, 5, height - 5);
  };

  // Draw a single cell
  const drawCell = (x, y, fillColor, strokeColor) => {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
  };

  // Check for collisions
  const checkCollision = (x, y, array) => {
    return array.some(cell => cell.x === x && cell.y === y);
  };

  // Keyboard controls
  $(document).keydown((e) => {
    const key = e.which;
    if (key === 37 && direction !== "right") direction = "left";
    else if (key === 38 && direction !== "down") direction = "up";
    else if (key === 39 && direction !== "left") direction = "right";
    else if (key === 40 && direction !== "up") direction = "down";
  });

  // Start the game
  init();
});
