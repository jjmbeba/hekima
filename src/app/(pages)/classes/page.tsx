import { checkIfUserIsAdmin } from "@/app/(auth)/actions";
import AddClassButton from "@/components/classes/AddClassButton";
import ClassesView from "@/components/classes/ClassesView";
import { fetchAllClasses } from "@/components/classes/actions";
import ViewOptions from "@/components/common/ViewOptions";
import { Ghost } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:"Classes"
}

const page = async () => {
  const classes = await fetchAllClasses();
  const isUserAdmin = await checkIfUserIsAdmin();

  return (
    <div>
      {classes?.length === 0 ? (
        <div className="mt-8">
          <div className="flex justify-end">{/* <AddEventButton /> */}</div>
          <div className="w-full min-h-[69vh] flex items-center justify-center">
            <Ghost className="w-28 h-28 ml-10" />
            <h1 className="text-2xl font-bold">No available classes.</h1>
          </div>
        </div>
      ) : (
        <div className="sm:py-4 sm:px-14">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">
              Available classes ({classes?.length})
            </h1>
            <ViewOptions />
          </div>
          {isUserAdmin ? (
            <div className="flex justify-end mt-5">
              <AddClassButton />
            </div>
          ) : null}
          <ClassesView classes={classes!} />
        </div>
      )}
    </div>
  );
};

export default page;
