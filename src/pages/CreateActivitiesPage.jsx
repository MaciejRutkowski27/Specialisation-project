import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { tripsRef } from "../config/Firebase";
import Close from "../assets/close.svg";

export const CreateActivitiesPage = () => {
  const [trip, setTrip] = useState();
  const [tripTags, setTripTags] = useState([]);
  const [destination, setDestination] = useState("");
  const [activities, setActivities] = useState([]);
  const [dateArray, setDateArray] = useState([]);
  const [days, setDays] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const tripId = params.tripId;
  const url =
    "https://trip-simple-20c18-default-rtdb.europe-west1.firebasedatabase.app/activities.json";

  useEffect(() => {
    async function getActivities() {
      if (destination) {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();

          // Filter the ventures based on the destination
          const matchingVentures = Object.keys(data)
            .filter(
              (activityId) => data[activityId].destination === destination
            )
            .map((activityId) => data[activityId]);
          setActivities(matchingVentures[0].ventures);
        } else {
          console.log("Failed to fetch data");
        }
      }
    }
    getActivities();
  }, [url, destination]);

  // function to formate the date - only getting what i need to the array
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Pad single-digit day and month with leading zeros
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}.${formattedMonth}.${year}`;
  };

  // two useEffects to avoid re rendering
  useEffect(() => {
    async function getTrip() {
      const docRef = doc(tripsRef, tripId);
      const docData = await getDoc(docRef);
      setTrip(docData.data());
    }

    getTrip();
  }, [tripId]);

  useEffect(() => {
    if (trip) {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);

      // getting the data I need
      setTripTags(trip.tags);
      setDestination(trip.destination);

      // putting the dates between start and end dates to the array
      const updatedDateArray = [];

      while (start <= end) {
        updatedDateArray.push(formatDate(start));
        start.setDate(start.getDate() + 1);
      }

      setDateArray(updatedDateArray);
    }
  }, [trip]);

  // Calculate the similarity score for each item
  const scoredList = activities.map((item) => ({
    item,
    score: item.tags.filter((tag) => tripTags.includes(tag)).length,
  }));

  // Order the list based on the similarity score in descending order
  const orderedList = scoredList.sort((a, b) => b.score - a.score);

  const getActivitiesForDay = (dayIndex) => {
    const startIndex = dayIndex * 3;
    const endIndex = startIndex + 3;
    return orderedList.slice(startIndex, endIndex).map((entry) => entry.item);
  };

  const handleActivityClick = (date, name) => {
    setDays((prevSelected) => ({
      ...prevSelected,
      [date]: name,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const docRef = doc(tripsRef, tripId);

    // Update the trip with the days
    await updateDoc(docRef, {
      days: days,
    });
    navigate(`/trip/${tripId}`);
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
    <section>
      <img
        onClick={deletePost}
        src={Close}
        alt="Delete the trip and go back to home page."
      />
      <h1>Let&apos;s plan the activities!</h1>
      <p>
        Based on your inputs we are suggesting the activities. Choose one
        activity for each day.
      </p>
      <form onSubmit={handleSubmit}>
        {dateArray.map((date, index) => (
          <div key={index}>
            <p>{date}</p>
            <div>
              {getActivitiesForDay(index).map((selectedObject, objIndex) => (
                <div
                  key={objIndex}
                  onClick={() => handleActivityClick(date, selectedObject.name)}
                >
                  <p>{selectedObject.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="submit">Create the trip</button>
      </form>
    </section>
  );
};
