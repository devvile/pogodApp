import { Link } from "react-router";

const Contact = () => {
  return (
    <div>
      <h1> About! </h1>
      <nav>
        <Link to={"/"}>Home</Link> | <Link to="/about">About</Link>
      </nav>
    </div>
  );
};

export default Contact;
