import { fetchSingleEvent } from "@/components/events/actions";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

import { checkIfUserIsAdmin } from "@/app/(auth)/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tables } from "@/database-types";
import dayjs from "dayjs";
import { Link } from "next-view-transitions";
import EditEventButton from "@/components/events/EditEventButton";
import DeleteEventButton from "@/components/events/DeleteEventButton";

export const metadata: Metadata = {
  title: "Events",
};
const page = async ({ params }: { params: { id: string } }) => {
  const event = await fetchSingleEvent(parseInt(params.id));
  const isUserAdmin = await checkIfUserIsAdmin();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link href={"/events"}>
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-semibold tracking-tight sm:grow-0">
                {event.name}
              </h1>
              {isUserAdmin && (
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <EditEventButton event={event} />
                  <DeleteEventButton event={event} />
                </div>
              )}
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                    <CardDescription>
                      General details of the event
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          value={event.name}
                          disabled
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={event.description}
                          className="min-h-32"
                          disabled
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Event Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Type</Label>
                        <Select disabled value={event.type}>
                          <SelectTrigger id="status" aria-label="Select type">
                            <SelectValue defaultValue={event.type} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mandatory">Mandatory</SelectItem>
                            <SelectItem value="optional">Optional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="w-[25vw]">
                  <CardHeader>
                    <CardTitle>Event Location & Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input
                      value={`@ ${event.location} - ${dayjs(event.date).format(
                        "ddd, D MMM YYYY"
                      )}`}
                      disabled
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button size="sm">Edit Event</Button>
              <Button size="sm" variant={"destructive"}>
                Delete Event
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
