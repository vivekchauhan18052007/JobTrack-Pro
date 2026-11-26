import { useState } from "react";
import { Link } from "react-router-dom";
import JobList from "../Components/JobList";
import { useJobs } from "../Context/JobContext";
import { STATUSES } from "../utils/jobHelpers";

export default function AllApplications() {
  const { jobs, deleteJob } = useJobs();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("newest");

  let filteredJobs = jobs.filter((job) => {
    const company = job.company || job.name || "";
    const role = job.role || "";
    const location = job.location || "";
    const searchText = search.toLowerCase();
    const matchesSearch =
      company.toLowerCase().includes(searchText) ||
      role.toLowerCase().includes(searchText) ||
      location.toLowerCase().includes(searchText);
    const matchesStatus = status === "All" || job.status === status;
    return matchesSearch && matchesStatus;
  });

  filteredJobs.sort((a, b) => {
    if (sort === "oldest") {
      return new Date(a.appliedDate || 0) - new Date(b.appliedDate || 0);
    }
    return new Date(b.appliedDate || 0) - new Date(a.appliedDate || 0);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            Your opportunities
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
            All applications
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {jobs.length} total applications tracked
          </p>
        </div>
        <Link
          to="/add-application"
          className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Add application
        </Link>
      </div>

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company, role or location"
          className="rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"
        >
          <option value="All">All statuses</option>
          {STATUSES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <p className="text-sm text-slate-500">
        Showing {filteredJobs.length} of {jobs.length} applications
      </p>
      <JobList jobs={filteredJobs} onDelete={deleteJob} />
    </div>
  );
}
