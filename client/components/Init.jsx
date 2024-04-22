import { AuthContext } from "../hooks/useDiscord";
import { useContext, useEffect } from "react";
import { useState } from "react";

function Init() {
  const [count, setCount] = useState();
  const discord = useContext(AuthContext);

  useEffect(() => {
    console.log(discord.discordSdk);
    discord.discordSdk.commands
      .getChannel({
        channel_id: discord?.discordSdk.channelId,
      })
      .then((channel) => setCount(channel.name));
  }, [discord?.auth]);

  return (
    <>
      <div>
        <p>{String(discord.auth)}</p>
        <a href="https://vitejs.dev" target="_blank"></a>
        <a href="https://react.dev" target="_blank"></a>
      </div>
      <div className="card">
        <button>{count}</button>
      </div>
    </>
  );
}
export default Init;
