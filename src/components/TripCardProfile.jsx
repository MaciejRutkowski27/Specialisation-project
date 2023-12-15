import { useNavigate } from "react-router-dom";
import Placeholder from "../assets/placeholder.webp";
import "../pages/profile.css";

export const TripCardProfile = ({ trip }) => {
  // component created by Nina

  const navigate = useNavigate();

  return (
    <section
      className="trip-card-profile"
      onClick={() => navigate(`/trip/${trip.id}`)}
      style={{ position: "relative" }}
    >
      <img
        className="trip-picture-profile"
        src={trip.picture || Placeholder}
        alt="Trip"
      />
      <div className="overlay-content">
        <h3>{trip.name}</h3>
        <section className="user-pictures">
          {trip.addedFriends.map((friend, index) => (
            <div key={index} className="circle_image_container">
              <img
                className="circle_image"
                src={friend.picture || Placeholder}
                alt="Profile picture of the user"
              />
            </div>
          ))}
        </section>
      </div>
    </section>
  );
};
