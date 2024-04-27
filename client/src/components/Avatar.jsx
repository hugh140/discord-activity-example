import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/useDiscord";
import { GameContext } from "../hooks/useGameProvider";

function Avatar({ player }) {
  const [avatar, setAvatar] = useState("");
  const context = useContext(AuthContext);
  const game = useContext(GameContext);

  useEffect(() => {
    if (player) {
      let image;
      if (context.auth.user.avatar)
        image = `https://cdn.discordapp.com/avatars/${context.auth.user.id}/${context.auth.user.avatar}.png?size=256`;
      else {
        const defaultImage = Math.abs(Number(context.auth.user.id) >> 22) % 6;
        image = `https://cdn.discordapp.com/embed/avatars/${defaultImage}.png`;
      }
      setAvatar(image);
    } else setAvatar(game.avatar);
  }, [context?.auth, game.avatar]);

  return (
    <div className="flex justify-center mt-2">
      <img src={avatar} alt="" className="rounded-full" width={50} />
    </div>
  );
}
export default Avatar;

Avatar.propTypes = {
  player: PropTypes.bool,
};
