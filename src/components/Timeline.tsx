import { useState, useEffect, useRef, useCallback } from "react";
import { useEvents } from "@/contexts/EventContext";
import { TimelineEvent } from "./TimelineEvent";
import { useSettings } from "@/contexts/SettingsContext";
import { HorizontalTimeline } from "./timeline/HorizontalTimeline";
import { VerticalTimeline } from "./timeline/VerticalTimeline";
import { ShareButton, ExportButton, PrintButton } from "./custom-ui";
import { AutoPlayButton, FullScreenButton } from "./custom-ui";

export const Timeline = () => {
  const { getSortedEvents, activeEvent, setActiveEvent, removeEvent } =
    useEvents();
  const { preferences } = useSettings();
  const sortedEvents = getSortedEvents();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const autoPlayIntervalRef = useRef<number | null>(null);

  const themeClasses = `${preferences.theme.background} ${preferences.theme.fontColor}`;
  const accent = preferences.theme.accentColor;

  // No events case
  if (sortedEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-2xl font-medium text-gray-700 mb-3">
          No events yet
        </h3>
        <p className="text-muted-foreground">
          Add your first life event using the form above.
        </p>
      </div>
    );
  }

  const goToNextEvent = useCallback(() => {
    setSliderPosition((prevPosition) => {
      const nextPosition = prevPosition + 1;
      if (nextPosition < sortedEvents.length) {
        setActiveEvent(sortedEvents[nextPosition]);
        return nextPosition;
      } else {
        // If we've reached the end, stop autoplay and stay at the last position
        setIsAutoPlaying(false);
        return prevPosition;
      }
    });
  }, [sortedEvents, setActiveEvent]);

  useEffect(() => {
    if (sortedEvents.length > 0 && !activeEvent) {
      setActiveEvent(sortedEvents[0]);
      setSliderPosition(0);
    }
  }, [sortedEvents, activeEvent, setActiveEvent]);

  useEffect(() => {
    // Handle auto-play animation
    if (isAutoPlaying) {
      autoPlayIntervalRef.current = window.setInterval(() => {
        goToNextEvent();
      }, 3000); // Change event every 3 seconds
    } else if (autoPlayIntervalRef.current !== null) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }

    // Cleanup on component unmount
    return () => {
      if (autoPlayIntervalRef.current !== null) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isAutoPlaying, goToNextEvent]);

  useEffect(() => {
    // Play background music when available
    if (preferences.backgroundMusic?.url) {
      const audio = new Audio(preferences.backgroundMusic.url);
      audio.loop = true;

      if (isAutoPlaying) {
        audio.play().catch((e) => console.log("Audio play prevented:", e));
      } else {
        audio.pause();
      }

      return () => {
        audio.pause();
      };
    }
  }, [preferences.backgroundMusic, isAutoPlaying]);

  return (
    <div
      className={`w-full mt-10 mb-16 ${
        preferences.orientation === "vertical" ? "timeline-vertical" : ""
      }`}
    >
      {/* Controls */}
      <div className="flex justify-center mt-12 mb-4 gap-2">
        <AutoPlayButton />
        <FullScreenButton />
      </div>
      {preferences.orientation === "horizontal" ? (
        <HorizontalTimeline />
      ) : (
        <VerticalTimeline />
      )}

      {/* Active event display for screen */}
      <div className="px-4 print:hidden">
        {activeEvent && (
          <TimelineEvent
            event={activeEvent}
            active={true}
            onDelete={removeEvent}
          />
        )}
      </div>

      {/* Print-only view - shows all events sequentially */}
      <div className="hidden print:block">
        <h2 className="text-2xl font-bold mb-6">Timeline Events</h2>
        {sortedEvents.map((event) => (
          <div key={`print-${event.id}`} className="mb-8 timeline-event">
            <TimelineEvent event={event} active={true} onDelete={removeEvent} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12 mb-4 gap-2">
        {/* <ShareButton event={event} /> */}
        <ExportButton />
        <PrintButton />
      </div>
    </div>
  );
};
