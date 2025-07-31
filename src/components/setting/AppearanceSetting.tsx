import {
  useSettings,
  themePresets,
  fontOptions,
} from "@/contexts/SettingsContext";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Palette } from "lucide-react";

export const AppearanceSetting = () => {
  const {
    updatePreferences,
    selectedTheme,
    setSelectedTheme,
    selectedFont,
    setSelectedFont,
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

  return (
    <TabsContent value="appearance" className="space-y-6 mt-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Theme</h3>
        <div className="grid grid-cols-2 gap-3">
          {themePresets.map((theme) => (
            <Button
              key={theme.name}
              type="button"
              variant={selectedTheme === theme.name ? "default" : "outline"}
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
        </div>
        {/* <Button
          variant="outline"
          className="justify-start gap-2 opacity-50"
          disabled
        >
          <Palette className="w-6 h-6" />
          Custom (Coming Soon)
        </Button> */}
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
              <RadioGroupItem value={font.name} id={`font-${font.name}`} />
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
  );
};
