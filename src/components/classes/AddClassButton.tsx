"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

import AddClassForm from "../forms/AddClassForm";

const AddClassButton = () => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({
            variant: "default",
          })
        )}
      >
        Add new class
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new class</DialogTitle>
        </DialogHeader>
        <AddClassForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddClassButton;
