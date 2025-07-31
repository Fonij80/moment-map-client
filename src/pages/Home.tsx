import { EventForm, Timeline, Hero } from "@/components";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="pt-12 pb-4 px-4 text-center">
        <Hero />
      </header>

      <main className="container max-w-4xl pb-20">
        <EventForm />
        <Timeline />
      </main>
    </div>
  );
};
