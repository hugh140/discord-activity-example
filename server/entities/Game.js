import * as schema from "@colyseus/schema";
import { Players } from "./Players.js";
const Schema = schema.Schema;
const ArraySchema = schema.ArraySchema;

class Matrix extends Schema {
  constructor() {
    super();
    this.get = new ArraySchema();
    this.turn = Math.random() > 0.5;
    for (let i = 0; i < 9; i++) this.get.push(0);
  }
}
schema.defineTypes(Matrix, {
  get: ["number"],
  turn: "boolean",
});

class Game extends Schema {
  constructor() {
    super();
    this.matrix = new Matrix();
    this.players = new Players();
  }
}
schema.defineTypes(Game, {
  players: Players,
  matrix: Matrix,
});

export default Game;
