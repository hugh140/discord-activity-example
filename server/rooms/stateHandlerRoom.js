import pkg from "colyseus";
import Game from "../entities/Game.js";
import { Player } from "../entities/Players.js";
const { Room } = pkg;

class MyRoom extends Room {
  onCreate(options) {
    console.log("Se ha creado una nueva habitación:", options);
    this.setState(new Game());
    this.maxClients = 2;

    this.onMessage("updateMatrix", (client, message) => {
      console.log("hola");
    });
    this.onMessage("changeName", (client, message) => {
      const changeNameIndex = this.state.players.getAll.findIndex(
        (player) => player.id === client.sessionId
      );
      this.state.players.getAll[changeNameIndex].name = message.name;

      console.log(
        this.state.players.getAll[0]?.name,
        this.state.players.getAll[1]?.name
      );

      const testPlayersName = (player) => player.name.trim().length;
      if (this.state.players.getAll.every(testPlayersName)) this.sendGameInfo();
    });
  }

  onJoin(client, options) {
    console.log(`${client.sessionId} se ha unido a la habitación.`);

    const playerState = new Player();
    if (Boolean(this.state.players.getAll[0]))
      playerState.symbol = !this.state.players.getAll[0].symbol;
    else playerState.symbol = Math.random() > 0.5;

    playerState.id = client.sessionId;
    this.state.players.getAll.push(playerState);

    if (this.state.players.getAll.length === 2) this.sendGameInfo();
    console.log(this.clients);
  }

  onLeave(client, consented) {
    console.log(`${client.sessionId} ha dejado la habitación.`);
    const deletePlayerIndex = this.state.players.getAll.findIndex(
      (player) => player.id === client.sessionId
    );
    this.state.players.getAll.splice(deletePlayerIndex);
  }

  onDispose() {
    console.log("La habitación se ha destruido.");
  }

  sendGameInfo() {
    this.clients.forEach((client) => {
      client.send("game", {
        matrix: this.state.matrix.get,
        turn: this.state.matrix.turn,
        oponent:
          this.state.players.getAll[0].id === client.sessionId
            ? this.state.players.getAll[1]
            : this.state.players.getAll[0],
      });
    });
  }
}

export default MyRoom;
