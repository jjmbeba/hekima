import React from "react";
import Link from "next/link";
import { Brain } from "lucide-react";

const Logo = () => {
  return (
    <div className="font-bold text-2xl ">
      <Link href={"/"} className="flex items-center">
        <Brain className="h-8 w-8 mr-3" /> Hekima
      </Link>
    </div>
  );
};

export default Logo;
