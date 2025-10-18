import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { DialogoProveedor } from "@/components/ui/dialogo/DialogoProveedor";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../styles/globals.css";

const RootLayout = () => (
  <DialogoProveedor>
    <Navbar />
    <div className="flex flex-col gap-4 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-4">
      <Outlet />
    </div>
    <Footer />
  </DialogoProveedor>
);

export const Route = createRootRoute({ component: RootLayout });
