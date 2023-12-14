import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, updateDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import { tripsRef, tagsRef } from "../config/Firebase";

import Close from "../assets/close.svg";
import "./createPage.css";
import ProgressBar from "../assets/progress2.svg";

export const CreateTagsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const tripId = params.tripId;

  const [tags, setTags] = useState([]);
  const [chosenTags, setChosenTags] = useState([]);

  useEffect(() => {
    onSnapshot(tagsRef, (data) => {
      const tagsData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTags(tagsData);
    });
  }, []);

  function handleTagClick(name) {
    if (chosenTags.includes(name)) {
      // If present, remove it from the array
      setChosenTags((prevTags) => prevTags.filter((tag) => tag !== name));
    } else {
      // If not present, add it to the array
      setChosenTags((prevTags) => [...prevTags, name]);
    }
  }

  async function saveTrip(event) {
    event.preventDefault();
    const docRef = doc(tripsRef, tripId);

    // Update the trip with the chosenTags array
    await updateDoc(docRef, {
      tags: chosenTags,
    });
    navigate(`/trips/activities/${tripId}`);
  }

  async function deletePost() {
    const confirmDelete = window.confirm("Do you want to delete this trip?");
    if (confirmDelete) {
      const docRef = doc(tripsRef, tripId);
      await deleteDoc(docRef);
      navigate("/");
    }
  }

  return (
    <section className="general-margin">
      <img
        onClick={deletePost}
        src={Close}
        alt="Delete the trip and go back to home page."
      />
      <section className="image-container">
        <img src={ProgressBar} alt="Create trip: step 1 out of 3" />
      </section>
      <form onSubmit={saveTrip}>
        <h1>Choose tags</h1>
        <section className="tags-container">
          {tags.map((tag) => (
            <div
              className={`tag-container ${
                chosenTags.includes(tag.name) ? "selected-tag" : ""
              }`}
              onClick={() => handleTagClick(tag.name)}
              key={tag.id}
            >
              <img className="tag-image" src={tag.picture} alt="" />
              <p className="yellow-text">{tag.name}</p>
            </div>
          ))}
        </section>
        <section className="button-section">
          <button className="static-button" type="submit">
            Next
          </button>
        </section>
      </form>
    </section>
  );
};
