import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/database-types";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Link } from "next-view-transitions";
import { Badge } from "../ui/badge";
import { buttonVariants } from "../ui/button";

type Props = Tables<"exams">;
export default function ExamCard({
  id,
  subject,
  examPeriod,
  examType,
  grade,
  date,
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-start justify-start space-y-1.5">
        <div className="w-full flex items-center justify-between">
          <Link href={`/exams/${id}`}>
            <CardTitle
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "text-lg font-medium pl-0 pt-0"
              )}
            >
              {subject}
            </CardTitle>
          </Link>
          {/* <ActionsMenu
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
          /> */}
        </div>
        <Badge
          variant={"outline"}
          className={"text-green-600 border-green-600"}
        >
          {examType}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mt-2 font-medium">
          @ Grade {grade}
        </p>
        <p className="text-xs text-muted-foreground">
          {dayjs(date).format("ddd, D MMM YYYY")}
        </p>
      </CardContent>
    </Card>
  );
}
