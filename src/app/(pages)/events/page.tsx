import { checkIfUserIsAdmin } from "@/app/(auth)/actions";
import ViewOptions from "@/components/common/ViewOptions";
import AddEventButton from "@/components/events/AddEventButton";
import EventsView from "@/components/events/EventsView";
import { createClient } from "@/utils/supabase/server";
import { Ghost } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
};

const page = async () => {
  const supabase = createClient();

  const { data: events, error } = await supabase.from("events").select("*");

  const isUserAdmin = await checkIfUserIsAdmin();

  return (
    <div>
      {events?.length === 0 ? (
        <div className="mt-8">
          <div className="flex justify-end">
            <AddEventButton />
          </div>
          <div className="w-full min-h-screen flex items-center justify-center">
            <Ghost className="w-28 h-28 ml-10" />
            <h1 className="text-2xl font-bold">No available events.</h1>
          </div>
        </div>
      ) : (
        <div className="sm:py-4 sm:px-14">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">
              Available events ({events?.length})
            </h1>
            <ViewOptions />
          </div>
          {isUserAdmin ? (
            <div className="flex justify-end mt-5">
              <AddEventButton />
            </div>
          ) : null}
          <EventsView events={events!} />
        </div>
      )}
    </div>
  );
};

export default page;
