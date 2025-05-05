import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { useEvents } from "@/contexts/EventContext";

export const ExportButton = () => {
  const { getSortedEvents } = useEvents();

  const handleExport = () => {
    try {
      const events = getSortedEvents();
      const dataStr = JSON.stringify(events, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      const exportFileDefaultName = `timeline-export-${new Date()
        .toISOString()
        .slice(0, 10)}.json`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Export
    </Button>
  );
};
