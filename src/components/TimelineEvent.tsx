import React from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TimelineEvent as TimelineEventType } from "@/constants/types";
import { ShareButton } from "./ShareButton";
import { useSettings } from "@/contexts/SettingsContext";

interface TimelineEventProps {
  event: TimelineEventType;
  active?: boolean;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({
  event,
  active = false,
}) => {
  const { preferences } = useSettings();

  const renderMedia = () => {
    if (event.mediaType === "image" && event.imageUrl) {
      return (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      );
    } else if (event.mediaType === "video" && event.videoUrl) {
      return (
        <div className="relative w-full h-48 overflow-hidden">
          <video
            src={event.videoUrl}
            controls
            className="w-full h-full object-cover"
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
      // Legacy support for older events with just imageUrl
      return (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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
        className={`overflow-hidden border border-border shadow-sm ${preferences.fontFamily}`}
      >
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
        <CardFooter className="flex justify-end border-t bg-muted/50 py-3">
          <ShareButton event={event} />
        </CardFooter>
      </Card>
    </div>
  );
};
