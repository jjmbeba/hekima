"use client";

import { MoveRight } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";
import Logo from "../common/Logo";
import { Button } from "../ui/button";

import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import UserMenu from "../common/UserMenu";

const Navbar = () => {
  const pathname = usePathname();

  const excludedPaths = ["/login", "/signup", "/dashboard"];

  if (excludedPaths.includes(pathname)) return;

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase.auth.getUser();

      return data;
    },
  });

  return (
    <div className="flex items-center justify-between p-8">
      <Logo />
      <div className="flex items-center gap-5">
        <div className="mr-6">
          <ModeToggle />
        </div>
        {user?.user ? (
          <div className="flex items-center gap-5">
            <Button asChild>
              <Link href={'/dashboard'}>Go to Dashboard</Link>
            </Button>
            <UserMenu />
          </div>
        ) : (
          <>
            <Button asChild>
              <Link href={"/signup"}>
                <MoveRight className="mr-2 h-4 w-4" />
                Get Started
              </Link>
            </Button>
            <Button variant={"secondary"}>
              <Link href={"/login"}>Login</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
