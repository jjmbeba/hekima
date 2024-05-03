"use client";

import { Loader, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { redirect } from "next/navigation";
import { logout } from "@/app/(auth)/actions";
import { toast } from "sonner";

const UserMenu = () => {
  const supabase = createClient();

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!data.user) redirect("/login");

      return data;
    },
  });

  const { mutate: logoutUser } = useMutation({
    mutationKey: ["user"],
    mutationFn: logout,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("User logout successful");
    },
    onMutate: () => {
      toast(
        <div className="flex items-center">
          <Loader className="animate-spin mr-2 h-4 w-4" /> Logging out...
        </div>,
        {
          id: "logout-begin",
          duration: 100000,
        }
      );
    },
    onSettled: () => {
      toast.dismiss("logout-begin");
    },
  });

  return (
    <div>
      {isUserLoading ? (
        <Skeleton className="rounded-full w-9 h-9" />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logoutUser()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default UserMenu;
