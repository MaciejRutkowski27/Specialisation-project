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
    <section className="general_margin container">
      <img className="png" src="/src/assets/tripsimplelogo.PNG" />
      <h1>Sign in</h1>

      <form onSubmit={signIn}>
        <input
          className="input_field"
          type="email"
          name="mail"
          placeholder="Type your e-mail"
        />
        <input
          className="input_field"
          type="password"
          name="password"
          placeholder="Type your password"
        />
        <p className="text-error">{errorMessage}</p>
        <button>Sign in</button>
      </form>

      <p className="text-center">
        Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </section>
  );
};
