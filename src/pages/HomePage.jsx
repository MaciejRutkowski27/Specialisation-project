import { Navigation } from "../components/Navigation";
import CTA_image from "../assets/CTA section.webp";
import { TopPart } from "../components/TopPart";

export const HomePage = () => {
  return (
    <section>
      <Navigation />
      <TopPart />
      <section>
        <img src={CTA_image} alt="Travel with us" />
      </section>
    </section>
  );
};
