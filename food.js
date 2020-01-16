'use strict';
class Food {
  constructor(colId, rowId, type) {
    this.colId = colId;
    this.rowId = rowId;
    this.type = type;
  }
  get position() {
    return [this.colId, this.rowId];
  }
  get kind() {
    return this.type;
  }
  status() {
    return {
      positions: this.position,
      kind: this.kind
    };
  }
}
