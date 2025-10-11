import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../styles/globals.css";

const RootLayout = () => (
  <>
    <Navbar />
    <div className="bg-gradient-to-br from-gray-500 via-gray-300 to-gray-100 min-h-screen flex flex-col">
      <Outlet />
    </div>
    <Footer />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
