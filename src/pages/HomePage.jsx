import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { tripsRef } from "../config/Firebase";

import { Navigation } from "../components/Navigation";
import CTA_image from "../assets/CTA section.webp";
import { TopPart } from "../components/TopPart";
import { Link } from "react-router-dom";
import "./homePage.css";
import { TripCard } from "../components/TripCard";

export const HomePage = () => {
  const [trips, setTrips] = useState([]);

  // getting the trip data
  useEffect(() => {
    onSnapshot(tripsRef, (data) => {
      const tripsData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrips(tripsData);
    });
  }, []);

  return (
    <section>
      <Navigation />
      <TopPart />
      <section style={{ position: "relative" }}>
        <img className="picture" src={CTA_image} alt="Travel with us" />
        <div className="overlay-content general-margin">
          <h1>Plan your next trip!</h1>
          <Link to="/create">
            <button>Start planning</button>
          </Link>
        </div>
      </section>
      <section className="general-margin">
        <h2>Recommended for you</h2>
        <section className="trip-cards">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </section>
      </section>
    </section>
  );
};
