import { useSettings } from "@/contexts/SettingsContext";
import { TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const LayoutSetting = () => {
  const { preferences, updatePreferences } = useSettings();

  const handleOrientationChange = (orientation: "horizontal" | "vertical") => {
    updatePreferences({ orientation });
  };

  return (
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
            <RadioGroupItem value="horizontal" id="orientation-horizontal" />
            <Label htmlFor="orientation-horizontal">Horizontal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vertical" id="orientation-vertical" />
            <Label htmlFor="orientation-vertical">Vertical</Label>
          </div>
        </RadioGroup>
      </div>
    </TabsContent>
  );
};
