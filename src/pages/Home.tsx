import { Timeline } from "@/components/Timeline";
import { EventForm } from "@/components/EventForm";
import { EventProvider } from "@/contexts/EventContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { TimelineSettings } from "@/components/TimelineSettings";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <SettingsProvider>
      <EventProvider>
        <div className="min-h-screen bg-background">
          <header className="pt-12 pb-10 px-4 text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Tell Your Life Story With
              <span className="text-primary ml-2">Moment Map</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Create beautiful, animated timelines of your life journey. Chart
              your milestones, share with loved ones, and celebrate the moments
              that made you who you are.
            </motion.p>
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
