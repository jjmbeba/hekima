"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const GoBackButton = () => {
  const router = useRouter();

  return (
    <Button
      size={"icon"}
      variant={"outline"}
      onClick={() => router.back()}
    >
      <MoveLeft />
    </Button>
  );
};

export default GoBackButton;
