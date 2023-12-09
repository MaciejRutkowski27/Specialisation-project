import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { serverTimestamp, addDoc } from "firebase/firestore";
import { tripsRef } from "../config/Firebase";
import imgPlaceholder from "../assets/placeholder.webp";

import "./createPage.css";

export const CreatePage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  // all the states
  const [image, setImage] = useState("");
  const [destination, setDestination] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function createTrip(newTrip) {
    newTrip.createdAt = serverTimestamp(); // timestamp (now)

    newTrip.uid = auth.currentUser.uid; // authenticated user id
    await addDoc(tripsRef, newTrip); // add new doc - new post object

    navigate("/");
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 500000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage(""); // reset errorMessage state
    } else {
      // if not below 0.5MB display an error message using the errorMessage state
      setErrorMessage("The image file is too big!");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      // create a new objebt to store the value from states / input fields
      image: image,
      destination: destination,
    };

    const validForm = formData.destination && formData.image; // will return false if one of the properties doesn't have a value
    if (validForm) {
      // if all fields/ properties are filled, then call savePost
      createTrip(formData);
    } else {
      // if not, set errorMessage state.
      setErrorMessage("Please, fill in all fields.");
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>
          Where would you like to go?
          <input
            type="text"
            value={destination}
            placeholder="Malorca, Porto Rico, New York, ..."
            onChange={(e) => setDestination(e.target.value)}
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
            src={image}
            alt="Choose"
            onError={(event) => (event.target.src = imgPlaceholder)}
          />
        </label>
        <p className="text-error">{errorMessage}</p>
        <button type="submit">Save</button>
      </form>
    </section>
  );
};
