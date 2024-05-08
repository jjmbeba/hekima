import ViewOptions from "@/components/common/ViewOptions";
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

  return (
    <div>
      {events?.length === 0 ? (
        <div className="w-full min-h-screen flex items-center justify-center">
          <Ghost className="w-28 h-28 ml-10" />
          <h1 className="text-2xl font-bold">No available events.</h1>
        </div>
      ) : (
        <div className="sm:py-4 sm:px-14">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">
              Available events ({events?.length})
            </h1>
            <ViewOptions />
          </div>
          <EventsView events={events!}/>
        </div>
      )}
    </div>
  );
};

export default page;