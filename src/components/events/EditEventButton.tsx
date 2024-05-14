"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import EditEventForm from "../forms/EditEventForm";
import { Tables } from "@/database-types";
import { Button } from "../ui/button";

const EditEventButton = ({ event }: { event: Tables<"events"> }) => {
  const [editMenuOpen, setEditMenuOpen] = useState(false);

  return (
    <Dialog open={editMenuOpen} onOpenChange={setEditMenuOpen}>
      <DialogTrigger>
        <Button size="sm">Edit Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit event &apos;{event.name}&apos;</DialogTitle>
        </DialogHeader>
        <EditEventForm event={event!} setEditMenuOpen={setEditMenuOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default EditEventButton;
