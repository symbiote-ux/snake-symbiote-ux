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
    const head = this.positions[this.positions.length - 1];
    return head.slice();
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  move() {
    const [headX, headY] = this.head;
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }
  getDetails() {
    const details = {};
    details.location = this.positions.slice();
    details.species = this.type;
    details.previousTail = this.previousTail.slice();
    return details;
  }
  grow() {
    this.positions.unshift(this.previousTail);
  }
}
