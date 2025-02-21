import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Categories() {
  return (
    <div className="flex space-x-12 py-4">
      <button className="">
        <FontAwesomeIcon icon={faHouse} className="text-xl" />
        <div className="text-sm">Homes</div>
      </button>
    </div>
  );
}

export default Categories;
