import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, updateDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import { tripsRef, tagsRef } from "../config/Firebase";

import Close from "../assets/close.svg";
import "./createPage.css";
import ProgressBar from "../assets/progress2.svg";

export const CreateTagsPage = ({ showLoader }) => {
  // created by Nina

  const params = useParams();
  const navigate = useNavigate();
  const tripId = params.tripId;

  // all the states
  const [tags, setTags] = useState([]);
  const [chosenTags, setChosenTags] = useState([]);

  useEffect(() => {
    showLoader(false);
  }, [showLoader]);

  // getting all the tags
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
      // If the tag is present, remove it from the array
      setChosenTags((prevTags) => prevTags.filter((tag) => tag !== name));
    } else {
      // If the tag is not present, add it to the array
      setChosenTags((prevTags) => [...prevTags, name]);
    }
  }

  async function saveTrip(event) {
    showLoader(true); // show the loader
    event.preventDefault();
    const docRef = doc(tripsRef, tripId);

    // Update the trip with the chosenTags array
    await updateDoc(docRef, {
      tags: chosenTags,
    });
    showLoader(false); // hide the loader
    navigate(`/trips/activities/${tripId}`);
  }

  // deleting the trip itself
  async function deleteTrip() {
    showLoader(true); // show the loader
    const confirmDelete = window.confirm("Do you want to delete this trip?");
    if (confirmDelete) {
      const docRef = doc(tripsRef, tripId);
      await deleteDoc(docRef);
      showLoader(false); // hide the loader
      navigate("/");
    }
  }

  return (
    <section className="general-margin" aria-labelledby="choose-tags-heading">
      <img
        onClick={deleteTrip}
        src={Close}
        alt="Delete the trip and go back to the home page."
        role="button"
      />
      <section className="image-container" aria-hidden="true">
        {/* ProgressBar is a decorative image with no additional information */}
        <img src={ProgressBar} alt="" aria-hidden="true" />
      </section>
      <form onSubmit={saveTrip} aria-labelledby="choose-tags-form">
        <h1 id="choose-tags-heading">Choose tags</h1>
        <section className="tags-container" aria-live="polite">
          {tags.map((tag) => (
            <div
              className={`tag-container ${
                chosenTags.includes(tag.name) ? "selected-tag" : ""
              }`}
              onClick={() => handleTagClick(tag.name)}
              key={tag.id}
              role="button"
              aria-label={`Select or unselect ${tag.name}`}
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
