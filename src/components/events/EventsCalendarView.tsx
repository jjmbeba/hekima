import { Tables } from "@/database-types";
import { ScrollArea } from "../ui/scroll-area";
import MiniEventCard from "./MiniEventCard";
import EventCalendar from "./EventCalendar";
import React from "react";

const EventsCalendarView = ({ events }: { events: Tables<"events">[] }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex items-start min-h-screen w-full mt-8">
      <ScrollArea className="h-[70vh] w-[350px] rounded-md p-4 bg-background">
        <div className="flex flex-col gap-5">
          {events.map((event) => (
            <MiniEventCard key={event.id} {...event} setDate={setDate} />
          ))}
        </div>
      </ScrollArea>
      <EventCalendar date={date} setDate={setDate} />
    </div>
  );
};

export default EventsCalendarView;
