import logo from './logo.svg';
import {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import './App.css';

function App() {

  console.log("hello world")

  const google = window.google;
  var userToken = "";

  const [user, setUser] = useState({});

  function handleCallBack(response) {
    console.log("Encoded JWT ID Token: " + response.credential);
    var user_token = jwt_decode(response.credential);
    userToken = user_token;
    console.log(user_token);
    setUser(user_token);
    document.getElementById("signIn").hidden = true;
  }

  function doSignOut(event) {
    setUser({});
    document.getElementById("signIn").hidden = false;
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "732879004899-dkb4r8nb3hln9h36i5v67ajj52n036oa.apps.googleusercontent.com",
      callback: handleCallBack
    });

    google.accounts.id.renderButton(
      document.getElementById("signIn"),
      {theme: "outline", size: "large"}
    );

    google.accounts.id.prompt();
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <button onClick={callApi}>Call API</button>
          {Object.keys(user).length != 0 && <button onClick={(e) => doSignOut(e)}>Sign Out</button>}
          <div id = "signIn"></div>
            {user && 
            <div>
              <img src={user.picture}></img>
              <h3>{user.name}</h3>
            </div>
            }
        </header>
      </div>
  );
}

function callApi() {
    fetch('http://localhost:3001/details', { method: 'GET' })
        .then(data => data.json())
        .then(json => alert(JSON.stringify(json)))
}

export default App;