import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import "./sign.css";

export const SignInPage = () => {
  // created by Maciej and Nina

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
    <section className="container" aria-labelledby="signin-heading">
      <img
        className="png"
        src="https://firebasestorage.googleapis.com/v0/b/trip-simple-20c18.appspot.com/o/tripsimplelogo.PNG?alt=media&token=0e996dcc-39a1-479f-a9c5-b1b0fa8f245b"
        alt="logo"
      />
      <h1 id="signin-heading">Sign in</h1>

      <form
        className="signinform"
        onSubmit={signIn}
        aria-labelledby="signin-form"
      >
        <input
          className="field"
          type="email"
          name="mail"
          placeholder="Type your e-mail or username"
          aria-label="Email or Username"
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
        <button aria-label="Sign in">Sign in</button>
      </form>

      <p className="text-center">
        Don&apos;t have an account? <Link to="/sign-up">Sign up here</Link>
      </p>
    </section>
  );
};
