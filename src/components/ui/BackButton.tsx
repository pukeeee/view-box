// src/components/ui/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "./button";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => router.back()}
      className="select-none focus:outline-none"
    >
      <ArrowLeft className="mr-2 h-5 w-5" />
      Назад
    </Button>
  );
};

export default BackButton;