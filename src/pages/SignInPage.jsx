import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import "./sign.css";

export const SignInPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();

  function signIn(event) {
    event.preventDefault();
    const mail = event.target.mail.value;
    const password = event.target.password.value;

    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user); // for test purposes: logging the authenticated user
      })
      .catch((error) => {
        let code = error.code; // saving error code in variable
        console.log(code);
        code = code.replaceAll("-", " "); // some JS string magic to display error message. See the log above in the console
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }

  return (
    <section className="container">
      <img
        className="png"
        src="https://firebasestorage.googleapis.com/v0/b/trip-simple-20c18.appspot.com/o/tripsimplelogo.PNG?alt=media&token=0e996dcc-39a1-479f-a9c5-b1b0fa8f245b"
        alt="logo"
      />
      <h1>Sign in</h1>

      <form className="signinform" onSubmit={signIn}>
        <input
          className="field"
          type="email"
          name="mail"
          placeholder="Type your e-mail or username"
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
        <button>Sign in</button>
      </form>

      <p className="text-center">
        Don&apos;t have an account? <Link to="/sign-up">Sign up here</Link>
      </p>
    </section>
  );
};
