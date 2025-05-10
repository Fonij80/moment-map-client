import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import {
  AppearanceSetting,
  LayoutSetting,
  AudioSetting,
  ShareSetting,
} from "./setting";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export const TimelineSettings = () => {
  const { t } = useTranslation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          {t("setting.setting_btn")}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[350px] sm:w-[540px] overflow-y-auto p-8">
        <SheetHeader>
          <SheetTitle>{t("setting.title")}</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="appearance" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appearance">
              {t("setting.tabs.appearance")}
            </TabsTrigger>
            <TabsTrigger value="layout">{t("setting.tabs.layout")}</TabsTrigger>
            <TabsTrigger value="audio">{t("setting.tabs.audio")}</TabsTrigger>
            <TabsTrigger value="sharing">{t("setting.tabs.share")}</TabsTrigger>
          </TabsList>

          <AppearanceSetting />

          <LayoutSetting />

          <AudioSetting />

          <ShareSetting />
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
