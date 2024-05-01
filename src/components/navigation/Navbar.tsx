"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { MoveRight } from "lucide-react";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import Logo from "../common/Logo";
import Link from "next/link";

import { headers } from "next/headers";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Navbar = () => {
  const pathname = usePathname();

  const excludedPaths = ["/login", "/signup"];

  if (excludedPaths.includes(pathname)) return;

  return (
    <div className="flex items-center justify-between p-8">
      <Logo />
      <div className="flex items-center gap-5">
        <div className="mr-6">
          <ModeToggle />
        </div>
        <SignedOut>
          <Button asChild>
            <Link href={"/signup"}>
              <MoveRight className="mr-2 h-4 w-4" />
              Get Started
            </Link>
          </Button>
          <Button variant={"secondary"}>
            <Link href={"/login"}>Login</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
