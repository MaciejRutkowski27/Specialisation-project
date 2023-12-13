import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { serverTimestamp, addDoc, onSnapshot } from "firebase/firestore";
import { tripsRef, usersRef } from "../config/Firebase";
import Close from "../assets/close.svg";

import "./createPage.css";

export const CreatePage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  // all the states
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

    // Adding the document and getting the reference
    const docRef = await addDoc(tripsRef, newTrip);

    // Accessing the ID from the reference - we need the ID for the next page
    const newTripId = docRef.id;

    // Navigate to the new trip
    navigate(`/trips/tags/${newTripId}`);
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
    const friendToAdd = friends.find((friend) => friend.id === id);

    if (friendToAdd) {
      // If a friend with the given id is found, they are added it to addedFriends
      const addedArray = [...addedFriends, friendToAdd];
      setAddedFriends(addedArray);
    } else {
      console.error(`Friend with id ${id} not found.`);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      destination: destination,
      name: name,
      startDate: startDate,
      endDate: endDate,
      addedFriends: addedFriends,
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

  return (
    <section>
      <img
        onClick={handleCancel}
        src={Close}
        alt="Delete the trip and go back to home page."
      />
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
        <button type="submit">Next</button>
      </form>
    </section>
  );
};
