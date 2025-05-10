import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { TimelinePreferences, ShareSettings } from "@/constants/types";

// Default themes
export const themePresets = [
  {
    name: "Default",
    background: "bg-background",
    fontColor: "text-foreground",
    accentColor: "primary",
  },
  {
    name: "Dark",
    background: "bg-slate-900",
    fontColor: "text-white",
    accentColor: "blue",
  },
  {
    name: "Light",
    background: "bg-white",
    fontColor: "text-slate-900",
    accentColor: "emerald",
  },
  {
    name: "Warm",
    background: "bg-amber-50",
    fontColor: "text-amber-900",
    accentColor: "amber",
  },
  {
    name: "Cool",
    background: "bg-blue-50",
    fontColor: "text-blue-900",
    accentColor: "cyan",
  },
  {
    name: "Vintage",
    background: "bg-[#f5f0e6]",
    fontColor: "text-[#854d27]",
    accentColor: "orange",
  },
  {
    name: "Minimal",
    background: "bg-white",
    fontColor: "text-gray-800",
    accentColor: "gray",
  },
  {
    name: "Vibrant",
    background: "bg-purple-900",
    fontColor: "text-pink-100",
    accentColor: "fuchsia",
  },
];

// Font options
export const fontOptions = [
  { name: "Sans", value: "font-sans" },
  { name: "Serif", value: "font-serif" },
  { name: "Mono", value: "font-mono" },
];

// Background music presets
export const musicPresets = [
  { name: "None", url: "" },
  { name: "Ambient", url: "https://example.com/ambient.mp3" },
  { name: "Classical", url: "https://example.com/classical.mp3" },
  { name: "Jazz", url: "https://example.com/jazz.mp3" },
];

// Common life events for onboarding
export const lifeEventSuggestions = [
  {
    title: "First Day at School",
    description: "Your first day at elementary school",
  },
  {
    title: "Graduation Day",
    description: "The day you graduated from high school or college",
  },
  { title: "First Job", description: "Your first professional job" },
  {
    title: "First Trip Abroad",
    description: "Your first international travel experience",
  },
  {
    title: "Moving to a New Home",
    description: "When you moved to a significant place",
  },
  { title: "Wedding Day", description: "Your wedding celebration" },
  { title: "Birth of Child", description: "When your child was born" },
  {
    title: "Major Achievement",
    description: "An important accomplishment in your life",
  },
  {
    title: "Learning to Drive",
    description: "When you got your driver's license",
  },
  { title: "First Pet", description: "When you got your first pet" },
];

interface SettingsContextType {
  preferences: TimelinePreferences;
  updatePreferences: (newPreferences: Partial<TimelinePreferences>) => void;
  selectedTheme: string;
  setSelectedTheme: (themeName: string) => void;
  selectedFont: string;
  setSelectedFont: (fontName: string) => void;
  customMusic: File | null;
  setCustomMusic: (file: File | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  shareSettings: ShareSettings;
  updateShareSettings: (settings: Partial<ShareSettings>) => void;
  generateShareUrl: () => string;
}

const defaultPreferences: TimelinePreferences = {
  orientation: "horizontal",
  theme: {
    background: "bg-background",
    fontColor: "text-foreground",
    accentColor: "primary",
  },
  fontFamily: "font-sans",
  backgroundMusic: null,
};

const defaultShareSettings: ShareSettings = {
  visibility: "public",
  password: "",
  shareUrl: "",
  shareId: "",
};

// Helper function to generate a unique ID - moved above its usage
const generateUniqueId = () => {
  // Simple unique ID generator - in a real app, use a more robust solution
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<TimelinePreferences>(() => {
    const savedPreferences = localStorage.getItem("timeline-preferences");
    if (savedPreferences) {
      try {
        return JSON.parse(savedPreferences);
      } catch (error) {
        console.error("Failed to parse saved preferences:", error);
        return defaultPreferences;
      }
    }
    return defaultPreferences;
  });

  const [shareSettings, setShareSettings] = useState<ShareSettings>(() => {
    const savedSettings = localStorage.getItem("timeline-share-settings");
    if (savedSettings) {
      try {
        return JSON.parse(savedSettings);
      } catch (error) {
        console.error("Failed to parse saved share settings:", error);
        return defaultShareSettings;
      }
    }

    // Generate a unique ID for sharing if not already present
    const newSettings = { ...defaultShareSettings };
    newSettings.shareId = generateUniqueId();
    return newSettings;
  });

  const [selectedTheme, setSelectedTheme] = useState("Default");
  const [selectedFont, setSelectedFont] = useState("Sans");
  const [customMusic, setCustomMusic] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const updatePreferences = (newPreferences: Partial<TimelinePreferences>) => {
    const updatedPreferences = { ...preferences, ...newPreferences };
    setPreferences(updatedPreferences);

    // Save to localStorage
    try {
      localStorage.setItem(
        "timeline-preferences",
        JSON.stringify(updatedPreferences)
      );
    } catch (error) {
      console.error("Failed to save preferences:", error);
    }
  };

  const updateShareSettings = (settings: Partial<ShareSettings>) => {
    const updatedSettings = { ...shareSettings, ...settings };

    // Generate URL if needed
    if (!updatedSettings.shareUrl && updatedSettings.shareId) {
      updatedSettings.shareUrl = generateShareUrl();
    }

    setShareSettings(updatedSettings);

    // Save to localStorage
    try {
      localStorage.setItem(
        "timeline-share-settings",
        JSON.stringify(updatedSettings)
      );
    } catch (error) {
      console.error("Failed to save share settings:", error);
    }
  };

  const generateShareUrl = () => {
    return `${window.location.origin}/timeline/${shareSettings.shareId}`;
  };

  return (
    <SettingsContext.Provider
      value={{
        preferences,
        updatePreferences,
        selectedTheme,
        setSelectedTheme,
        selectedFont,
        setSelectedFont,
        customMusic,
        setCustomMusic,
        isPlaying,
        setIsPlaying,
        shareSettings,
        updateShareSettings,
        generateShareUrl,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
