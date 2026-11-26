import { NavLink } from "react-router-dom";
import {
  FiBriefcase,
  FiGrid,
  FiCalendar,
  FiUser,
  FiSettings,
  FiPlus,
} from "react-icons/fi";
const links = [
  { to: "/", label: "Overview", icon: FiGrid, end: true },
  { to: "/applications", label: "Applications", icon: FiBriefcase },
  { to: "/interviews", label: "Interviews", icon: FiCalendar },
  { to: "/profile", label: "Profile", icon: FiUser },
  { to: "/settings", label: "Settings", icon: FiSettings },
];
export default function Navbar() {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:p-5">
      <NavLink to="/" className="mb-7 flex items-center gap-3 px-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <FiBriefcase size={21} />
        </span>
        <span>
          <span className="block text-lg font-extrabold tracking-tight text-slate-900">
            JobTrack <span className="text-blue-600">Pro</span>
          </span>
          <span className="block text-xs text-slate-400">
            Your career workspace
          </span>
        </span>
      </NavLink>
      <LinkPlaceholder />
      <nav className="flex gap-1 overflow-x-auto md:flex-col">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <NavLink
        to="/add-application"
        className="mt-5 hidden items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 md:flex"
      >
        <FiPlus /> Add application
      </NavLink>
      <div className="mt-auto hidden rounded-2xl bg-slate-50 p-4 md:block">
        <p className="text-sm font-semibold text-slate-800">Stay consistent</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Small daily actions make your job search easier to manage.
        </p>
      </div>
    </aside>
  );
}
function LinkPlaceholder() {
  return (
    <div className="mb-2 hidden px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 md:block">
      Workspace
    </div>
  );
}
