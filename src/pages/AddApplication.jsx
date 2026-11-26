import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useJobs } from "../Context/JobContext";
import ErrorMsg from "../Components/ErrorMsg";
import { STATUSES } from "../utils/jobHelpers";

const emptyForm = {
  company: "",
  role: "",
  status: "Applied",
  location: "",
  jobType: "Full-time",
  salary: "",
  appliedDate: new Date().toISOString().slice(0, 10),
  interviewDate: "",
  website: "",
  notes: "",
};

export default function AddApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addJob, updateJob, getJob } = useJobs();
  const existing = id ? getJob(id) : null;
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (existing) {
      setForm({ ...emptyForm, ...existing, company: existing.company || existing.name || "" });
    } else {
      setForm({ ...emptyForm, appliedDate: new Date().toISOString().slice(0, 10) });
    }
    setError("");
  }, [id, existing]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.company.trim() || !form.role.trim()) {
      setError("Company name and job role are required.");
      return;
    }

    if (form.website && !form.website.startsWith("http://") && !form.website.startsWith("https://")) {
      setError("Website must start with http:// or https://");
      return;
    }

    const jobData = {
      ...form,
      company: form.company.trim(),
      name: form.company.trim(),
      role: form.role.trim(),
    };

    if (id && existing) {
      updateJob(id, jobData);
    } else {
      addJob(jobData);
    }

    navigate("/applications");
  }

  if (id && !existing) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-bold">Application not found</h2>
        <Link className="mt-4 inline-block text-blue-600" to="/applications">Back to applications</Link>
      </div>
    );
  }

  const field = "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500";

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link to="/applications" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600">
        <FiArrowLeft /> Back to applications
      </Link>

      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">{id ? "Edit application" : "Add a new application"}</h2>
        <p className="mt-1 text-sm text-slate-500">Keep the important details of each opportunity in one place.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <section>
          <h3 className="font-bold text-slate-900">Role details</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm font-medium text-slate-700">Company name *
              <input className={field} name="company" value={form.company} onChange={handleChange} placeholder="e.g. Google" />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">Job role *
              <input className={field} name="role" value={form.role} onChange={handleChange} placeholder="e.g. Frontend Developer" />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">Application status
              <select className={field} name="status" value={form.status} onChange={handleChange}>
                {STATUSES.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">Employment type
              <select className={field} name="jobType" value={form.jobType} onChange={handleChange}>
                {["Full-time", "Part-time", "Internship", "Contract", "Remote"].map((type) => <option key={type}>{type}</option>)}
              </select>
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">Location
              <input className={field} name="location" value={form.location} onChange={handleChange} placeholder="e.g. Ahmedabad / Remote" />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">Salary / stipend
              <input className={field} name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. ₹20,000 per month" />
            </label>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-5">
          <h3 className="font-bold text-slate-900">Dates and links</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm font-medium text-slate-700">Applied date
              <input className={field} type="date" name="appliedDate" value={form.appliedDate} onChange={handleChange} />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">Interview date
              <input className={field} type="date" name="interviewDate" value={form.interviewDate} onChange={handleChange} />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700 sm:col-span-2">Job / company website
              <input className={field} name="website" value={form.website} onChange={handleChange} placeholder="https://company.com/careers" />
            </label>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-5">
          <label className="space-y-1.5 text-sm font-medium text-slate-700">Notes
            <textarea className={`${field} min-h-28 resize-y`} name="notes" value={form.notes} onChange={handleChange} placeholder="Recruiter name, follow-up notes, interview preparation..." />
          </label>
        </section>

        <ErrorMsg message={error} />

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <Link to="/applications" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</Link>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            <FiSave /> {id ? "Save changes" : "Save application"}
          </button>
        </div>
      </form>
    </div>
  );
}
