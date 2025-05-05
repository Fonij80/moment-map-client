import { Button } from "../ui/button";
import { Printer } from "lucide-react";

export const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePrint}
      className="flex items-center gap-2"
    >
      <Printer className="h-4 w-4" />
      Print
    </Button>
  );
};
