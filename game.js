'use strict';
class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.previousFood = new Food(0, 0);
    this.score = new Score();
  }
  get isFoodIngested() {
    const [foodX, foodY] = this.food.position;
    const [snakeX, snakeY] = this.snake.head;
    return foodX == snakeX && foodY == snakeY;
  }
  makeNewFood() {
    const foodColId = Math.floor(Math.random() * NUM_OF_COLS);
    const foodCellId = Math.floor(Math.random() * NUM_OF_ROWS);
    this.previousFood = this.food;
    this.food = new Food(foodColId, foodCellId);
  }
  turnSnake() {
    this.snake.turnLeft();
  }
  getDetails() {
    const details = {};
    details.snake = this.snake;
    details.ghostSnake = this.ghostSnake;
    details.food = this.food;
    details.previousFood = this.previousFood;
    return details;
  }
  update() {
    this.snake.move();
    this.ghostSnake.move();
    if (this.isFoodIngested) {
      this.makeNewFood();
      this.snake.grow();
      this.score.count(1);
    }
    displayScore(this.score);
  }
  randomlyTurnSnake() {
    let x = Math.random() * 100;
    if (x > 50) {
      this.ghostSnake.turnLeft();
    }
  }
}
