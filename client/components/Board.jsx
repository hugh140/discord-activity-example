import { AuthContext } from "../hooks/useDiscord";
import { useContext, useEffect } from "react";
import { useState } from "react";

function Board() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState();
  const context = useContext(AuthContext);

  useEffect(() => {
    context.room?.onMessage("count", (message) => {
      setCount(message.number);
      setUser(message.user);
    });
    setUser(context.auth?.user.global_name)
  }, [context.room, context.auth]);

  function increaseCount() {
    context.room.send("count", {
      number: count,
      user: context.auth?.user.global_name,
    });
  }

  return (
    <>
      <div>
        <p>Last user to press button: {user}</p>
        <p>{context.auth?.user.global_name}</p>
        <a href="https://vitejs.dev" target="_blank"></a>
        <a href="https://react.dev" target="_blank"></a>
      </div>
      <div className="card">
        <button onClick={increaseCount}>{count}</button>
      </div>
    </>
  );
}
export default Board;
