import React from "react";
import {
  useSettings,
  themePresets,
  fontOptions,
  musicPresets,
} from "@/contexts/SettingsContext";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Palette, Upload, Share } from "lucide-react";

export const TimelineSettings = () => {
  const {
    preferences,
    updatePreferences,
    selectedTheme,
    setSelectedTheme,
    selectedFont,
    setSelectedFont,
    customMusic,
    setCustomMusic,
  } = useSettings();

  const handleThemeChange = (themeName: string) => {
    setSelectedTheme(themeName);
    const theme = themePresets.find((t) => t.name === themeName);
    if (theme) {
      updatePreferences({
        theme: {
          background: theme.background,
          fontColor: theme.fontColor,
          accentColor: theme.accentColor,
        },
      });
    }
  };

  const handleFontChange = (fontName: string) => {
    setSelectedFont(fontName);
    const font = fontOptions.find((f) => f.name === fontName);
    if (font) {
      updatePreferences({ fontFamily: font.value });
    }
  };

  const handleOrientationChange = (orientation: "horizontal" | "vertical") => {
    updatePreferences({ orientation });
  };

  const handleMusicChange = (preset: string) => {
    const music = musicPresets.find((m) => m.name === preset);
    if (music) {
      updatePreferences({
        backgroundMusic:
          music.name === "None"
            ? null
            : { type: "preset", url: music.url, name: music.name },
      });
    }
  };

  const handleCustomMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Maximum size is 10MB.");
      return;
    }

    setCustomMusic(file);

    // Create object URL for the uploaded music
    const url = URL.createObjectURL(file);
    updatePreferences({
      backgroundMusic: {
        type: "custom",
        url,
        name: file.name,
      },
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          Settings
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[350px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Timeline Settings</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="appearance" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Theme</h3>
              <div className="grid grid-cols-2 gap-3">
                {themePresets.map((theme) => (
                  <Button
                    key={theme.name}
                    type="button"
                    variant={
                      selectedTheme === theme.name ? "default" : "outline"
                    }
                    className="justify-start gap-2"
                    onClick={() => handleThemeChange(theme.name)}
                  >
                    <div
                      className="rounded-full w-4 h-4"
                      style={{
                        backgroundColor:
                          theme.name === "Default"
                            ? "hsl(var(--primary))"
                            : `rgb(var(--${theme.accentColor}-500))`,
                      }}
                    />
                    {theme.name}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  className="justify-start gap-2 opacity-50"
                  disabled
                >
                  <Palette className="w-4 h-4" />
                  Custom (Coming Soon)
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Font</h3>
              <RadioGroup
                value={selectedFont}
                onValueChange={handleFontChange}
                className="flex flex-col gap-2"
              >
                {fontOptions.map((font) => (
                  <div key={font.name} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={font.name}
                      id={`font-${font.name}`}
                    />
                    <Label
                      htmlFor={`font-${font.name}`}
                      className={`${font.value.replace("font-", "")} text-base`}
                    >
                      {font.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Timeline Orientation</h3>
              <RadioGroup
                value={preferences.orientation}
                onValueChange={(value) =>
                  handleOrientationChange(value as "horizontal" | "vertical")
                }
                className="flex flex-col gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="horizontal"
                    id="orientation-horizontal"
                  />
                  <Label htmlFor="orientation-horizontal">Horizontal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vertical" id="orientation-vertical" />
                  <Label htmlFor="orientation-vertical">Vertical</Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Background Music</h3>
              <RadioGroup
                value={preferences.backgroundMusic?.name || "None"}
                onValueChange={handleMusicChange}
                className="flex flex-col gap-2"
              >
                {musicPresets.map((music) => (
                  <div key={music.name} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={music.name}
                      id={`music-${music.name}`}
                    />
                    <Label htmlFor={`music-${music.name}`}>{music.name}</Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="pt-2">
                <Label htmlFor="custom-music" className="mb-2 block">
                  Upload Custom Music
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="custom-music"
                    type="file"
                    accept="audio/*"
                    onChange={handleCustomMusicUpload}
                  />
                  <Button size="icon" variant="outline">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                {customMusic && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {customMusic.name} (
                    {(customMusic.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )}
              </div>

              {preferences.backgroundMusic && (
                <div className="pt-2">
                  <audio
                    src={preferences.backgroundMusic.url}
                    controls
                    className="w-full mt-2"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="muted-switch"
                checked={!preferences.backgroundMusic}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updatePreferences({ backgroundMusic: null });
                  } else {
                    // Default to first non-None music preset when unmuting
                    const defaultMusic = musicPresets.find(
                      (m) => m.name !== "None"
                    );
                    if (defaultMusic) {
                      updatePreferences({
                        backgroundMusic: {
                          type: "preset",
                          url: defaultMusic.url,
                          name: defaultMusic.name,
                        },
                      });
                    }
                  }
                }}
              />
              <Label htmlFor="muted-switch">Mute background music</Label>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
