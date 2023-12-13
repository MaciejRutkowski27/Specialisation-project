import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { usersRef } from "../config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import Placeholder from "../assets/placeholder.webp";

import { Link } from "react-router-dom";

export const ProfileCircle = () => {
  const [picture, setPicture] = useState("");
  const auth = getAuth();
  // getting the information about the user
  useEffect(() => {
    async function getUser() {
      if (auth.currentUser) {
        const docRef = doc(usersRef, auth.currentUser.uid);
        const userData = (await getDoc(docRef)).data();
        if (userData) {
          setPicture(userData.image || Placeholder);
        }
      }
    }
    getUser();
  }, [auth.currentUser]);

  return (
    <section className="mapTop">
      <Link to="/">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/trip-simple-20c18.appspot.com/o/Screenshot%202023-12-01%20at%2013.19%201.png?alt=media&token=5831f632-e649-42cf-9adc-6464614ab200"
          alt="tripsimple"
        />
      </Link>
      <div className="topicons">
        <img
          id="searchicon"
          src="https://firebasestorage.googleapis.com/v0/b/trip-simple-20c18.appspot.com/o/search-normal.svg?alt=media&token=70f159f9-a9b3-465c-ba97-f12b750433c6"
          alt="searchicon"
        />
        <Link to="/profile">
          <div className="circle_image_container">
            <img
              className="circle_image"
              src={picture}
              alt="Go to the profile page"
            />
          </div>
        </Link>
      </div>
    </section>
  );
};
