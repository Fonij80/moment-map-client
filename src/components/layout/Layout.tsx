import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Navbar />
      <main className="flex-grow w-full max-w-4xl px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
