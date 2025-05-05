import React from "react";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { TimelineEvent } from "@/constants/types";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ShareButtonProps {
  event: TimelineEvent;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ event }) => {
  const shareText = `Check out this life event: ${event.title} - ${format(
    event.date,
    "MMMM d, yyyy"
  )}`;
  const shareUrl = window.location.href;

  const handleShareClick = async (platform: string) => {
    try {
      if (platform === "clipboard") {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        toast.success("Link copied to clipboard!");
      } else if (platform === "twitter") {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
      } else if (platform === "facebook") {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        );
      } else if (platform === "linkedin") {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        );
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleShareClick("clipboard")}>
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShareClick("twitter")}>
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShareClick("facebook")}>
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShareClick("linkedin")}>
          Share on LinkedIn
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
