import { Timeline } from "@/components/Timeline";
import { EventForm } from "@/components/EventForm";
import { EventProvider } from "@/context/EventContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { TimelineSettings } from "@/components/TimelineSettings";

export const Home = () => {
  return (
    <SettingsProvider>
      <EventProvider>
        <div className="min-h-screen bg-background">
          <header className="pt-12 pb-10 px-4 text-center">
            <h1 className="text-4xl font-bold mb-3">Life Timeline</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create a beautiful timeline of your life's most important moments.
              Add events, include photos, and share your journey with others.
            </p>
            <div className="mt-6 flex justify-center">
              <TimelineSettings />
            </div>
          </header>

          <main className="container max-w-4xl mx-auto pb-20">
            <EventForm />
            <Timeline />
          </main>

          <footer className="py-6 border-t bg-muted/30 print:border-t-0">
            <div className="container text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Life Timeline. All rights
              reserved.
            </div>
          </footer>
        </div>
      </EventProvider>
    </SettingsProvider>
  );
};
