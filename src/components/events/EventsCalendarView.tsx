import { Tables } from "@/database.types";
import { ScrollArea } from "../ui/scroll-area";
import MiniEventCard from "./MiniEventCard";
import EventCalendar from "./EventCalendar";

const EventsCalendarView = ({ events }: { events: Tables<"events">[] }) => {
  return (
    <div className="flex items-start min-h-screen w-full mt-8">
      <ScrollArea className="h-[70vh] w-[350px] rounded-md p-4 bg-background">
        <div className="flex flex-col gap-5">
          {events.map((event) => (
            <MiniEventCard key={event.id} {...event} />
          ))}
        </div>
      </ScrollArea>
      <EventCalendar />
    </div>
  );
};

export default EventsCalendarView;
