import "./Login.scss";

import Button from "components/Button/Button";
import NavBar from "components/NavBar/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";

interface UserInfoType {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
}

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  } as UserInfoType);

  console.log({ userInfo });

  return (
    <div className="login">
      <NavBar />
      <div className="login-box">
        <h2>Sign Up</h2>
        <div>
          <div className="user-box">
            <input
              type="text"
              name=""
              required={true}
              onChange={(event) => {
                const newUserInfo = {
                  ...userInfo,
                  username: event.target.value,
                };
                setUserInfo(newUserInfo);
              }}
            />
            <label>Username</label>
          </div>
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
          <div className="user-box">
            <input
              type="text"
              name=""
              required={true}
              onChange={(event) => {
                const newUserInfo = {
                  ...userInfo,
                  username: event.target.value,
                };
                setUserInfo(newUserInfo);
              }}
            />
            <label>Re-Enter Password</label>
          </div>
          <div className="lb-button">
            <Button color="blue">
              <>Submit</>
            </Button>
          </div>
        </div>
      </div>
      <div className="lb-signup-text">
        <p>
          Already have an account? Login <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
