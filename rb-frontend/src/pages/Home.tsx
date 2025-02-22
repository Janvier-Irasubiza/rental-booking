import "../styles/App.css";
import App from "../layouts/app";
import Rentals from "../partials/rentals";

function Home() {
  return (
    <App>
      <div className="px-28">
        <div className="">
          <Rentals />
        </div>
      </div>
    </App>
  );
}

export default Home;
