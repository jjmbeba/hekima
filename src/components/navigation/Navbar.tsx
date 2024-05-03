"use client";

import { MoveRight } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";
import Logo from "../common/Logo";
import { Button } from "../ui/button";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const excludedPaths = ["/login", "/signup", "/dashboard"];

  if (excludedPaths.includes(pathname)) return;

  return (
    <div className="flex items-center justify-between p-8">
      <Logo />
      <div className="flex items-center gap-5">
        <div className="mr-6">
          <ModeToggle />
        </div>
        <Button asChild>
          <Link href={"/signup"}>
            <MoveRight className="mr-2 h-4 w-4" />
            Get Started
          </Link>
        </Button>
        <Button variant={"secondary"}>
          <Link href={"/login"}>Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
