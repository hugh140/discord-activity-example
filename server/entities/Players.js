import * as schema from "@colyseus/schema";
const Schema = schema.Schema;
const ArraySchema = schema.ArraySchema;

class Player extends Schema {
  constructor() {
    super();
    this.id = "";
    this.name = "";
    this.ready = false;
  }
}
schema.defineTypes(Player, {
  id: "string",
  name: "string",
  symbol: "boolean",
  ready: "boolean",
});

class Players extends Schema {
  constructor() {
    super();
    this.getAll = new ArraySchema();
  }
}
schema.defineTypes(Players, {
  getAll: [Player],
});

export { Players, Player };
