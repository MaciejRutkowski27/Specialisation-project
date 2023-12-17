import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { tripsRef, usersRef } from "../config/Firebase";
import { useState, useEffect } from "react";

import Placeholder from "../assets/placeholder.webp";

export const PopUp = ({ onClose, friends, tripId, author }) => {
  // update friends by Nina

  // the states
  const [allFriends, setAllFriends] = useState([]);
  const [newFriends, setNewFriends] = useState([]);

  // getting all the users so the user can choose participants for the trip
  useEffect(() => {
    onSnapshot(usersRef, (data) => {
      const usersData = data.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        // excluding the user creating the trip
        .filter((user) => user.id !== author);
      console.log(author);

      setAllFriends(usersData);

      // the friends already in the trip
      setNewFriends(friends);
    });
  }, [author, friends]);

  // adding the users (friends) to the trip
  const handleAddButton = (id) => {
    const friendToAdd = allFriends.find((friend) => friend.id === id);

    if (friendToAdd) {
      const isFriendAdded = newFriends.some(
        (addedFriend) => addedFriend.id === id
      );

      if (isFriendAdded) {
        // If the friend is already added, remove them
        const updatedArray = newFriends.filter(
          (addedFriend) => addedFriend.id !== id
        );
        setNewFriends(updatedArray);
      } else {
        // If the friend is not added, add them
        const updatedArray = [...newFriends, friendToAdd];
        setNewFriends(updatedArray);
      }
    } else {
      console.error(`Friend with id ${id} not found.`);
    }
  };

  async function updateFriends(event) {
    event.preventDefault();
    const docRef = doc(tripsRef, tripId);

    // Update the trip with the chosenTags array
    await updateDoc(docRef, {
      addedFriends: newFriends,
    });
    onClose();

    // reloading the page so the user can see the changes
    window.location.reload();
  }

  return (
    <div className="popup">
      <h3>Friends you can add</h3>
      {allFriends.map((friend) => (
        <div key={friend.id} className="friend-container-edit">
          <section className="little-friend-container">
            <div className="circle_image_container friend-image">
              <img
                className="circle_image"
                src={friend.picture || Placeholder}
                alt={`${friend.username}'s profile`}
              />
            </div>
            <h3>{friend.username}</h3>
          </section>
          <button
            className={
              newFriends.some((newFriend) => newFriend.id === friend.id)
                ? "button-white"
                : "button-yellow"
            }
            type="button"
            onClick={() => handleAddButton(friend.id)}
          >
            {newFriends.some((newFriend) => newFriend.id === friend.id)
              ? "Remove"
              : "Add"}
          </button>
        </div>
      ))}
      <button className="button-white" onClick={onClose}>
        Cancel
      </button>
      <button onClick={updateFriends}>Update friends</button>
    </div>
  );
};
