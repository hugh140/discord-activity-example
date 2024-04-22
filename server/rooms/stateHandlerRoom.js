import pkg from "colyseus";
const { Room } = pkg;

class MyRoom extends Room {
  onCreate(options) {
    console.log("Se ha creado una nueva habitación:", options);
    this.maxClients = 2;
  }

  onJoin(client, options) {
    console.log(`${client.sessionId} se ha unido a la habitación.`);
  }

  onMessage(client, message) {
    console.log(`Mensaje de ${client.sessionId}:`, message);
  }

  onLeave(client, consented) {
    console.log(`${client.sessionId} ha dejado la habitación.`);
  }

  onDispose() {
    console.log("La habitación se ha destruido.");
  }
}

export default MyRoom;
