import { Tables } from "@/database.types";
import EventCard from "./EventCard";

const EventsCardList = ({ events }: { events: Tables<"events">[] }) => {
  return (
    <div className="grid grid-cols-4 sm:gap-4 mt-8">
      {events?.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};

export default EventsCardList