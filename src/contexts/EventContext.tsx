import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { TimelineEvent, EventContextType } from "@/constants/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

const EventContext = createContext<EventContextType | undefined>(undefined);

// Sample events for demo purposes
const sampleEvents: TimelineEvent[] = [
  {
    id: uuidv4(),
    title: "Started College",
    date: new Date("2015-09-01"),
    description:
      "Began my journey in Computer Science at University of Technology.",
    location: "Boston, MA",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: uuidv4(),
    title: "First Job",
    date: new Date("2019-06-15"),
    description:
      "Started as a Junior Developer at TechCorp, working on frontend applications.",
    location: "San Francisco, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: uuidv4(),
    title: "Got Married",
    date: new Date("2022-04-22"),
    description: "Tied the knot with my best friend after 5 years together.",
    location: "Lake Tahoe, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  },
];

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<TimelineEvent[]>(() => {
    const savedEvents = localStorage.getItem("timeline-events");
    if (savedEvents) {
      try {
        // Parse the dates from strings back to Date objects
        const parsedEvents = JSON.parse(savedEvents);
        return parsedEvents.map((event: any) => ({
          ...event,
          date: new Date(event.date),
        }));
      } catch (error) {
        console.error("Failed to parse saved events:", error);
        return sampleEvents;
      }
    }
    return sampleEvents;
  });

  const [activeEvent, setActiveEvent] = useState<TimelineEvent | null>(null);

  const addEvent = (eventData: Omit<TimelineEvent, "id">) => {
    const newEvent = {
      ...eventData,
      id: uuidv4(),
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);

    // Save to localStorage
    try {
      localStorage.setItem("timeline-events", JSON.stringify(updatedEvents));
      toast.success("Event added successfully");
    } catch (error) {
      console.error("Failed to save events:", error);
      toast.error("Failed to save event");
    }
  };

  const getSortedEvents = () => {
    return [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const getEventPosition = (eventId: string): number => {
    const sortedEvents = getSortedEvents();
    const index = sortedEvents.findIndex((event) => event.id === eventId);
    return index >= 0 ? index : 0;
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        getSortedEvents,
        activeEvent,
        setActiveEvent,
        getEventPosition,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};
