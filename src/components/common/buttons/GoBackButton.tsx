"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const GoBackButton = () => {
  const router = useRouter();

  return (
    <Button size={"icon"} variant={"outline"} onClick={() => router.back()}>
      <ChevronLeft className="h-7 w-7" />
      <span className="sr-only">Back</span>{" "}
    </Button>
  );
};

export default GoBackButton;
