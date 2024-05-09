"use client";

import { Calendar } from "@/components/ui/calendar";
import React from "react";

const EventCalendar = ({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) => {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
      classNames={{
        day_selected:
          "relative after:absolute after:content-[''] after:h-1 after:w-1 after:bg-green-600 after:rounded-full after:bottom-1",
      }}
    />
  );
};

export default EventCalendar;
