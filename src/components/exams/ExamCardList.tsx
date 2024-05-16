import { Tables } from "@/database-types";
import ExamCard from "./ExamCard";

const ExamCardList = ({ exams }: { exams: Tables<"exams">[] }) => {
  return (
    <div className="grid md:grid-cols-4 sm:gap-4 mt-8">
      {exams?.map((exam) => (
        <ExamCard key={exam.id} {...exam} />
      ))}
    </div>
  );
};

export default ExamCardList;
