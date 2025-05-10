import React, { useState } from "react";
import { useEvents } from "@/contexts/EventContext";
import { format } from "date-fns";

export const VerticalTimeline = () => {
  const { getSortedEvents, activeEvent, setActiveEvent } = useEvents();
  const sortedEvents = getSortedEvents();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const position = parseInt(e.target.value, 10);
    setSliderPosition(position);

    // Update active event based on slider position
    if (position < sortedEvents.length) {
      setActiveEvent(sortedEvents[position]);
    }
  };

  return (
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
    </div>
  );
};
