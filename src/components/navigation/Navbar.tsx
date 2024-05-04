import { MoveRight } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";
import Logo from "../common/Logo";
import { Button } from "../ui/button";

import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import UserMenu from "../common/UserMenu";

const Navbar = async () => {
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.getUser();

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
              <Link href={"/dashboard"}>Go to Dashboard</Link>
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
