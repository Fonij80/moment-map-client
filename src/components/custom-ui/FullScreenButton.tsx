import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Maximize } from "lucide-react";

export const FullScreenButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <Button
      onClick={() => setIsFullScreen(true)}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <Maximize className="h-4 w-4" /> Full Screen
    </Button>
  );
};
