import pkg from "colyseus";
import Counter from "../entities/Counter.js";
const { Room } = pkg;

class MyRoom extends Room {
  onCreate(options) {
    console.log("Se ha creado una nueva habitación:", options);
    this.setState(new Counter());
    this.maxClients = 3;

    this.onMessage("count", (client, message) => {
      console.log(message.user, "sent 'action' message: ", message.number);
      this.state.counter++;
      this.state.user = String(message.user);
      this.broadcast("count", {
        number: this.state.counter,
        user: this.state.user,
      });
    });
  }

  onJoin(client, options) {
    console.log(`${client.sessionId} se ha unido a la habitación.`);
  }

  onLeave(client, consented) {
    console.log(`${client.sessionId} ha dejado la habitación.`);
  }

  onDispose() {
    console.log("La habitación se ha destruido.");
  }
}

export default MyRoom;
