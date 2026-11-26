import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiArrowUpRight,
  FiPlus,
} from "react-icons/fi";
import StatCard from "../Components/StatCard";
import JobList from "../Components/JobList";
import { useJobs } from "../Context/JobContext";

export default function Dashboard() {
  const { jobs, deleteJob } = useJobs();

  const counts = {
    applied: jobs.filter((job) => job.status === "Applied").length,
    interviews: jobs.filter((job) => job.status === "Interview").length,
    offers: jobs.filter((job) => job.status === "Offer").length,
    rejected: jobs.filter((job) => job.status === "Rejected").length,
  };

  const recent = [...jobs]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.appliedDate || 0) -
        new Date(a.createdAt || a.appliedDate || 0),
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            Your job search at a glance
          </p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back!
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Track your applications, stay organized, and take the next step
            toward your next opportunity.
          </p>
        </div>

        <Link
          to="/add-application"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <FiPlus /> Add application
        </Link>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total applications"
          count={jobs.length}
          bgColor="bg-white"
          fontColor="text-slate-900"
          icon={FiBriefcase}
        />
        <StatCard
          title="Interviews"
          count={counts.interviews}
          bgColor="bg-violet-50"
          fontColor="text-violet-700"
          icon={FiCalendar}
        />
        <StatCard
          title="Offers received"
          count={counts.offers}
          bgColor="bg-emerald-50"
          fontColor="text-emerald-700"
          icon={FiCheckCircle}
        />
        <StatCard
          title="Rejected"
          count={counts.rejected}
          bgColor="bg-rose-50"
          fontColor="text-rose-700"
          icon={FiXCircle}
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Recent applications
            </h3>
            <p className="text-sm text-slate-500">Your latest job activity</p>
          </div>

          <Link
            to="/applications"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all <FiArrowUpRight />
          </Link>
        </div>

        <JobList jobs={recent} onDelete={deleteJob} />
      </section>
    </div>
  );
}
