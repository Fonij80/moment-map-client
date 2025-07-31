import React from "react";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ShareButtonProps {
  timelineUrl: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ timelineUrl }) => {
  const { t } = useTranslation();
  const shareText = `Check out this life timeline: ${timelineUrl}`;

  const handleShareClick = async (platform: string) => {
    try {
      if (platform === "clipboard") {
        await navigator.clipboard.writeText(`${shareText}`);
        toast.success("Link copied to clipboard!");
      } else if (platform === "twitter") {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(timelineUrl)}`,
          "_blank"
        );
      } else if (platform === "telegram") {
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(
            timelineUrl
          )}&text=${encodeURIComponent(shareText)}`,
          "_blank"
        );
      } else if (platform === "facebook") {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            timelineUrl
          )}`,
          "_blank"
        );
      } else if (platform === "linkedin") {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            timelineUrl
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
          {t("Share Timeline")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleShareClick("clipboard")}>
          {t("Copy Link")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShareClick("twitter")}>
          {t("Share on Twitter")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShareClick("telegram")}>
          {t("Share on Telegram")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShareClick("facebook")}>
          {t("Share on Facebook")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShareClick("linkedin")}>
          {t("Share on LinkedIn")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
