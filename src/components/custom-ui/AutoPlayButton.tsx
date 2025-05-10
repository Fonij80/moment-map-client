import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";

export const AutoPlayButton = () => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  return (
    <Button
      onClick={toggleAutoPlay}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      {isAutoPlaying ? (
        <>
          <Pause className="h-4 w-4" /> Pause
        </>
      ) : (
        <>
          <Play className="h-4 w-4" /> Auto Play
        </>
      )}
    </Button>
  );
};
