"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import dayjs from "dayjs";
import { Tables } from "@/database-types";
import { Badge } from "../ui/badge";
import { useEventStore } from "@/stores/store";

type Props = Tables<"events"> & {
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

const MiniEventCard = ({ id, name, location, date, type, setDate }: Props) => {
  const [selectedEventID, setSelectedEventID] = useEventStore((state) => [
    state.selectedEventID,
    state.setSelectedEventID,
  ]);

  return (
    <Card
      className={`cursor-pointer opacity-50 hover:opacity-100 ${
        selectedEventID === id ? "opacity-100" : ""
      }`}
      onClick={() => {
        setDate(new Date(Date.parse(date)));
        setSelectedEventID(id);
      }}
    >
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
        <Badge
          variant={"outline"}
          className={
            type === "mandatory"
              ? "text-green-600 border-green-600"
              : "text-orange-600 border-orange-600"
          }
        >
          {type}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground font-medium">
          @ {location}
        </p>
        <p className="text-xs text-muted-foreground">
          {dayjs(date).format("ddd, D MMM YYYY")}
        </p>
      </CardContent>
    </Card>
  );
};

export default MiniEventCard;
