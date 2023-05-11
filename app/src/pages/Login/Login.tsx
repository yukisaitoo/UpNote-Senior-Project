/* eslint-disable camelcase */
import "./Login.scss";

import Button from "components/Button/Button";
import NavBar from "components/NavBar/Navbar";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface UserInfoType {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
}

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  } as UserInfoType);

  const [user, setUser] = useState({} as unknown);

  console.log({ userInfo });
  console.log({ user });

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleCallBack(response: any) {
    console.log("Encoded JWT ID Token: " + response.credential);
    const user_token = jwt_decode(response.credential);
    console.log(user_token);
    setUser(user_token);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("signIn")!.hidden = true;
    if (user) {
      navigate("/collection");
    }
  }

  useEffect(() => {
    /*global google*/
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const google = (window as any).google;
    google.accounts.id.initialize({
      client_id:
        "732879004899-dkb4r8nb3hln9h36i5v67ajj52n036oa.apps.googleusercontent.com",
      callback: handleCallBack,
    });

    google.accounts.id.renderButton(document.getElementById("signIn"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);
  return (
    <div className="login">
      <NavBar />
      <div className="login-box">
        <h2>Login</h2>
        <div>
          <div className="user-box">
            <input
              type="email"
              name=""
              required={true}
              onChange={(event) => {
                const newUserInfo = {
                  ...userInfo,
                  email: event.target.value,
                };
                setUserInfo(newUserInfo);
              }}
            />
            <label>Email Address</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name=""
              required={true}
              onChange={(event) => {
                const newUserInfo = {
                  ...userInfo,
                  password: event.target.value,
                };
                setUserInfo(newUserInfo);
              }}
            />
            <label>Password</label>
          </div>
          <div className="lb-button">
            <Button
              color="blue"
              onClick={() => {
                navigate("/collection");
              }}
            >
              <>Submit</>
            </Button>
          </div>
          <div id="signIn"></div>
        </div>
      </div>
      <div className="lb-signup-text">
        <p>
          Don&apos;t have an account? Sign up <Link to="/signup">here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
