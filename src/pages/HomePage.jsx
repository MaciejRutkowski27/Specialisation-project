import { Navigation } from "../components/Navigation";
import CTA_image from "../assets/CTA section.webp";
import { TopPart } from "../components/TopPart";
import { Link } from "react-router-dom";
import "./homePage.css";

export const HomePage = () => {
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
    </section>
  );
};
