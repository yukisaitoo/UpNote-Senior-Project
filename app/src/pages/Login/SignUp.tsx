import "./Login.scss";

import Button from "components/Button/Button";
import NavBar from "components/NavBar/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface UserInfoType {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
}

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  } as UserInfoType);

  console.log({ userInfo });

  const navigate = useNavigate();

  async function handleSignUpClick() {
    try {
      console.log("ok?");

      //Work this out later
      if (userInfo.password !== userInfo.passwordConfirm) {
        console.log(userInfo.password);
        console.log(userInfo.passwordConfirm);
        console.log("not equal");
        return;
      }

      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      console.log("ok after?");

      const data = await response.json();

      if (response.ok) {
        // User hassigned up
        console.log(data);
        if (data) {
          navigate("/login");
        }
      } else {
        // Login failed
        console.error(data.message);
        console.log("Failed");
      }
    } catch (error) {
      // Handle error
      console.log("Failed caught");
    }
  }

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
              type="password"
              name=""
              required={true}
              onChange={(event) => {
                const newUserInfo = {
                  ...userInfo,
                  passwordConfirm: event.target.value,
                };
                setUserInfo(newUserInfo);
              }}
            />
            <label>Re-Enter Password</label>
          </div>
          <div className="lb-button">
            <Button
              color="blue"
              onClick={() => {
                handleSignUpClick();
              }}
            >
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
