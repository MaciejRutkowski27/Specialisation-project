import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { usersRef } from "../config/Firebase";
import "./sign.css";

export const SignUpPage = () => {
  const [username, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const auth = getAuth();

  function handleSignUp(event) {
    event.preventDefault();
    const mail = event.target.mail.value;
    const password = event.target.password.value;

    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Created and signed in
        const user = userCredential.user;
        createUser(user.uid, mail);
      })
      .catch((error) => {
        let code = error.code; // saving error code in variable
        console.log(code);
        code = code.replaceAll("-", " "); // some JS string magic to display error message. See the log above in the console
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }

  function createUser(id) {
    const docRef = doc(usersRef, id);
    setDoc(docRef, { username });
  }

  return (
    <section className="container">
      <img
        className="png"
        src="https://firebasestorage.googleapis.com/v0/b/trip-simple-20c18.appspot.com/o/tripsimplelogo.PNG?alt=media&token=0e996dcc-39a1-479f-a9c5-b1b0fa8f245b"
        alt="logo"
      />
      <h1>Sign up</h1>
      <form className="signupform" onSubmit={handleSignUp}>
        <input
          className="field"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          name="username"
          placeholder="Username"
        />
        <input
          className="field"
          type="email"
          name="mail"
          placeholder="Type your mail"
        />
        <input
          className="field"
          type="password"
          name="password"
          placeholder="Type your password"
        />
        <p className="text-error">{errorMessage}</p>
        <p>or continue with</p>
        <div className="icons">
          <img src="https://firebasestorage.googleapis.com/v0/b/trip-simple-20c18.appspot.com/o/google.png?alt=media&token=ee6da16b-6043-424b-bd66-ecccdca6b719" />
          <img src="https://firebasestorage.googleapis.com/v0/b/trip-simple-20c18.appspot.com/o/facebook.png?alt=media&token=c895a6e4-f96c-4b5b-b94b-5d1700fe77c5" />
          <img src="https://firebasestorage.googleapis.com/v0/b/trip-simple-20c18.appspot.com/o/apple.png?alt=media&token=001a2c0f-87e3-46cc-8997-b3a66acf54c1" />
        </div>
        <button>Sign up</button>
      </form>
      <p className="text-center">
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </section>
  );
};
