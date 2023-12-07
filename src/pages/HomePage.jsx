import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";

export const HomePage = () => {
  return (
    <div>
      <Navigation />
      <Link to="/profile">Profile</Link>
    </div>
  );
};
