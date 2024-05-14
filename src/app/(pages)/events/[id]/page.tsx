import SingleEventPage from "@/components/events/SingleEventPage";
import { fetchSingleEvent } from "@/components/events/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
};
const page = async ({ params }: { params: { id: string } }) => {
  const event = await fetchSingleEvent(parseInt(params.id));

  return <SingleEventPage event={event} />;
};

export default page;
