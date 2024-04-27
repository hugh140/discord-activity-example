import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <FontAwesomeIcon className="text-5xl md:text-6xl text-white" spin icon={faSpinner} />
    </div>
  );
}
export default Loader;
