'use strict';

const areCellsSimilar = (cell1, cell2) => {
  const [cell1X, cell1Y] = cell1;
  const [cell2X, cell2Y] = cell2;
  return cell1X == cell2X && cell1Y == cell2Y;
};

class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.previousFood = new Food(0, 0);
    this.score = new Score();
  }
  get isFoodIngested() {
    return areCellsSimilar(this.food.position, this.snake.head);
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
  isOnUpperBorder() {
    const topRow = -1;
    return this.snake.head[1] == topRow;
  }
  isOnLowerBorder() {
    return this.snake.head[1] == NUM_OF_ROWS;
  }
  isOnLeftBorder() {
    const firstCol = -1;
    return this.snake.head[0] == firstCol;
  }
  isOnRightBorder() {
    return this.snake.head[0] == NUM_OF_COLS;
  }
  hasTouchedBorder() {
    const isOnRow = this.isOnUpperBorder() || this.isOnLeftBorder();
    const isOnCol = this.isOnRightBorder() || this.isOnLowerBorder();
    return isOnRow || isOnCol;
  }
  hasTouchedItself() {
    const positionList = this.snake.location.slice(0, -1);
    return positionList.some(areCellsSimilar.bind(null, this.snake.head));
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
  isOver() {
    return this.hasTouchedBorder() || this.hasTouchedItself();
  }
  randomlyTurnSnake() {
    let x = Math.random() * 100;
    if (x > 50) {
      this.ghostSnake.turnLeft();
    }
  }
}