import { Link } from "react-router-dom";
import { FiBriefcase } from "react-icons/fi";
export default function EmptyState({
  title = "No applications yet",
  description = "Add your first application to start tracking your job search.",
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <FiBriefcase size={25} />
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        {description}
      </p>
      <Link
        to="/add-application"
        className="mt-5 inline-flex rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Add application
      </Link>
    </div>
  );
}
