import { checkIfUserIsAdmin } from "@/app/(auth)/actions";
import ViewOptions from "@/components/common/ViewOptions";
import AddExamButton from "@/components/exams/AddExamButton";
import ExamsView from "@/components/exams/ExamsView";
import { fetchAllExams } from "@/components/exams/actions";
import { Ghost } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exams",
};

const page = async () => {
  const exams = await fetchAllExams();

  const isUserAdmin = await checkIfUserIsAdmin();

  return (
    <div>
      {exams?.length === 0 ? (
        <div className="mt-8">
          <div className="flex justify-end">
            {isUserAdmin && <AddExamButton />}
          </div>
          <div className="w-full min-h-[69vh] flex items-center justify-center">
            <Ghost className="w-28 h-28 ml-10" />
            <h1 className="text-2xl font-bold">No exams found.</h1>
          </div>
        </div>
      ) : (
        <div className="sm:py-4 sm:px-14">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">Exams ({exams?.length})</h1>
            <ViewOptions />
          </div>
          {isUserAdmin ? (
            <div className="flex justify-end mt-5">
              <AddExamButton />
            </div>
          ) : null}
          <ExamsView exams={exams!} />
        </div>
      )}
    </div>
  );
};

export default page;
