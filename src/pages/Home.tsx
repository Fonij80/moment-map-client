import { Timeline } from "@/components/Timeline";
import { EventForm } from "@/components/EventForm";
import { EventProvider } from "@/contexts/EventContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
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
        </div>
      </EventProvider>
    </SettingsProvider>
  );
};
