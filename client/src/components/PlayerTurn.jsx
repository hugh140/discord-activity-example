import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../hooks/useDiscord";
import PropTypes from "prop-types";

function PlayerTurn({ player }) {
  const context = useContext(AuthContext);
  const [user, setUser] = useState();

  useEffect(() => {
    if (context.auth?.user.username)
      context.room?.send("changeName", {
        name: context.auth?.user.username,
      });
    if (!player)
      context.room?.onMessage("game", (message) => {
        setUser(message.oponent.name);
        console.log("Mi nombre es ", message.oponent.name)
      });
    else setUser(context.auth?.user.username);
  }, [context.room, context.auth]);

  return (
    <main>
      <h1 className="text-center">{user}</h1>
    </main>
  );
}
export default PlayerTurn;

PlayerTurn.propTypes = {
  player: PropTypes.bool,
};
