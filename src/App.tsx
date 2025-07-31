import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { EventProvider, SettingsProvider } from "@/contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { PrintStyles } from "./components";
import { RouterProvider } from "react-router-dom";
import router from "./Router";

const queryClient = new QueryClient();

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Sonner />
          <PrintStyles />
          <SettingsProvider>
            <EventProvider>
              <RouterProvider router={router} />
            </EventProvider>
          </SettingsProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
