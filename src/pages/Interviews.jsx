import { Link } from "react-router-dom";
import { FiCalendar, FiClock } from "react-icons/fi";
import { useJobs } from "../Context/JobContext";
import EmptyState from "../Components/EmptyState";
import StatusBadge from "../Components/StatusBadge";
import { formatDate, getCompany } from "../utils/jobHelpers";
export default function Interviews() {
  const { jobs } = useJobs();
  const interviews = jobs
    .filter((job) => job.status === "Interview")
    .sort((a, b) =>
      (a.interviewDate || "9999").localeCompare(b.interviewDate || "9999"),
    );
  if (!interviews.length)
    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Interviews</h2>
          <p className="mt-1 text-sm text-slate-500">
            Keep track of upcoming conversations with employers.
          </p>
        </div>
        <EmptyState
          title="No interviews scheduled"
          description="When an application moves to Interview, it will appear here. Add an interview date to keep your schedule organized."
        />
      </div>
    );
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">Interviews</h2>
        <p className="mt-1 text-sm text-slate-500">
          {interviews.length} application{interviews.length === 1 ? "" : "s"} in
          interview stage
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {interviews.map((job) => (
          <article
            key={job.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900">{getCompany(job)}</h3>
                <p className="mt-1 text-sm text-slate-500">{job.role}</p>
              </div>
              <StatusBadge status={job.status} />
            </div>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <FiCalendar /> {formatDate(job.interviewDate)}
              </span>
              <span className="inline-flex items-center gap-2">
                <FiClock />{" "}
                {job.interviewDate &&
                job.interviewDate < new Date().toISOString().slice(0, 10)
                  ? "Past date"
                  : "Upcoming / date not set"}
              </span>
            </div>
            {job.notes && (
              <p className="mt-4 line-clamp-2 text-sm text-slate-500">
                {job.notes}
              </p>
            )}
            <Link
              to={`/applications/${job.id}`}
              className="mt-5 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View application →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
