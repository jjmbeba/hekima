import { Tables } from "@/database-types";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";

type Props = {
  exams: Tables<"exams">[];
};

const ExamsTable = ({ exams }: Props) => {
  return (
    <div className="container mx-auto py-3">
      <DataTable columns={columns} data={exams} />
    </div>
  );
};

export default ExamsTable;
