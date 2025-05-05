import React, { useState, useEffect, useRef, useCallback } from "react";
import { format } from "date-fns";
import { useEvents } from "@/contexts/EventContext";
import { TimelineEvent as TimelineEventComponent } from "./TimelineEvent";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

export const Timeline = () => {
  const { getSortedEvents, activeEvent, setActiveEvent } = useEvents();
  const { preferences } = useSettings();
  const sortedEvents = getSortedEvents();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const autoPlayIntervalRef = useRef<number | null>(null);

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

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const position = parseInt(e.target.value, 10);
    setSliderPosition(position);

    // Update active event based on slider position
    if (position < sortedEvents.length) {
      setActiveEvent(sortedEvents[position]);
    }
  };

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
    // Initialize with the first event
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

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  return (
    <div
      className={`w-full mt-10 mb-16 ${
        preferences.orientation === "vertical" ? "timeline-vertical" : ""
      }`}
    >
      {preferences.orientation === "horizontal" ? (
        <div className="relative mb-10 px-4 print:hidden">
          {/* Timeline track */}
          <div
            ref={timelineRef}
            className="h-1 bg-timeline-line w-full rounded-full my-8"
          >
            {/* Event dots */}
            {sortedEvents.map((event, index) => {
              const isActive = activeEvent?.id === event.id;
              return (
                <button
                  key={event.id}
                  className={`absolute w-4 h-4 rounded-full -mt-1.5 transform -translate-x-1/2 transition-all duration-300 cursor-pointer
                    ${
                      isActive
                        ? "bg-timeline-activeDot scale-125"
                        : "bg-timeline-dot"
                    }`}
                  style={{
                    left: `${(index / (sortedEvents.length - 1)) * 100}%`,
                  }}
                  onClick={() => {
                    setActiveEvent(event);
                    setSliderPosition(index);
                    // Stop auto-playing when clicking on a dot manually
                    if (isAutoPlaying) {
                      setIsAutoPlaying(false);
                    }
                  }}
                  aria-label={`View event: ${event.title}`}
                />
              );
            })}

            {/* Date labels */}
            {sortedEvents.map((event, index) => (
              <div
                key={`label-${event.id}`}
                className="absolute text-xs text-gray-600 transform -translate-x-1/2 mt-4 text-center"
                style={{
                  left: `${(index / (sortedEvents.length - 1)) * 100}%`,
                  minWidth: "60px",
                }}
              >
                {format(event.date, "MMM yyyy")}
              </div>
            ))}
          </div>

          {/* Auto-play controls */}
          <div className="flex justify-center mt-12 mb-4">
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
          </div>

          {/* Slider */}
          <input
            type="range"
            min={0}
            max={sortedEvents.length - 1}
            value={sliderPosition}
            onChange={handleSliderChange}
            className="timeline-slider absolute top-0 left-0 w-full h-8 opacity-0 cursor-pointer"
            aria-label="Timeline slider"
          />
        </div>
      ) : (
        <div className="relative flex mb-10 print:hidden">
          {/* Vertical timeline */}
          <div className="w-1 bg-timeline-line rounded-full my-4 mx-auto h-[600px] relative">
            {sortedEvents.map((event, index) => {
              const isActive = activeEvent?.id === event.id;
              const position = `${(index / (sortedEvents.length - 1)) * 100}%`;

              return (
                <React.Fragment key={event.id}>
                  <button
                    className={`absolute w-4 h-4 rounded-full -ml-1.5 transform -translate-y-1/2 transition-all duration-300 cursor-pointer
                      ${
                        isActive
                          ? "bg-timeline-activeDot scale-125"
                          : "bg-timeline-dot"
                      }`}
                    style={{
                      top: position,
                    }}
                    onClick={() => {
                      setActiveEvent(event);
                      setSliderPosition(index);
                      if (isAutoPlaying) {
                        setIsAutoPlaying(false);
                      }
                    }}
                    aria-label={`View event: ${event.title}`}
                  />

                  <div
                    className={`absolute text-xs text-gray-600 left-6 transform -translate-y-1/2 ${
                      index % 2 === 0 ? "ml-4" : "mr-4 -left-24 text-right"
                    }`}
                    style={{
                      top: position,
                      minWidth: "60px",
                    }}
                  >
                    {format(event.date, "MMM yyyy")}
                  </div>
                </React.Fragment>
              );
            })}

            {/* Vertical slider */}
            <input
              type="range"
              min={0}
              max={sortedEvents.length - 1}
              value={sliderPosition}
              onChange={handleSliderChange}
              className="timeline-slider-vertical absolute top-0 left-0 h-full w-8 opacity-0 cursor-pointer"
              style={{
                writingMode: "vertical-lr",
                WebkitAppearance: "slider-vertical",
              }}
              aria-label="Timeline slider"
            />
          </div>

          {/* Auto-play controls for vertical timeline */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
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
          </div>
        </div>
      )}

      {/* Active event display for screen */}
      <div className="px-4 print:hidden">
        {activeEvent && (
          <TimelineEventComponent event={activeEvent} active={true} />
        )}
      </div>

      {/* Print-only view - shows all events sequentially */}
      <div className="hidden print:block">
        <h2 className="text-2xl font-bold mb-6">Timeline Events</h2>
        {sortedEvents.map((event) => (
          <div key={`print-${event.id}`} className="mb-8 timeline-event">
            <TimelineEventComponent event={event} active={true} />
          </div>
        ))}
      </div>
    </div>
  );
};
