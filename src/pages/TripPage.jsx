import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { tripsRef } from "../config/Firebase";
import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";

import Placeholder from "../assets/placeholder.webp";
import HomeFilled from "../assets/filled_home.svg";
import ProfileFilled from "../assets/profile_icon.svg";
import More from "../assets/more-square_icon.svg";
import Plus from "../assets/plus.svg";
import "./tripPage.css";
import { ActivityCard } from "../components/ActivityCard";
import { PopUp } from "../components/PopUp";
import { DeletePop } from "../components/DeletePop";

export const TripPage = () => {
  // created by Nina

  const auth = getAuth();

  // states
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [friends, setFriends] = useState([]);
  const [picture, setPicture] = useState("");
  const [activities, setActivities] = useState([]);
  const [author, setAuthor] = useState("");
  const [userId, setUserId] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const params = useParams();
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
      setFriends(docData.data().addedFriends);
      setAuthor(docData.data().uid);
      if (docData.data().picture) {
        setPicture(docData.data().picture);
      } else {
        setPicture(Placeholder);
      }
    }

    getTrip();
  }, [tripId]);

  // getting the user ID to check if they are eligible to update
  useEffect(() => {
    async function getUser() {
      if (auth.currentUser) {
        setUserId(auth.currentUser.uid);
      }
    }
    getUser();
  }, [auth.currentUser]);

  // pop up of edit
  const handlePlusClick = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  // pop up of delete
  const handleDeleteClick = () => {
    setDeleteOpen(true);
  };

  const handleDeletePopup = () => {
    setDeleteOpen(false);
  };

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

  const resultDict = {};

  // Check if activities is not empty before creating the resultDict
  if (Object.keys(activities).length !== 0 && days.length !== 0) {
    // Iterate through the days dictionary
    for (const [date, activityName] of Object.entries(days)) {
      // Find the activity with matching name
      const matchingActivity = activities.find(
        (activity) => activity.name === activityName
      );

      // Create a new dictionary using the date as the key
      resultDict[date] = {
        name: matchingActivity.name,
        description: matchingActivity.description,
        picture: matchingActivity.picture,
      };
    }
  }

  return (
    <section className="space-bottom">
      <Navigation />
      <section style={{ position: "relative" }}>
        <img className="picture-trip" src={picture} alt="Trip" />
        <div className="path-icons general-margin">
          <div className="path-icons-two">
            <Link to="/">
              <img src={HomeFilled} alt="Go to the discovery page" />
            </Link>
            <Link to="/profile">
              <img src={ProfileFilled} alt="Go to your profile page" />
            </Link>
          </div>
          {(userId === author ||
            friends.some((friend) => friend.id === userId)) && (
            <img
              onClick={handleDeleteClick}
              src={More}
              alt="Settings of the trip"
            />
          )}
        </div>
        {isDeleteOpen && (
          <DeletePop
            tripId={tripId}
            author={author}
            onClose={handleDeletePopup}
          />
        )}
      </section>
      <section className="general-margin">
        <h1>{name}</h1>
        <h3>
          {startDate}-{endDate}
        </h3>
        <section className="friends-container">
          {friends.map((friend) => (
            <div key={friend.id} className="circle_image_container friend-trip">
              <img
                className="circle_image"
                src={friend.picture}
                alt={`Picture of the ${friend.username}`}
              />
            </div>
          ))}
          {(userId === author ||
            friends.some((friend) => friend.id === userId)) && (
            <img src={Plus} alt="Add a friend" onClick={handlePlusClick} />
          )}
        </section>
        {/* Conditionally render the pop-up */}
        {isPopupOpen && (
          <PopUp
            tripId={tripId}
            friends={friends}
            onClose={handleClosePopup}
            author={author}
          />
        )}
        <div>
          {Object.entries(resultDict).map(([date, event]) => (
            <div key={date}>
              <h2>{date}</h2>
              <ActivityCard activity={event} />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};
