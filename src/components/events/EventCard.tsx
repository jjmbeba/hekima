import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/database-types";
import dayjs from "dayjs";
import { Link } from "next-view-transitions";
import { Badge } from "../ui/badge";
import { ActionsMenu } from "./columns";
import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

type Props = Tables<"events">;
export default function EventCard({
  id,
  name,
  date,
  description,
  location,
  type,
  created_at
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-start justify-start space-y-1.5">
        <div className="w-full flex items-center justify-between">
          <Link href={`/events/${id}`}>
            <CardTitle
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "text-md font-medium pl-0 pt-0"
              )}
            >
              {name}
            </CardTitle>
          </Link>
          <ActionsMenu
            event={{
              id,
              name,
              date,
              description,
              location,
              type,
              created_at,
            }}
            icon={MoreVertical}
          />
        </div>
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
      <CardContent>
        <div className="text-xl font-bold description">{description}</div>
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
