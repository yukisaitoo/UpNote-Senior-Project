//import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

function App() {
const [user, setUser] = useState({});

//Console Log for verifying Login. Returns a JSON WebToken.
function HandleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode (response.credential);
    console.log(userObject); //Returns various account info
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true; //hides button after signing in
};

function HandleSignOut() {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
}
useEffect(() => {
/*global google */
google.accounts.id.initialize({
    client_id: "506864236806-imphkpqmd7cvif8o3c8he5115egtmv09.apps.googleusercontent.com",
    callback: HandleCallbackResponse
});

//Login Button Render
google.accounts.id.renderButton(
   document.getElementById("signInDiv"), 
   { theme: "outline", size: "large"}
);

}, []);
//If user -> show logout button
//If no user -> show login button
    return(
        <div className="App">
            <div id="signInDiv"></div>
            {   Object.keys(user).length != 0  &&
               <button onClick= { (e) => HandleSignOut(e)}>Sign Out</button>
            }
        </div>
    );
}   


export default App;