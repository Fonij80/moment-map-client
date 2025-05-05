import React, { createContext, useContext, useState, ReactNode } from "react";
import { TimelinePreferences } from "@/constants/types";

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
