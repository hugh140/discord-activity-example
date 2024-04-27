import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function TurnIndicator({ turn }) {
  return (
    <>
      {(turn === true || turn === false) && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
            <FontAwesomeIcon
              className={`text-[250px] md:text-[350px] duration-500 text-sky-400/40  ${turn ? "rotate-180" : ""}`}
              icon={faArrowUp}
            />
          </div>
        </>
      )}
    </>
  );
}
export default TurnIndicator;

TurnIndicator.propTypes = {
  turn: PropTypes.number,
};
