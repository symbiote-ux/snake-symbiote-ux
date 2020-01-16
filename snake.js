'use strict';
class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }
  get location() {
    return this.positions.slice();
  }
  get head() {
    return this.positions[this.positions.length - 1].slice();
  }
  get species() {
    return this.type;
  }
  get lastTailPosition() {
    return this.previousTail.slice();
  }
  status() {
    return {
      locations: this.location,
      species: this.species,
      tailLocation: this.lastTailPosition
    };
  }
  turnLeft() {
    this.direction.turnLeft();
  }
  turnRight() {
    this.direction.turnRight();
  }
  move() {
    const [headX, headY] = this.head;
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }
  grow() {
    this.positions.unshift(this.previousTail);
  }
  isOnRow(row) {
    const [, snakeLiveRow] = this.head;
    return snakeLiveRow == row;
  }
  isOnCol(col) {
    const [snakeLiveCol] = this.head;
    return snakeLiveCol == col;
  }
}
