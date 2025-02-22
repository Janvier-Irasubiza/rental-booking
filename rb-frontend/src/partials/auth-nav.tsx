import { Link } from "react-router-dom";

function AuthNav() {
  return (
    <nav>
      <div className="py-5 px-28">
        <div className="flex justify-between items-center">
          <Link to="/">
            <div className="text-3xl font-semibold">Logo</div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default AuthNav;
