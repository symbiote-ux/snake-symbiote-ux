'use strict';
const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;
const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const displayScore = score => {
  const scorer = document.getElementById('scoreText');
  scorer.innerText = 'Total : ' + score.total;
};

const drawFood = food => {
  const {positions, kind} = food;
  const [colId, rowId] = positions;
  const cell = getCell(colId, rowId);
  cell.classList.add(kind);
};

const eraseFood = food => {
  const {positions, kind} = food;
  const [colId, cellId] = positions;
  const cell = getCell(colId, cellId);
  cell.classList.remove(kind);
};

const drawSnake = snake => {
  const {locations, species} = snake;
  locations.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(species);
  });
};

const eraseTail = function(snake) {
  const {tailLocation, species} = snake;
  let [colId, rowId] = tailLocation;
  const cell = getCell(colId, rowId);
  cell.classList.remove(species);
};

const handleKeyPress = game => {
  const lockSmith = {ArrowLeft: 'left', ArrowRight: 'right'};
  game.turnSnake(lockSmith[event.key]);
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game);
};

const initializeSetup = game => {
  const {snake, ghostSnake, food} = game.status;
  createGrids();
  attachEventListeners(game);
  drawSnake(snake);
  drawSnake(ghostSnake);
  drawFood(food);
};

const animateSnake = snake => {
  eraseTail(snake);
  drawSnake(snake);
};

const drawGame = function(game) {
  const {snake, ghostSnake, food, previousFood} = game.status;
  animateSnake(snake);
  animateSnake(ghostSnake);
  eraseFood(previousFood);
  drawFood(food);
};

const initGhostSnake = () => {
  const ghostSnakePos = [
    [40, 30],
    [41, 30],
    [42, 30]
  ];

  return new Snake(ghostSnakePos, new Direction(SOUTH), 'ghost');
};

const initSnake = () => {
  const snakePosition = [
    [40, 25],
    [41, 25],
    [42, 25]
  ];
  return new Snake(snakePosition, new Direction(EAST), 'snake');
};

const displayMessage = () => {
  const element = document.querySelector('#msgBox');
  element.style = 'display:block';
};

const main = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(42, 40, 'normal');
  const game = new Game(snake, ghostSnake, food);
  initializeSetup(game);

  const interval = setInterval(() => {
    game.update();
    if (game.isOver()) {
      clearInterval(interval);
      displayMessage();
      return;
    }
    drawGame(game);
  }, 100);
  setInterval(() => game.randomlyTurnSnake(), 400);
};
