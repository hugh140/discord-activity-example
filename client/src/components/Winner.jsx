import PropTypes from "prop-types";
import { useEffect } from "react";
import { createPortal } from "react-dom";

function Winner({ over, set }) {
  useEffect(() => {
    setTimeout(() => {
      set("");
    }, 3000);
  }, [over, set]);

  return createPortal(
    <div
      className={`absolute top-1/2 left-1/2 -translate-y-1/2 z-20 duration-1000 transition-transform ${
        over ? "-translate-x-1/2 -rotate-3" : "-translate-x-[150vw]"
      }`}
    >
      <h1
        className="text-white text-6xl font-bold italic text-center 
        drop-shadow-[0_4px_4px_rgb(0,0,0)]"
      >
        {over}
      </h1>
    </div>,
    document.body
  );
}
export default Winner;

Winner.propTypes = {
  over: PropTypes.string,
};
