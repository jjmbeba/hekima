import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/database.types";
import dayjs from "dayjs";
import { Link } from "next-view-transitions";
import { Badge } from "../ui/badge";

type Props = Tables<"events">;
export default function EventCard({
  id,
  name,
  date,
  description,
  location,
  status
}: Props) {
  return (
    <Link href={`/events/${id}`}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{name}</CardTitle>
          <Badge variant={'outline'} className={status === 'mandatory' ? 'text-green-600 border-green-600' : 'text-orange-600 border-orange-600'}>
            {status}
          </Badge>
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
    </Link>
  );
}
