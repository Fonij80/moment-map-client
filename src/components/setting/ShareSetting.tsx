import { useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Share, Lock, Unlock, Key } from "lucide-react";

export const ShareSetting = () => {
  const { shareSettings, updateShareSettings } = useSettings();
  const [sharePassword, setSharePassword] = useState("");

  const handleVisibilityChange = (
    visibility: "public" | "private" | "password-protected"
  ) => {
    if (updateShareSettings) {
      updateShareSettings({ ...shareSettings, visibility });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSharePassword(e.target.value);
  };

  const savePassword = () => {
    if (updateShareSettings && sharePassword) {
      updateShareSettings({
        ...shareSettings,
        password: sharePassword,
        visibility: "password-protected",
      });
    }
  };

  return (
    <TabsContent value="sharing" className="space-y-6 mt-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Visibility Settings</h3>
        <RadioGroup
          value={shareSettings?.visibility || "public"}
          onValueChange={(value) =>
            handleVisibilityChange(
              value as "public" | "private" | "password-protected"
            )
          }
          className="flex flex-col gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="public" id="visibility-public" />
            <Label
              htmlFor="visibility-public"
              className="flex items-center gap-2"
            >
              <Unlock className="h-4 w-4" /> Public (Anyone can view)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="private" id="visibility-private" />
            <Label
              htmlFor="visibility-private"
              className="flex items-center gap-2"
            >
              <Lock className="h-4 w-4" /> Private (Only you can view)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="password-protected"
              id="visibility-password"
            />
            <Label
              htmlFor="visibility-password"
              className="flex items-center gap-2"
            >
              <Key className="h-4 w-4" /> Password Protected
            </Label>
          </div>
        </RadioGroup>

        {shareSettings?.visibility === "password-protected" && (
          <div className="pt-2">
            <Label htmlFor="share-password" className="mb-2 block">
              Set Password
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="share-password"
                type="password"
                value={sharePassword}
                onChange={handlePasswordChange}
                placeholder="Enter password for sharing"
              />
              <Button size="sm" onClick={savePassword}>
                Save
              </Button>
            </div>
          </div>
        )}

        {shareSettings?.shareUrl && (
          <div className="pt-2">
            <Label className="mb-2 block">Share URL</Label>
            <div className="flex items-center gap-2">
              <Input
                value={shareSettings.shareUrl}
                readOnly
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <Button
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(shareSettings.shareUrl);
                  // You would normally use a toast here
                  alert("URL copied to clipboard!");
                }}
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </TabsContent>
  );
};
