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
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
// import { deleteEvent } from "./actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { fetchSingleClass } from "../classes/actions";
import EditEventForm from "../forms/EditEventForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { deleteExam } from "./actions";
import EditExamForm from "../forms/EditExamForm";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Exam = Tables<"exams">;

export const columns: ColumnDef<Exam>[] = [
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
    accessorKey: "subject",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subject
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "examType",
    header: "Exam Type",
    cell: ({ row }) => {
      const { examType } = row.original;

      return (
        <Badge
          variant={"outline"}
          className={"text-green-600 border-green-600"}
        >
          {examType}
        </Badge>
      );
    },
  },
  {
    accessorKey: "examPeriod",
    header: "Exam Period",
    cell: ({ row }) => {
      const { examPeriod } = row.original;

      return (
        <Badge
          variant={"outline"}
          className={"text-green-600 border-green-600"}
        >
          {examPeriod}
        </Badge>
      );
    },
  },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => {
      const { grade } = row.original;

      const { data: cls, isLoading:isFetchClassLoading } = useQuery({
        queryKey: ["exams"],
        queryFn: async () => {
          const data = await fetchSingleClass(grade);

          return data;
        },
      });

      return (
        <>
          {isFetchClassLoading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Badge
              variant={"outline"}
              className={"text-green-600 border-green-600"}
            >
              {cls?.name}
            </Badge>
          )}
        </>
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
      const exam = row.original;

      return <ActionsMenu exam={exam} icon={MoreHorizontal} />;
    },
  },
];

export const ActionsMenu = ({
  exam,
  icon: Icon,
}: {
  exam: Tables<"exams">;
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

  const { mutate, isPending: isDeleteExamPending } = useMutation({
    mutationKey: ["exams"],
    mutationFn: (examID: number) => deleteExam(examID),
    onError: (error) => {
      toast.error(error.message);
    },
    onMutate: () => {
      toast(
        <div className="flex items-center">
          <Loader className="mr-2 h-4 w-4 animate-spin" /> Deleting exam...
        </div>,
        {
          id: "delete-loading",
        }
      );
    },
    onSuccess: () => {
      toast.dismiss("delete-loading");
      toast.success("Exam deleted successfully");
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
                <DropdownMenuItem>Edit exam</DropdownMenuItem>
              </DialogTrigger>
              <AlertDialogTrigger>
                <DropdownMenuItem className="text-destructive">
                  Delete exam
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit exam &apos;{exam.subject}&apos;</DialogTitle>
          </DialogHeader>
          <EditExamForm exam={exam!} setEditMenuOpen={setEditMenuOpen} />
        </DialogContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event &apos;{exam.subject}&apos; and remove the data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => mutate(exam.id)}
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
