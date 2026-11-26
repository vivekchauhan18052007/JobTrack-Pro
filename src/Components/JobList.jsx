import { Link } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2, FiMapPin, FiCalendar } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import EmptyState from "./EmptyState";
import { formatDate, getCompany } from "../utils/jobHelpers";

export default function JobList({ jobs = [], onDelete, compact = false }) {
  if (!jobs.length) return <EmptyState />;
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="hidden grid-cols-[1.4fr_1fr_0.8fr_0.8fr_120px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 md:grid">
        <span>Company / Role</span>
        <span>Location</span>
        <span>Applied</span>
        <span>Status</span>
        <span className="text-right">Actions</span>
      </div>
      <div className="divide-y divide-slate-100">
        {jobs.map((job) => (
          <div
            key={job.id}
            className={`grid gap-3 px-5 py-4 transition hover:bg-slate-50 md:grid-cols-[1.4fr_1fr_0.8fr_0.8fr_120px] md:items-center ${compact ? "md:py-3" : ""}`}
          >
            <div className="min-w-0">
              <Link
                to={`/applications/${job.id}`}
                className="block truncate font-semibold text-slate-900 hover:text-blue-600"
              >
                {getCompany(job)}
              </Link>
              <p className="mt-1 truncate text-sm text-slate-500">
                {job.role || "Role not specified"}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <FiMapPin className="shrink-0" />
              {job.location || "Not specified"}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <FiCalendar />
              {formatDate(job.appliedDate)}
            </div>
            <div>
              <StatusBadge status={job.status} />
            </div>
            <div className="flex items-center gap-3 md:justify-end">
              <Link
                aria-label={`View ${getCompany(job)}`}
                title="View details"
                to={`/applications/${job.id}`}
                className="text-slate-500 hover:text-blue-600"
              >
                <FiEye size={18} />
              </Link>
              <Link
                aria-label={`Edit ${getCompany(job)}`}
                title="Edit application"
                to={`/applications/${job.id}/edit`}
                className="text-slate-500 hover:text-amber-600"
              >
                <FiEdit2 size={18} />
              </Link>
              <button
                aria-label={`Delete ${getCompany(job)}`}
                title="Delete application"
                onClick={() => onDelete?.(job.id)}
                className="text-slate-500 hover:text-rose-600"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
