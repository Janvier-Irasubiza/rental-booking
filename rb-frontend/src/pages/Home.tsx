import "../styles/App.css";
import App from "../layouts/app";
import Categories from "../partials/categories";

function Home() {
  return (
    <App>
      <div className="px-28">
        <div className="">
          <Categories />
        </div>
      </div>
    </App>
  );
}

export default Home;
