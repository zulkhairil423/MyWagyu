import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import Logo from "../assets/logo.png";

const NavBar = () => {

  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo"/>
        </Link>
      </div>
      <div className="navbar-right">
        <button className="signup" onClick={() => navigate("/login")}>
          Login / Register
          <div className="arrow-wrapper">
            <div className="arrow"></div>
          </div>
        </button>
      </div>
      <div className="navbar-pages">
        <Link to="/">Home</Link>
        <Link to="">Products</Link>
        <Link to="/addwagyu">Livestock</Link>
        <Link to="/addmanu">Manufacturer</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default NavBar;
