import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { serverTimestamp, addDoc, onSnapshot } from "firebase/firestore";
import { tripsRef, usersRef } from "../config/Firebase";

import Close from "../assets/close.svg";
import "./createPage.css";
import Placeholder from "../assets/placeholder.webp";
import ProgressBar from "../assets/progress1.svg";

export const CreatePage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  // all the states
  const [destination, setDestination] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [friends, setFriends] = useState([]);
  const [picture, setPicture] = useState("");
  const [addedFriends, setAddedFriends] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  // creating the trip
  async function createTrip(newTrip) {
    newTrip.createdAt = serverTimestamp(); // timestamp (now)
    newTrip.uid = auth.currentUser.uid;

    // Adding the document and getting the reference
    const docRef = await addDoc(tripsRef, newTrip);

    // Accessing the ID from the reference - we need the ID for the next page
    const newTripId = docRef.id;

    // Navigate to the new trip
    navigate(`/trips/tags/${newTripId}`);
  }

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    updateWarningMessage(e.target.value, endDate);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    updateWarningMessage(startDate, e.target.value);
  };

  const updateWarningMessage = (start, end) => {
    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    if (endDateObj - startDateObj > sevenDaysInMilliseconds) {
      setWarningMessage(
        "If the dates are more than 7 days apart, we might not have enough of activities."
      );
    } else {
      setWarningMessage("");
    }
  };

  useEffect(() => {
    onSnapshot(usersRef, (data) => {
      const friendsData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFriends(friendsData);
    });
  }, []);

  const handleAddButton = (id) => {
    const friendToAdd = friends.find((friend) => friend.id === id);

    if (friendToAdd) {
      const isFriendAdded = addedFriends.some(
        (addedFriend) => addedFriend.id === id
      );

      if (isFriendAdded) {
        // If the friend is already added, remove them
        const updatedArray = addedFriends.filter(
          (addedFriend) => addedFriend.id !== id
        );
        setAddedFriends(updatedArray);
      } else {
        // If the friend is not added, add them
        const updatedArray = [...addedFriends, friendToAdd];
        setAddedFriends(updatedArray);
      }
    } else {
      console.error(`Friend with id ${id} not found.`);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      destination: destination,
      name: name,
      startDate: startDate,
      endDate: endDate,
      addedFriends: addedFriends,
      picture: picture,
    };

    const validForm =
      formData.destination &&
      formData.name &&
      formData.startDate &&
      formData.endDate;

    if (validForm) {
      await createTrip(formData); // Add await here
    } else {
      setErrorMessage("Please, fill in all fields.");
    }
  }

  const handleCancel = () => {
    navigate(-1); // This navigates back one step in the browser history
  };

  // adding picture
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

  return (
    <section className="general-margin">
      <img
        onClick={handleCancel}
        src={Close}
        alt="Delete the trip and go back to home page."
      />
      <section className="image-container">
        <img src={ProgressBar} alt="Create trip: step 1 out of 3" />
      </section>
      <form onSubmit={handleSubmit}>
        <section className="input-box">
          <label>
            <h2>Where would you like to go?</h2>
            <input
              className="create-field"
              type="text"
              value={destination}
              placeholder="Malorca, Porto Rico, New York, ..."
              onChange={(e) => setDestination(e.target.value)}
            />
          </label>
          <label>
            <h2>Give your trip a name</h2>
            <input
              className="create-field"
              type="text"
              value={name}
              placeholder="My trip to New York"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <h2>Choose the dates</h2>
            <input
              className="create-field date"
              type="date"
              value={startDate}
              placeholder="mm-dd-yyyy"
              onChange={handleStartDateChange}
            />
            <input
              className="create-field date"
              type="date"
              value={endDate}
              placeholder="mm-dd-yyyy"
              onChange={handleEndDateChange}
            />
          </label>
          {warningMessage && <p>{warningMessage}</p>}
        </section>
        <h2>Add friends</h2>
        {friends.map((friend) => (
          <div key={friend.id} className="friend-container">
            <section className="little-friend-container">
              <div className="circle_image_container friend-image">
                <img
                  className="circle_image"
                  src={friend.picture || Placeholder}
                  alt="Go to the profile page"
                />
              </div>
              <h3>{friend.username}</h3>
            </section>
            <button
              className={
                addedFriends.some((addedFriend) => addedFriend.id === friend.id)
                  ? "button-yellow"
                  : "button-white"
              }
              type="button"
              onClick={() => handleAddButton(friend.id)}
            >
              {addedFriends.some((addedFriend) => addedFriend.id === friend.id)
                ? "Remove"
                : "Add"}
            </button>
          </div>
        ))}
        <label>
          Image
          <input
            type="file"
            className="picture"
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
        <button type="submit">Next</button>
      </form>
    </section>
  );
};
