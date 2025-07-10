import { Link } from "react-router";

const NotFound = () => {
  return (
    <div>
      <h1> NOT FOUND! </h1>
      <nav>
        <Link to="/">GO HOME!</Link>
      </nav>
    </div>
  );
};

export default NotFound;
