export interface TimelineEvent {
  id: string;
  title: string;
  date: Date;
  description: string;
  location: string;
  imageUrl: string | null;
  videoUrl?: string | null;
  audioUrl?: string | null;
  mediaType?: "image" | "video" | "audio" | null;
}

export interface EventContextType {
  events: TimelineEvent[];
  addEvent: (event: Omit<TimelineEvent, "id">) => void;
  removeEvent: (id: string) => void;
  getSortedEvents: () => TimelineEvent[];
  activeEvent: TimelineEvent | null;
  setActiveEvent: (event: TimelineEvent | null) => void;
  getEventPosition: (eventId: string) => number;
}

export interface DateSelection {
  year: number;
  month: number;
  day?: number;
}

export interface TimelinePreferences {
  orientation: "horizontal" | "vertical";
  theme: {
    background: string;
    fontColor: string;
    accentColor: string;
  };
  fontFamily: string;
  backgroundMusic?: {
    type: "preset" | "custom";
    url: string;
    name: string;
  } | null;
}
