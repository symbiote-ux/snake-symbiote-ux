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
  isFoodIngested(snake) {
    return areCellsSimilar(this.food.position, snake.head);
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
  hasTouchedBorder(snake) {
    const isOnUpperBorder = snake.isOnRow(-1);
    const isOnLowerBorder = snake.isOnRow(NUM_OF_ROWS);
    const isOnLeftBorder = snake.isOnCol(-1);
    const isOnRightBorder = snake.isOnCol(NUM_OF_COLS);
    return (
      isOnUpperBorder || isOnLowerBorder || isOnLeftBorder || isOnRightBorder
    );
  }
  hasTouchedItself() {
    const positionList = this.snake.location.slice(0, -1);
    return positionList.some(areCellsSimilar.bind(null, this.snake.head));
  }
  hasTouchGhost() {
    return this.ghostSnake.location.some(
      areCellsSimilar.bind(null, this.snake.head)
    );
  }
  update() {
    this.snake.move();
    this.ghostSnake.move();
    const hasSnakeEatFood = this.isFoodIngested(this.snake);
    const hasGhostSnakeEatFood = this.isFoodIngested(this.ghostSnake);
    if (hasSnakeEatFood || hasGhostSnakeEatFood) {
      this.makeNewFood();
      this.snake.grow();
      this.score.count(1);
    }
    displayScore(this.score);
  }
  isOver() {
    return (
      this.hasTouchedBorder(this.snake) ||
      this.hasTouchGhost() ||
      this.hasTouchedItself()
    );
  }
  randomlyTurnSnake() {
    let x = Math.random() * 100;
    if (x > 50) {
      this.ghostSnake.turnLeft();
    }
  }
}
