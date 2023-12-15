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
    <section aria-labelledby="main-heading">
      <Navigation />
      <TopPart />
      <section style={{ position: "relative" }}>
        <img
          className="picture"
          src={CTA_image}
          alt="Travel with us"
          aria-hidden="true"
        />
        <div className="overlay-content general-margin">
          <h1 id="main-heading">Plan your next trip!</h1>
          <Link to="/create">
            <button
              role="link"
              aria-label="Start planning your next trip by going to the create form"
            >
              Start planning
            </button>
          </Link>
        </div>
      </section>
      <section className="general-margin">
        <h2>Recommended for you</h2>
        <section
          className="trip-cards"
          role="region"
          aria-labelledby="recommended-heading"
        >
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </section>
      </section>
    </section>
  );
};
