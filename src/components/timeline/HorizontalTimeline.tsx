import React, { useState, useRef } from "react";
import { EventDate } from "../event/EventDate";
import { useEvents } from "@/contexts/EventContext";

export const HorizontalTimeline = () => {
  const { getSortedEvents, activeEvent, setActiveEvent } = useEvents();
  const sortedEvents = getSortedEvents();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const position = parseInt(e.target.value, 10);
    setSliderPosition(position);

    // Update active event based on slider position
    if (position < sortedEvents.length) {
      setActiveEvent(sortedEvents[position]);
    }
  };

  return (
    <div ref={timelineRef} className="relative mb-10 px-4 print:hidden">
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
          <EventDate
            key={`label-${event.id}`}
            id={event.id}
            date={event.date}
            index={index}
            length={sortedEvents.length}
          />
        ))}
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
  );
};
