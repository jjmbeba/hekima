"use client";

import { Tables } from "@/database-types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Loader, MoreHorizontal } from "lucide-react";

import { checkIfUserIsAdmin } from "@/app/(auth)/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
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
} from "@/components/ui/alert-dialog";
import { deleteEvent } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import EditEventForm from "../forms/EditEventForm";
import { useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Event = Tables<"events">;

export const columns: ColumnDef<Event>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "type",
    header: "Event type",
    cell: ({ row }) => {
      const { type } = row.original;

      return (
        <Badge
          variant={"outline"}
          className={
            type === "mandatory"
              ? "text-green-600 border-green-600"
              : "text-orange-600 border-orange-600"
          }
        >
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const event = row.original;

      return <ActionsMenu event={event} />;
    },
  },
];

const ActionsMenu = ({ event }: { event: Tables<"events"> }) => {
  const router = useRouter();
  const [editMenuOpen, setEditMenuOpen] = useState(false);

  const { data: isUserAdmin } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      return await checkIfUserIsAdmin();
    },
  });

  const { mutate, isPending: isDeleteEventPending } = useMutation({
    mutationKey: ["events"],
    mutationFn: (eventID: number) => deleteEvent(eventID),
    onError: (error) => {
      toast.error(error.message);
    },
    onMutate: () => {
      toast(
        <div className="flex items-center">
          <Loader className="mr-2 h-4 w-4 animate-spin" /> Deleting event...
        </div>,
        {
          id: "delete-loading",
        }
      );
    },
    onSuccess: () => {
      toast.dismiss("delete-loading");
      toast.success("Event deleted successfully");
      router.refresh();
    },
  });

  if (!isUserAdmin) return;

  return (
    <AlertDialog>
      <Dialog open={editMenuOpen} onOpenChange={setEditMenuOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col">
              <DialogTrigger>
                <DropdownMenuItem>Edit event</DropdownMenuItem>
              </DialogTrigger>
              <AlertDialogTrigger>
                <DropdownMenuItem className="text-destructive">
                  Delete event
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit event &apos;{event.name}&apos;</DialogTitle>
          </DialogHeader>
          <EditEventForm event={event!} setEditMenuOpen={setEditMenuOpen} />
        </DialogContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event &apos;{event.name}&apos; and remove the data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => mutate(event.id)}
              className={`${buttonVariants({
                variant: "destructive",
              })}`}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </Dialog>
    </AlertDialog>
  );
};
