import { DiscordSDK } from "@discord/embedded-app-sdk";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={{ auth, discordSdk }}>
      {children}
    </AuthContext.Provider>
  );
}
AuthContextProvider.propTypes = {
  children: PropTypes.array,
};

function useAuth() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setupDiscordSdk().then(() => {
      console.log("Discord SDK is authenticated");
      setAuth(true);
    });

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
      setAuth(authInfo);

      if (auth == null) throw new Error("Authenticate command failed");
    }
  }, [auth]);

  return auth;
}

export { AuthContext, AuthContextProvider };
