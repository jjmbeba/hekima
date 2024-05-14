"use client";

import { Tables } from "@/database-types";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button, buttonVariants } from "../ui/button";
import { deleteEvent } from "./actions";

const DeleteEventButton = ({ event }: { event: Tables<"events"> }) => {
  const router = useRouter();

  const { mutate, isPending: isDeleteEventPending } = useMutation({
    mutationKey: ["events"],
    mutationFn: (eventID: number) => deleteEvent(eventID),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Event deleted successfully");
      router.push("/events");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button size="sm" variant={"destructive"}>
          Delete Event
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the event
            &apos;{event.name}&apos; and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              buttonVariants({
                variant: "destructive",
              })
            )}
            onClick={() => mutate(event.id)}
            disabled={isDeleteEventPending}
          >
            {isDeleteEventPending && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEventButton;
