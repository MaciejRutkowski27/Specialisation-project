import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { usersRef } from "../config/Firebase";

export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const auth = getAuth();

  function handleSignUp(event) {
    event.preventDefault();
    const mail = event.target.mail.value; // mail value from inout field in sign in form
    const password = event.target.password.value; // password value from inout field in sign in form

    // read the docs: https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
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
    setDoc(docRef, { name });
  }

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          placeholder="Type your name"
        />
        <input type="email" name="mail" placeholder="Type your mail" />
        <input
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
    </div>
  );
};
