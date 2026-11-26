import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
const titles = {
  "/": "Overview",
  "/applications": "Applications",
  "/add-application": "Add application",
  "/interviews": "Interviews",
  "/profile": "Profile",
  "/settings": "Settings",
};
export default function AppLayout() {
  const location = useLocation();
  const title = location.pathname.startsWith("/applications/")
    ? "Application details"
    : titles[location.pathname] || "JobTrack Pro";
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 md:flex">
      <Navbar />
      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              JobTrack Pro
            </p>
            <h1 className="mt-0.5 text-lg font-bold text-slate-900">{title}</h1>
          </div>
          <div className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:block">
            Personal workspace
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl p-4 sm:p-7 lg:p-9">
          <Outlet />
        </main>
        <footer className="px-5 pb-6 text-center text-xs text-slate-400">
          JobTrack Pro · Your job search, organized.
        </footer>
      </div>
    </div>
  );
}
