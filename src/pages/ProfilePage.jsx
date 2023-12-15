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
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState();
  const [trips, setTrips] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [filteredLength, setFilteredLength] = useState();
  const [activeLink, setActiveLink] = useState();
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
    // upcomingTrips for the trips that were created by the user
    const filteredUpcomingTrips = trips.filter((trip) => {
      return trip.uid === userId && new Date(trip.endDate) > new Date();
    });
    setUpcomingTrips(filteredUpcomingTrips);
    setFilteredLength(filteredUpcomingTrips.length);

    // Update friendTrips based on friends' uids and endDate
    const filteredFriendTrips = trips.filter((trip) => {
      return (
        trip.addedFriends.some((friend) => friend.id === userId) &&
        new Date(trip.endDate) > new Date()
      );
    });
    setFriendTrips(filteredFriendTrips);

    // Update pastTrips based on trips that were created by the user or included as a friend and ended in the past
    const filteredPastTrips = trips.filter(
      (trip) =>
        (trip.uid === userId ||
          trip.addedFriends.some((friend) => friend.id === userId)) &&
        new Date(trip.endDate) < new Date()
    );
    setPastTrips(filteredPastTrips);
  }, [trips, userId, upcomingTrips.length]);

  // Update displayedTrips based on the activeLink
  useEffect(() => {
    if (activeLink === "upcoming") {
      setDisplayedTrips(upcomingTrips);
    } else if (activeLink === "friends") {
      setDisplayedTrips(friendTrips);
    } else if (activeLink === "past") {
      setDisplayedTrips(pastTrips);
    } else {
      // Default is for upcoming
      setDisplayedTrips(upcomingTrips);
    }
  }, [activeLink, upcomingTrips, friendTrips, pastTrips]);

  const handleActiveLinkChange = (link) => {
    setActiveLink(link);
  };

  return (
    <section className="page">
      <Navigation />
      <section className="general-margin">
        <section className="profile-top">
          <div className="picture-username-profile">
            <div className="circle_image_container_profile">
              <img
                className="circle_image"
                src={user.picture || Placeholder}
                alt="Your profile picture"
              />
            </div>
            <div>
              <h3>{user.username}</h3>
              <div className="trip-count">
                <h3 className="yellow">{filteredLength}</h3>
                <p className="yellow">Trips</p>
              </div>
            </div>
          </div>
          <Link to="/editProfile">
            <img src={Settings} alt="Edit your profile" />
          </Link>
        </section>
        <nav className="small-nav">
          <h3 onClick={() => handleActiveLinkChange("upcoming")}>
            My upcoming
          </h3>
          <h3 onClick={() => handleActiveLinkChange("friends")}>Friends</h3>
          <h3 onClick={() => handleActiveLinkChange("past")}>Past</h3>
        </nav>
        <section>
          {displayedTrips.map((trip) => (
            <TripCardProfile key={trip.id} trip={trip} />
          ))}
        </section>
      </section>
    </section>
  );
};
