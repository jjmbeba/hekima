import { Tables } from "@/database-types";
import ClassCard from "./ClassCard";

const ClassesCardList = ({ classes }: { classes: Tables<"classes">[] }) => {
  return (
    <div className="grid md:grid-cols-4 sm:gap-4 mt-8">
      {classes?.map((cls) => (
        <ClassCard key={cls.id} {...cls} />
      ))}
    </div>
  );
};

export default ClassesCardList;
