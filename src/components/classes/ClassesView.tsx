"use client";

import { useViewStore } from "@/stores/store";

import { Tables } from "@/database-types";
import ClassesCardList from "./ClassesCardList";
import ClassesTable from "./ClassesTable";

const ClassesView = ({ classes }: { classes: Tables<"classes">[] }) => {
  const [view] = useViewStore((state) => [state.view]);

  switch (view) {
    case "List":
      return <ClassesTable classes={classes!} />;
      break;
    case "Cards":
      return <ClassesCardList classes={classes!} />;
      break;
    case "Calendar":
      // return <EventsCalendarView events={events!} />;
      break;

    default:
      break;
  }
};

export default ClassesView;
