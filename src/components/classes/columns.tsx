"use client";

import { Tables } from "@/database-types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Loader, LucideProps, MoreHorizontal } from "lucide-react";

import { checkIfUserIsAdmin } from "@/app/(auth)/actions";
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
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { deleteClass } from "./actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Class = Tables<"classes">;

export const columns: ColumnDef<Class>[] = [
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const cls = row.original;

      return <ActionsMenu cls={cls} icon={MoreHorizontal} />;
    },
  },
];

export const ActionsMenu = ({
  cls,
  icon: Icon,
}: {
  cls: Tables<"classes">;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}) => {
  const router = useRouter();
  const [editMenuOpen, setEditMenuOpen] = useState(false);

  const { data: isUserAdmin } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      return await checkIfUserIsAdmin();
    },
  });

  const { mutate, isPending: isDeleteClassPending } = useMutation({
    mutationKey: ["classes"],
    mutationFn: (classID: number) => deleteClass(classID),
    onError: (error) => {
      toast.error(error.message);
    },
    onMutate: () => {
      toast(
        <div className="flex items-center">
          <Loader className="mr-2 h-4 w-4 animate-spin" /> Deleting class...
        </div>,
        {
          id: "delete-loading",
        }
      );
    },
    onSuccess: () => {
      toast.dismiss("delete-loading");
      toast.success("Class deleted successfully");
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
              <Icon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col">
              <DialogTrigger>
                <DropdownMenuItem>Edit class</DropdownMenuItem>
              </DialogTrigger>
              <AlertDialogTrigger>
                <DropdownMenuItem className="text-destructive">
                  Delete class
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit event &apos;{cls.name}&apos;</DialogTitle>
          </DialogHeader>
          {/* <EditEventForm event={class!} setEditMenuOpen={setEditMenuOpen} /> */}
        </DialogContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event &apos;{cls.name}&apos; and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => mutate(cls.id)}
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
