import * as schema from "@colyseus/schema";
const Schema = schema.Schema;

class Counter extends Schema {
  constructor() {
    super();
    this.counter = 0;
    this.user = "";
  }
}
schema.defineTypes(Counter, {
  counter: "number",
  user: "string",
});
export default Counter;
