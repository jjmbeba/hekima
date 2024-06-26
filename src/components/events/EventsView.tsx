"use client";

import { Tables } from "@/database-types";
import { useViewStore } from "@/stores/store";
import EventsCardList from "./EventsCardList";
import EventsTable from "./EventsTable";

const EventsView = ({ events }: { events: Tables<"events">[] }) => {
  const [view] = useViewStore((state) => [state.view]);

  switch (view) {
    case "List":
      return <EventsTable events={events!} />;
      break;
    case "Cards":
      return <EventsCardList events={events!} />;
      break;
    case "Calendar":
      // return <EventsCalendarView events={events!} />;
      break;

    default:
      break;
  }
};

export default EventsView;
