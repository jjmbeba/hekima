"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddEventForm from "../forms/AddEventForm";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const AddEventButton = () => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({
            variant: "default",
            
          })
        )}
      >
        Add event
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new event</DialogTitle>
        </DialogHeader>
        <AddEventForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddEventButton;
