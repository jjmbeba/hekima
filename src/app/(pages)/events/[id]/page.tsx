import SingleEventPage from "@/components/events/SingleEventPage";
import { fetchSingleEvent } from "@/components/events/actions";

const page = async ({ params }: { params: { id: string } }) => {
  const event = await fetchSingleEvent(parseInt(params.id));

  return <SingleEventPage event={event} />;
};

export default page;
