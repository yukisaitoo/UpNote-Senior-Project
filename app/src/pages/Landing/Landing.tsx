import "./Landing.scss";

import Button from "components/Button/Button";
import { useNavigate } from "react-router-dom";

import logo from "../../static/img/logo.png";

const Landing = () => {
  const navigate = useNavigate();

  const navigateSignUp = () => {
    navigate("/signup");
  };

  const navigateLogin = () => {
    navigate("/login");
  };

  return (
    <div className="landing-content">
      <div className="lc-content-wrap">
        <h1>UpNote</h1>
        <div>
          <img src={logo} className="lc-logo" />
          <div className="lc-logo-shadow" />
        </div>
        <div className="lc-buttons">
          <Button color="blue" size="medium" onClick={navigateLogin}>
            <>Login</>
          </Button>
          <Button color="blue" onClick={navigateSignUp}>
            <>Sign Up</>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
