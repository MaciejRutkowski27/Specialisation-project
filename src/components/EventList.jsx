export const EventList = ({ events }) => {
  return (
    <div>
      {Object.entries(events).map(([date, event]) => (
        <div key={date}>
          <p>
            Day: {date}, Event: {event}
          </p>
        </div>
      ))}
    </div>
  );
};
