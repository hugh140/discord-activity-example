import { DiscordSDK } from "@discord/embedded-app-sdk";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as Colyseus from "colyseus.js";

const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const auth = useAuth();
  const room = useRoom();
  return (
    <AuthContext.Provider value={{ auth, discordSdk, room }}>
      {children}
    </AuthContext.Provider>
  );
}
AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

function useRoom() {
  const [room, setRoom] = useState();

  // Create client and enter to a room
  useEffect(() => {
    const client = new Colyseus.Client(`wss://${location.host}/api/colyseus`);
    client.joinOrCreate("game").then((room) => setRoom(room));
  }, []);

  return room;
}

function useAuth() {
  const [auth, setAuth] = useState();

  useEffect(() => {
    // Confirm discord auth
    setupDiscordSdk().then(() => {
      console.log("Discord SDK is authenticated");
    });

    // Get auth token
    async function setupDiscordSdk() {
      await discordSdk.ready();
      console.log("Discord SDK is ready");

      const { code } = await discordSdk.commands.authorize({
        client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
        response_type: "code",
        state: "",
        prompt: "none",
        scope: ["identify", "guilds"],
      });

      const response = await fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      });
      const { access_token } = await response.json();

      const authInfo = await discordSdk.commands.authenticate({
        access_token,
      });

      if (authInfo == null) throw new Error("Authenticate command failed");
      setAuth(authInfo);
    }
  }, [auth]);

  return auth;
}

export { AuthContext, AuthContextProvider };
