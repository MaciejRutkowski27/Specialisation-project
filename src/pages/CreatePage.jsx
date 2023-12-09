import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { serverTimestamp, addDoc, onSnapshot } from "firebase/firestore";
import { tripsRef, usersRef } from "../config/Firebase";
import imgPlaceholder from "../assets/placeholder.webp";

import "./createPage.css";

export const CreatePage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  // all the states
  const [image, setImage] = useState("");
  const [destination, setDestination] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [friends, setFriends] = useState([]);
  const [addedFriends, setAddedFriends] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // creating the trip
  async function createTrip(newTrip) {
    newTrip.createdAt = serverTimestamp(); // timestamp (now)
    newTrip.uid = auth.currentUser.uid;
    await addDoc(tripsRef, newTrip);
    navigate("/");
  }

  useEffect(() => {
    onSnapshot(usersRef, (data) => {
      const friendsData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFriends(friendsData);
    });
  }, []);

  function handleAddButton(id) {
    // Assuming friends is an array of objects with an id property
    const friendToAdd = friends.find((friend) => friend.id === id);

    if (friendToAdd) {
      // If a friend with the given id is found, add it to addedFriends
      const addedArray = [...addedFriends, friendToAdd];
      setAddedFriends(addedArray);
    } else {
      console.error(`Friend with id ${id} not found.`);
    }
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
      setErrorMessage("");
    } else {
      // if the image size is too big, setting error message
      setErrorMessage("The image file is too big!");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      image: image,
      destination: destination,
      name: name,
      startDate: startDate,
      endDate: endDate,
      addedFriends: addedFriends,
    };

    const validForm =
      formData.destination &&
      formData.image &&
      formData.name &&
      formData.startDate &&
      formData.endDate;
    if (validForm) {
      createTrip(formData);
    } else {
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
          Give your trip a name
          <input
            type="text"
            value={name}
            placeholder="My trip to New York"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Choose the dates
          <input
            type="date"
            value={startDate}
            placeholder="mm-dd-yyyy"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            placeholder="mm-dd-yyyy"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <label>
          Choose an image for your trip (optional)
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
        <h3>Add friends</h3>
        {friends.map((friend) => (
          <div key={friend.id}>
            <p>{friend.username}</p>
            <button type="button" onClick={() => handleAddButton(friend.id)}>
              Add
            </button>
          </div>
        ))}
        <p className="text-error">{errorMessage}</p>
        <button type="submit">Save</button>
      </form>
    </section>
  );
};
