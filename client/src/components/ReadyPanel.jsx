import { useState, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { AuthContext } from "../hooks/useDiscord";

function ReadyPanel({ turn }) {
  const context = useContext(AuthContext);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (turn === undefined || turn === null) setReady(false);
  }, [turn]);

  function handleClickReady() {
    setReady(true);
    context.room?.send("ready");
  }

  return createPortal(
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        p-8 rounded-xl text-center transition-transform duration-1000 ${
          (turn === true || turn === false) && "-translate-y-[150vh]"
        }`}
    >
      <button
        className={`text-5xl p-5 m-4 rounded-xl  border-4 border-sky-700
          transition-all active:-translate-y-3
          ${
            ready
              ? "bg-white text-sky-600 animate-bounce"
              : `text-white bg-sky-600 hover:-rotate-12 hover:scale-110 
                active:scale-125`
          }`}
        onClick={handleClickReady}
      >
        {ready ? "Ready!✨" : "Ready?❌"}
      </button>
    </div>,
    document.body
  );
}
export default ReadyPanel;
