"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import AddExamForm from "../forms/AddExamForm";

const AddExamButton = () => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({
            variant: "default",
          })
        )}
      >
        Add exam
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new exam</DialogTitle>
        </DialogHeader>
        <AddExamForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddExamButton;
