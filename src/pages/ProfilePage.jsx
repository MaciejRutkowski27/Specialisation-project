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
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [filteredLength, setFilteredLength] = useState();
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

  // filteredTrips for the trips that were created by the user
  useEffect(() => {
    const filtered = trips.filter((trip) => trip.uid === userId);
    setFilteredTrips(filtered);
    setFilteredLength(filteredTrips.length);
  }, [trips, userId, filteredTrips.length]);

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
        <section>
          {filteredTrips.map((trip) => (
            <TripCardProfile key={trip.id} trip={trip} />
          ))}
        </section>
      </section>
    </section>
  );
};
