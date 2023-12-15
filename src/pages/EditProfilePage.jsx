import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { usersRef } from "../config/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Placeholder from "../assets/placeholder.webp";
import { LightMode } from "../components/themes/LightMode";
import { DarkMode } from "../components/themes/DarkMode";
import { Navigation } from "../components/Navigation";

import "./profile.css";

export const EditProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();

  // getting the information about the user
  useEffect(() => {
    async function getUser() {
      if (auth.currentUser) {
        setEmail(auth.currentUser.email);
        const docRef = doc(usersRef, auth.currentUser.uid);
        const userData = (await getDoc(docRef)).data();
        if (userData) {
          setName(userData.name);
          setPicture(userData.image || Placeholder);
        }
      }
    }
    getUser();
  }, [auth.currentUser]);

  async function handleSubmit(event) {
    event.preventDefault();

    const userToUpdate = {
      name: name,
      email: email,
      picture: picture,
    };

    const docRef = doc(usersRef, auth.currentUser.uid);
    await updateDoc(docRef, userToUpdate);
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 500000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setPicture(event.target.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage(""); // reset errorMessage state
    } else {
      // if not below 0.5MB display an error message using the errorMessage state
      setErrorMessage("The image file is too big!");
    }
  }

  function handleSignOut() {
    signOut(auth); // sign out from firebase/auth
  }

  return (
    <section className="page">
      <Navigation />
      <section className="general-margin">
        <h1>Profile</h1>
        <LightMode />
        <DarkMode />
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Type name"
            />
          </label>
          <label>
            Image
            <input
              type="file"
              className="file-input"
              accept="image/*"
              onChange={handleImageChange}
            />
            <img
              className="picture"
              src={picture}
              alt="Choose"
              onError={(event) => (event.target.src = Placeholder)}
            />
          </label>
          <p className="text-error">{errorMessage}</p>
          <button>Save User</button>
        </form>
        <button onClick={handleSignOut}>Sign Out</button>
      </section>
    </section>
  );
};
