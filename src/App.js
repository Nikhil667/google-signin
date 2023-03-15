import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './App.css'

function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login =  useGoogleLogin({
    onSuccess: (response) => setUser(response),
    onError: (error) => console.log("Login Failed:", error)
  });

  console.log(Array.isArray(user) && !user.length,"user out")
  console.log(Array.isArray(profile) && !user.profile, "pro out")

  useEffect(() => {
      console.log(Array.isArray(user) && !user.length,"user in")
      //console.log(Array.isArray(profile) && !user.profile, "pro in")
      const configuration = {
        method: "get",
        url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json",
        }
      }
      axios(configuration)
        .then((result) => {
          setProfile(result.data);
        })
        .catch((error) => {
          error = new Error();
        });
  }, [user]);


  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile([]);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      {(profile.length === 0) ?
      (
        <button type="button" onClick={() => login()}>
          Sign in with Google 🚀{" "}
        </button>
        
      ) : (
        <div>
        <h3>User Logged in</h3>
        <img src={profile.picture} alt="user" />
        <p>Name: {profile.name}</p>
        <p>Email Address: {profile.email}</p>
        <br />
        <br />
        <button type="button" onClick={logOut}>
          Log out
        </button>
      </div>
      )}
    </div>
  );
}
export default App;



// import './App.css';
// import { GoogleLogin } from '@react-oauth/google';

// function App() {

//   const responseMessage = (response) => {
//     console.log(response);
//   };
//   const errorMessage = (error) => {
//     console.log(error);
//   };

//   return (
//     <div className="App">
//       <div>
//             <h2>React Google Login</h2>
//             <br />
//             <br />
//             <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
//         </div>
//     </div>
//   );
// }

// export default App;
