import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/database-types";
import { Link } from "next-view-transitions";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ActionsMenu } from "./columns";
import { MoreVertical } from "lucide-react";

type Props = Tables<"classes">;
export default function ClassCard({ id, name, created_at }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-start justify-start space-y-1.5">
        <div className="w-full flex items-center justify-between">
          <Link href={`/classes/${id}`}>
            <CardTitle
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "text-lg font-medium pl-0 pt-0"
              )}
            >
              {name}
            </CardTitle>
          </Link>
          <ActionsMenu
            cls={{
              id,
              name,
              created_at,
            }}
            icon={MoreVertical}
          />
        </div>
      </CardHeader>
    </Card>
  );
}
