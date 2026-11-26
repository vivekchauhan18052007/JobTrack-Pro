import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiEdit2, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { useJobs } from "../Context/JobContext";
import StatusBadge from "../Components/StatusBadge";
import { formatDate, getCompany } from "../utils/jobHelpers";
export default function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJob, deleteJob } = useJobs();
  const job = getJob(id);
  if (!job)
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900">
          Application not found
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          It may have been deleted or the URL is incorrect.
        </p>
        <Link
          to="/applications"
          className="mt-4 inline-block font-semibold text-blue-600"
        >
          Back to applications
        </Link>
      </div>
    );
  const remove = () => {
    if (deleteJob(job.id)) navigate("/applications");
  };
  const details = [
    ["Company", getCompany(job)],
    ["Job role", job.role || "Not specified"],
    ["Status", job.status],
    ["Location", job.location || "Not specified"],
    ["Employment type", job.jobType || "Not specified"],
    ["Salary / stipend", job.salary || "Not specified"],
    ["Applied date", formatDate(job.appliedDate)],
    ["Interview date", formatDate(job.interviewDate)],
  ];
  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <Link
        to="/applications"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"
      >
        <FiArrowLeft /> Back to applications
      </Link>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <StatusBadge status={job.status} />
            <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
              {getCompany(job)}
            </h2>
            <p className="mt-1 text-slate-500">
              {job.role || "Role not specified"}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/applications/${job.id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
            >
              <FiEdit2 /> Edit
            </Link>
            <button
              onClick={remove}
              className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50"
            >
              <FiTrash2 /> Delete
            </button>
          </div>
        </div>
        <div className="mt-8 grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-2">
          {details.map(([label, value]) => (
            <div key={label}>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {label}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
            </div>
          ))}
        </div>
        {job.website && (
          <a
            href={job.website}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
          >
            Open company website <FiExternalLink />
          </a>
        )}
        {job.notes && (
          <div className="mt-7 border-t border-slate-100 pt-6">
            <h3 className="font-bold text-slate-900">Notes</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
              {job.notes}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
