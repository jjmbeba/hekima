"use client";

import useViewStore from "@/stores/view-store";
import React from "react";
import EventsCalendarView from "./EventsCalendarView";
import EventsCardList from "./EventsCardList";
import { Tables } from "@/database.types";
import EventsTable from "./EventsTable";

const EventsView = ({ events }: { events: Tables<"events">[] }) => {
  const [view] = useViewStore((state) => [state.view]);

  switch (view) {
    case "list":
      return <EventsTable events={events!}/>;
      break;
    case "cards":
      return <EventsCardList events={events!} />;
      break;
    case "calendar":
      return <EventsCalendarView events={events!} />;
      break;

    default:
      break;
  }
};

export default EventsView;
