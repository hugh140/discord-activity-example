import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../hooks/useDiscord";
import PropTypes from "prop-types";
import { GameContext } from "../hooks/useGameProvider";
import Avatar from "./Avatar";

function PlayerTurn({ player }) {
  const context = useContext(AuthContext);
  const game = useContext(GameContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (context.auth?.user.username)
      context.room?.send("changeName", {
        name: context.auth?.user.global_name,
        avatar: context.auth?.user.avatar
          ? `https://cdn.discordapp.com/avatars/${context.auth.user.id}/${context.auth.user.avatar}.png?size=256`
          : `https://cdn.discordapp.com/embed/avatars/${
              Math.abs(Number(user.id) >> 22) % 6
            }.png`,
      });
    if (!player)
      context.room?.onMessage("game", (message) => {
        setUser(message?.oponent.name);
      });
    else setUser(context.auth?.user.global_name);
  }, [context.room, context.auth]);

  return (
    <main
      className={`absolute left-1/2 -translate-x-1/2 z-10 ${
        !player ? "top-2" : "bottom-2"
      }`}
      id="turnIndicator"
    >
      <h1
        className={`text-center text-lg md:text-2xl duration-500 font-bold ${
          game.turn !== player
            ? "text-cyan-600"
            : "text-amber-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
        }`}
      >
        {user}
        <Avatar player={player} />
      </h1>
    </main>
  );
}
export default PlayerTurn;

PlayerTurn.propTypes = {
  player: PropTypes.bool,
};
