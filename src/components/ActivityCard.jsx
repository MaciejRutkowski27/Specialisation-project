export const ActivityCard = ({ activity }) => {
  return (
    <div className="activities-card">
      <img
        className="activities-picture-trip"
        src={activity.picture}
        alt="Destination picture"
      />
      <section className="text-activity">
        <h3 className="blue-text">{activity.name}</h3>
        <p className="blue-text">{activity.description}</p>
      </section>
    </div>
  );
};
