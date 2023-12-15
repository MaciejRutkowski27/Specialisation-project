import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { tripsRef } from "../config/Firebase";
import { EventList } from "../components/EventList";
import { Link } from "react-router-dom";

import Placeholder from "../assets/placeholder.webp";
import HomeFilled from "../assets/filled_home.svg";

export const TripPage = () => {
  // created by Nina

  // states
  const [activities, setActivities] = useState([]);
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [friends, setFriends] = useState();
  const [picture, setPicture] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const tripId = params.tripId;
  const url =
    "https://trip-simple-20c18-default-rtdb.europe-west1.firebasedatabase.app/activities.json";

  useEffect(() => {
    async function getTrip() {
      const docRef = doc(tripsRef, tripId);
      const docData = await getDoc(docRef);
      setDays(docData.data().days);
      setName(docData.data().name);
      setDestination(docData.data().destination);
      setStartDate(docData.data().startDate);
      setEndDate(docData.data().endDate);
      setFriends(docData.data().addedfriends);
      if (docData.data().picture) {
        setPicture(docData.data().picture);
      } else {
        setPicture(Placeholder);
      }
    }

    getTrip();
  }, [tripId]);

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

  return (
    <section className="space-bottom">
      <img className="picture" src={picture} alt="Trip" />
      <Link to="/">
        <img src={HomeFilled} alt="Go to the discovery page" />
      </Link>
      <section className="general-margin">
        <h1>{name}</h1>
        <h3>
          {startDate}-{endDate}
        </h3>
        <EventList events={days} />
      </section>
    </section>
  );
};
