import React, { useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TimelineEvent as TimelineEventType } from "@/constants/types";
import { useSettings } from "@/contexts/SettingsContext";
import { Trash } from "lucide-react";

interface TimelineEventProps {
  event: TimelineEventType;
  active?: boolean;
  onDelete?: (id: string) => void;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({
  event,
  active = false,
  onDelete,
}) => {
  const { preferences } = useSettings();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (window.innerWidth > 768) {
      setIsHovered(true); // For desktop, show enlarged media
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Reset the enlarged media
  };

  const handleTouchStart = () => {
    if (window.innerWidth <= 768) {
      setIsHovered(true); // For mobile, show enlarged media on tap
    }
  };

  const handleTouchEnd = () => {
    if (window.innerWidth <= 768) {
      setIsHovered(false); // Reset the enlarged media after tap
    }
  };

  const renderMedia = () => {
    if (event.mediaType === "image" && event.imageUrl) {
      return (
        <div
          className="relative w-full h-48 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={event.imageUrl}
            alt={event.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? "scale-150 z-10" : "scale-100"
            }`}
            style={{
              transition: "transform 0.3s ease-in-out",
              zIndex: isHovered ? 10 : "auto",
            }}
          />
        </div>
      );
    } else if (event.mediaType === "video" && event.videoUrl) {
      return (
        <div
          className="relative w-full h-48 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <video
            src={event.videoUrl}
            controls
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? "scale-150 z-10" : "scale-100"
            }`}
            style={{
              transition: "transform 0.3s ease-in-out",
              zIndex: isHovered ? 10 : "auto",
            }}
          />
        </div>
      );
    } else if (event.mediaType === "audio" && event.audioUrl) {
      return (
        <div className="relative w-full p-4 bg-muted/50">
          <audio src={event.audioUrl} controls className="w-full" />
        </div>
      );
    } else if (event.imageUrl) {
      return (
        <div
          className="relative w-full h-48 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={event.imageUrl}
            alt={event.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? "scale-150 z-10" : "scale-100"
            }`}
            style={{
              transition: "transform 0.3s ease-in-out",
              zIndex: isHovered ? 10 : "auto",
            }}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`w-full transition-all duration-300 ${
        active ? "animate-fade-in" : "opacity-0 pointer-events-none"
      }`}
    >
      <Card
        className={`overflow-hidden border border-border shadow-sm ${preferences.fontFamily} relative`}
      >
        {/* Trash icon absolute top-left */}
        {onDelete && (
          <button
            className="absolute z-10 top-1 right-2 bg-white/80 hover:bg-red-100 rounded-full p-1 transition-colors"
            onClick={() => onDelete(event.id)}
            aria-label="Delete event"
            type="button"
          >
            <Trash className="h-5 w-5 text-red-500" />
          </button>
        )}
        {renderMedia()}
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-semibold">
                {event.title}
              </CardTitle>
              <CardDescription>
                {format(event.date, "MMMM d, yyyy")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{event.description}</p>
          {event.location && (
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-medium">Location:</span> {event.location}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
