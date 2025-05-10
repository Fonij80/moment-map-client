import React from "react";
import { useSettings, musicPresets } from "@/contexts/SettingsContext";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Upload } from "lucide-react";

export const AudioSetting = () => {
  const { preferences, updatePreferences, customMusic, setCustomMusic } =
    useSettings();

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
              <RadioGroupItem value={music.name} id={`music-${music.name}`} />
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
              const defaultMusic = musicPresets.find((m) => m.name !== "None");
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
  );
};
