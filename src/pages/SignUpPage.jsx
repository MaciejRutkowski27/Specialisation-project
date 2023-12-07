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
    <section className="general_margin container">
      <img className="png" src="/src/assets/tripsimplelogo.PNG" />
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <input
          className="input_field"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          name="username"
          placeholder="Username"
        />
        <input
          className="input_field"
          type="email"
          name="mail"
          placeholder="Type your mail"
        />
        <input
          className="input_field"
          type="password"
          name="password"
          placeholder="Type your password"
        />
        <p className="text-error">{errorMessage}</p>
        <button>Sign Up</button>
      </form>
      <p className="text-center">
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </section>
  );
};
