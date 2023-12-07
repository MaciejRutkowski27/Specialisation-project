import { NavLink, useLocation } from "react-router-dom";
import "./navigation.css";
import Home from "../assets/home_icon.svg";
import Create from "../assets/create_icon.svg";
import Map from "../assets/map_icon.svg";
import FilledHome from "../assets/filled_home.svg";
import FilledMap from "../assets/filled_map.svg";

export const Navigation = () => {
  const location = useLocation();
  return (
    <nav className="navigation">
      <NavLink to="/">
        <img
          className={`icon ${location.pathname === "/" ? "hidden" : ""}`}
          src={Home}
          alt="Go to discover page"
        />
        <img
          className={`filledIcon ${
            location.pathname === "/" ? "displayed" : ""
          }`}
          src={FilledHome}
          alt="Go to discover page"
        />
      </NavLink>
      <NavLink to="/create">
        <img src={Create} alt="Create a trip" />
      </NavLink>
      <NavLink to="/map">
        <img
          className={`icon ${location.pathname === "/map" ? "hidden" : ""}`}
          src={Map}
          alt="Go to map"
        />
        <img
          className={`filledIcon ${
            location.pathname === "/map" ? "displayed" : ""
          }`}
          src={FilledMap}
          alt="Go to map"
        />
      </NavLink>
    </nav>
  );
};
