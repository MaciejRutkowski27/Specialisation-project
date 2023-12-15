import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { usersRef, tripsRef } from "../config/Firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import Placeholder from "../assets/placeholder.webp";
import { Navigation } from "../components/Navigation";
import { TripCardProfile } from "../components/TripCardProfile";
import { Link } from "react-router-dom";

import "./profile.css";
import Settings from "../assets/settings_icon.svg";

export const ProfilePage = () => {
  // created by Nina

  // all the states
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState();
  const [trips, setTrips] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [filteredLength, setFilteredLength] = useState();
  const [activeLink, setActiveLink] = useState("upcoming");
  const [displayedTrips, setDisplayedTrips] = useState([]);
  const [friendTrips, setFriendTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);

  const auth = getAuth();

  // getting the information about the user
  useEffect(() => {
    async function getUser() {
      if (auth.currentUser) {
        const docRef = doc(usersRef, auth.currentUser.uid);
        setUserId(auth.currentUser.uid);
        const userData = (await getDoc(docRef)).data();
        if (userData) {
          setUser(userData);
        }
      }
    }
    getUser();

    // getting all the trips
    onSnapshot(tripsRef, (data) => {
      const tripsData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrips(tripsData);
    });
  }, [auth.currentUser]);

  useEffect(() => {
    // filtering upcomingTrips for the trips that were created by the user
    const filteredUpcomingTrips = trips.filter((trip) => {
      return trip.uid === userId && new Date(trip.endDate) > new Date();
    });
    setUpcomingTrips(filteredUpcomingTrips);
    setFilteredLength(filteredUpcomingTrips.length);

    // filtering friendTrips based on friends' uids and endDate
    const filteredFriendTrips = trips.filter((trip) => {
      return (
        trip.addedFriends.some((friend) => friend.id === userId) &&
        new Date(trip.endDate) > new Date()
      );
    });
    setFriendTrips(filteredFriendTrips);

    // filtering pastTrips based on trips that were created by the user or included as a friend and ended in the past
    const filteredPastTrips = trips.filter(
      (trip) =>
        (trip.uid === userId ||
          trip.addedFriends.some((friend) => friend.id === userId)) &&
        new Date(trip.endDate) < new Date()
    );
    setPastTrips(filteredPastTrips);
  }, [trips, userId, upcomingTrips.length]);

  // updating displayedTrips based on the activeLink
  useEffect(() => {
    if (activeLink === "upcoming") {
      setDisplayedTrips(upcomingTrips);
    } else if (activeLink === "friends") {
      setDisplayedTrips(friendTrips);
    } else if (activeLink === "past") {
      setDisplayedTrips(pastTrips);
    } else {
      // Default is for upcoming - so "upcoming" in small navigation is yellow
      setDisplayedTrips(upcomingTrips);
    }
  }, [activeLink, upcomingTrips, friendTrips, pastTrips]);

  const handleActiveLinkChange = (link) => {
    setActiveLink(link);
  };

  return (
    <section className="space-bottom" aria-live="polite">
      <Navigation />
      <section className="general-margin" aria-label="Profile Section">
        <section className="profile-top">
          <div className="picture-username-profile">
            <div className="circle_image_container_profile">
              <img
                className="circle_image"
                src={user.picture || Placeholder}
                alt="Your profile picture"
                aria-labelledby="username"
              />
            </div>
            <div>
              <h3 id="username">{user.username}</h3>
              <div
                className="trip-count"
                aria-label={`${filteredLength} Trips`}
              >
                <h3 className="yellow" aria-hidden="true">
                  {filteredLength}
                </h3>
                <p className="yellow" aria-hidden="true">
                  Trips
                </p>
              </div>
            </div>
          </div>
          <Link to="/editProfile">
            <img src={Settings} alt="Edit your profile" />
          </Link>
        </section>
        <nav className="small-nav">
          <h3
            className={`small-nav-button ${
              activeLink === "upcoming" ? "yellow" : ""
            }`}
            onClick={() => handleActiveLinkChange("upcoming")}
            role="button"
            tabIndex="0"
          >
            My upcoming
          </h3>
          <h3
            className={`small-nav-button ${
              activeLink === "friends" ? "yellow" : ""
            }`}
            onClick={() => handleActiveLinkChange("friends")}
            role="button"
            // tabIndex added to the navigation buttons to make them focusable and triggerable with the keyboard
            tabIndex="0"
          >
            Friends
          </h3>
          <h3
            className={`small-nav-button ${
              activeLink === "past" ? "yellow" : ""
            }`}
            onClick={() => handleActiveLinkChange("past")}
            role="button"
            tabIndex="0"
          >
            Past
          </h3>
        </nav>
        <section aria-label="Trips Section">
          {displayedTrips.map((trip) => (
            <TripCardProfile key={trip.id} trip={trip} />
          ))}
        </section>
      </section>
    </section>
  );
};
