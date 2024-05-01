import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { MoveRight } from "lucide-react";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import Logo from "../common/Logo";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-8">
      <Logo />
      <div className="flex items-center gap-5">
        <div className="mr-6">
          <ModeToggle />
        </div>
        <SignedOut>
          <Button>
            <MoveRight className="mr-2 h-4 w-4" />
            Get Started
          </Button>
          <Button variant={"secondary"}>Login</Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
