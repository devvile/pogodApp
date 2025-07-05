import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <h1> HOME </h1>
      <nav>
        <Link to={"/about"}>About</Link> | <Link to="/contact">Contact</Link>
      </nav>
    </div>
  );
};

export default Home;
