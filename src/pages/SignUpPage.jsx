import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { usersRef } from "../config/Firebase";
import "./sign.css";

export const SignUpPage = () => {
  // created by Maciej and Nina

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
    // + added ARIA labels
    <section className="container" aria-labelledby="signup-heading">
      <img
        className="png"
        src="https://firebasestorage.googleapis.com/v0/b/trip-simple-20c18.appspot.com/o/tripsimplelogo.PNG?alt=media&token=0e996dcc-39a1-479f-a9c5-b1b0fa8f245b"
        alt="logo"
      />
      <h1 id="signup-heading">Sign up</h1>
      <form
        className="signupform"
        onSubmit={handleSignUp}
        aria-labelledby="signup-form"
      >
        <input
          className="field"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          name="username"
          placeholder="Username"
          aria-label="Username"
        />
        <input
          className="field"
          type="email"
          name="mail"
          placeholder="Type your mail"
          aria-label="Email"
        />
        <input
          className="field"
          type="password"
          name="password"
          placeholder="Type your password"
          aria-label="Password"
        />
        <p className="text-error" aria-live="polite" role="alert">
          {errorMessage}
        </p>
        <p>or continue with</p>
        <div
          className="icons"
          role="group"
          aria-labelledby="continue-with-icons"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/trip-simple-20c18.appspot.com/o/google.png?alt=media&token=ee6da16b-6043-424b-bd66-ecccdca6b719"
            alt="Continue with Google"
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/trip-simple-20c18.appspot.com/o/facebook.png?alt=media&token=c895a6e4-f96c-4b5b-b94b-5d1700fe77c5"
            alt="Continue with Facebook"
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/trip-simple-20c18.appspot.com/o/apple.png?alt=media&token=001a2c0f-87e3-46cc-8997-b3a66acf54c1"
            alt="Continue with Apple"
          />
        </div>
        <button aria-label="Sign up">Sign up</button>
      </form>
      <p className="text-center">
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </section>
  );
};
