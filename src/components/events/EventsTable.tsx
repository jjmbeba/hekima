import { Tables } from "@/database.types";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";

type Props = {
  events: Tables<"events">[];
};

const EventsTable = ({ events }: Props) => {
  return (
    <div className="container mx-auto py-3">
      <DataTable columns={columns} data={events} />
    </div>
  );
};

export default EventsTable;
