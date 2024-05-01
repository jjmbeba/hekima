import React from "react";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div>
      <h1>Hekima</h1>
      <div>
        <ModeToggle />
        <Button>Sign up</Button>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Navbar;
