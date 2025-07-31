import { Button } from "../ui/button";
import { Printer } from "lucide-react";

export const PrintButton = () => {
  const handlePrint = () => {
    // Get the element to print (in this case, the timeline container)
    const printContent = document.getElementById("print-timeline");

    if (printContent) {
      // Open a new window for printing
      const printWindow = window.open("", "_blank");
      printWindow?.document.write(
        "<html><head><title>Print</title></head><body>"
      );
      printWindow?.document.write(printContent?.innerHTML); // Write only the timeline content to the new window
      printWindow?.document.write("</body></html>");
      printWindow?.document.close();
      printWindow?.print(); // Trigger the print dialog
    }
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
