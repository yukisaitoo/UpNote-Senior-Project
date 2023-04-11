import "./NavBar.scss";

import { Link } from "react-router-dom";

import logo from "../../static/img/logo.png";

interface NavBar {
  loggedin?: boolean;
}

const NavBar = (props: NavBar) => {
  return (
    <div className="navbar">
      <Link to="/" className="nb-logo-wrapper">
        <img src={logo} className="nb-logo" />
      </Link>

      <div className="nb-wrapper">
        {props !== undefined ? <>hello</> : undefined}
      </div>
    </div>
  );
};

export default NavBar;
