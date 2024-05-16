"use client";

import { Tables } from "@/database-types";
import { useViewStore } from "@/stores/store";
import ExamCardList from "./ExamCardList";
import ExamsTable from "./ExamsTable";

const ExamsView = ({ exams }: { exams: Tables<"exams">[] }) => {
  const [view] = useViewStore((state) => [state.view]);

  switch (view) {
    case "List":
      return <ExamsTable exams={exams!} />;
      break;
    case "Cards":
      return <ExamCardList exams={exams!} />;
      break;
    case "Calendar":
      // return <EventsCalendarView events={events!} />;
      break;

    default:
      break;
  }
};

export default ExamsView;
