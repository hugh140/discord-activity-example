import pkg from "colyseus";
import Game from "../entities/Game.js";
import { Player } from "../entities/Players.js";
import detectGameOver from "../scripts/detectGameOver.js";
const { Room } = pkg;

class MyRoom extends Room {
  onCreate(options) {
    console.log("Se ha creado una nueva habitación:", options);
    this.setState(new Game());
    this.maxClients = 2;

    this.onMessage("ready", (client) => {
      const playerIndex = this.state.players.getAll.findIndex(
        (player) => player.id === client.sessionId
      );
      this.state.players.getAll[playerIndex].ready = true;

      if (this.state.players.getAll.every((player) => Boolean(player.ready))) {
        this.state.ready = true;
        this.sendGameInfo();
      }
    });
    this.onMessage("updateMatrix", (client, message) => {
      this.state.matrix.get = message.matrix;
      this.state.matrix.turn = !this.state.matrix.turn;
      this.sendGameInfo();

      const getPlayer = this.state.players.getAll.find(
        (player) => player.id === client.sessionId
      );

      const victory = detectGameOver(
        this.state.matrix.get,
        getPlayer.symbol ? 1 : 2
      );
      if (victory.state === true) {
        this.broadcast("victory", { text: `Gana ${getPlayer.name}` });
        this.state.winnerPlayer = client.sessionId;
        setTimeout(() => this.resetGame(), 3000);
      } else if (victory.state === false) {
        this.broadcast("victory", { text: "Empate" });
        setTimeout(() => this.resetGame(), 3000);
      }
    });
    this.onMessage("changeName", (client, message) => {
      const changeNameIndex = this.state.players.getAll.findIndex(
        (player) => player.id === client.sessionId
      );

      try {
        this.state.players.getAll[changeNameIndex].name = message.name;
      } catch (e) {
        console.error(e);
      }

      const testPlayersName = (player) => player.name.trim().length;
      if (this.state.players.getAll.every(testPlayersName)) this.sendGameInfo();
    });
  }

  onJoin(client, options) {
    console.log(`${client.sessionId} se ha unido a la habitación.`);

    const playerState = new Player();
    if (this.state.players.getAll[0] !== undefined)
      playerState.symbol = !this.state.players.getAll[0].symbol;
    else playerState.symbol = Math.random() > 0.5;

    playerState.id = client.sessionId;
    this.state.players.getAll.push(playerState);
  }

  onLeave(client, consented) {
    console.log(`${client.sessionId} ha dejado la habitación.`);
    const deletePlayerIndex = this.state.players.getAll.findIndex(
      (player) => player.id === client.sessionId
    );
    this.state.players.getAll.splice(deletePlayerIndex, 1);

    const alivePlayer = this.state.players.getAll[0];
    this.sendGameInfo();
    this.broadcast("victory", { text: `Gana ${alivePlayer.name}` });
    this.state.winnerPlayer = alivePlayer.id;
    this.state.ready = false;
    this.state.players.getAll.forEach((player) => (player.ready = false));
    setTimeout(() => this.resetGame(), 3000);
  }

  onDispose() {
    console.log("La habitación se ha destruido.");
  }

  resetGame() {
    this.state.matrix.get = Array(9).fill(0);
    this.sendGameInfo();
  }

  sendGameInfo() {
    this.clients.forEach((client) => {
      const info = {
        matrix: this.state.matrix.get,
        symbol:
          this.state.players.getAll[0].id === client.sessionId
            ? this.state.players.getAll[0]?.symbol
              ? 1
              : 2
            : this.state.players.getAll[1]?.symbol
            ? 1
            : 2,
      };

      if (this.state.winnerPlayer !== undefined) {
        this.state.matrix.turn = client.sessionId === this.state.winnerPlayer;
        this.state.winnerPlayer = undefined;
      }

      let oponent;
      if (this.clients.length !== 1)
        oponent = {
          oponent:
            this.state.players.getAll[0].id === client.sessionId
              ? this.state.players.getAll[1]
              : this.state.players.getAll[0],
        };
      else
        oponent = {
          oponent: "",
        };

      const turnInfo = {
        turn:
          this.state.players.getAll[0].id === client.sessionId
            ? this.state.matrix.turn
            : !this.state.matrix.turn,
      };

      if (this.state.ready) Object.assign(info, turnInfo);
      Object.assign(info, oponent);
      client.send("game", info);
    });
  }
}

export default MyRoom;
