import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/database.types";
import dayjs from "dayjs";

type Props = Tables<"events">;
export default function EventCard({ name, date, description, location }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">{description}</div>
        <p className="text-sm text-muted-foreground mt-2 font-medium">
          @ {location}
        </p>
        <p className="text-xs text-muted-foreground">
          {dayjs(date).format("ddd, D MMM YYYY")}
        </p>
      </CardContent>
    </Card>
  );
}
