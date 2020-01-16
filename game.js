'use strict';
const areCellsSimilar = (cell1, cell2) => {
  const [cell1X, cell1Y] = cell1;
  const [cell2X, cell2Y] = cell2;
  return cell1X == cell2X && cell1Y == cell2Y;
};

const randomNum = limit => {
  return Math.floor(Math.random() * (limit - 2));
};

class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.previousFood = new Food(0, 0, 'normal');
    this.score = new Score();
  }
  isFoodIngested(snake) {
    return areCellsSimilar(this.food.position, snake.head);
  }
  makeNewFood() {
    this.previousFood = this.food;
    const foodType = randomNum(10) > 5 ? 'special' : 'normal';
    this.food = new Food(
      randomNum(NUM_OF_COLS),
      randomNum(NUM_OF_ROWS),
      foodType
    );
  }
  turnSnake(dir) {
    if (dir == 'left') {
      this.snake.turnLeft();
    }
    if (dir == 'right') {
      this.snake.turnRight();
    }
  }
  get status() {
    return {
      snake: this.snake.status(),
      ghostSnake: this.ghostSnake.status(),
      food: this.food.status(),
      previousFood: this.previousFood.status()
    };
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
    if (this.isFoodIngested(this.snake)) {
      this.upGradeSnake();
      this.makeNewFood();
    }
    if (this.isFoodIngested(this.ghostSnake)) {
      this.makeNewFood();
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
    if (x > 20) {
      this.ghostSnake.turnLeft();
    }
  }
  upGradeSnake() {
    if (this.food.kind == 'special') {
      this.score.count(5);
    } else {
      this.snake.grow();
      this.score.count(1);
    }
  }
}
