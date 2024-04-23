import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import pkg from "colyseus";
import MyRoom from "./rooms/stateHandlerRoom.js";
import { createServer } from "http";
import { WebSocketTransport } from "@colyseus/ws-transport";
const { Server } = pkg;
dotenv.config({ path: "../.env" });

const app = express();
const port = 3001;

// Allow express to parse JSON bodies
app.use(express.json());

app.post("/api/token", async (req, res) => {
  // Exchange the code for an access_token
  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.VITE_DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: req.body.code,
    }),
  });

  // Retrieve the access_token from the response
  const { access_token } = await response.json();

  // Return the access_token to our client as { access_token: "..."}
  res.send({ access_token });
});

const server = new Server({
  transport: new WebSocketTransport({
    server: createServer(app),
  }),
});
server.define("game", MyRoom);

server.listen(port);
