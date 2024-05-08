"use client";

import { Calendar } from "@/components/ui/calendar";
import React from "react";

const EventCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border w-96 h-96 "
    />
  );
};

export default EventCalendar;
