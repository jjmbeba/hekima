import { Tables } from "@/database-types";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";

type Props = {
  classes: Tables<"classes">[];
};

const ClassesTable = ({ classes }: Props) => {
  return (
    <div className="container mx-auto py-3">
      <DataTable columns={columns} data={classes} />
    </div>
  );
};

export default ClassesTable;
