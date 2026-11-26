import { useState } from "react";
import { FiSave, FiUser } from "react-icons/fi";
import { useJobs } from "../Context/JobContext";
export default function Profile() {
  const { profile, setProfile } = useJobs();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);
  const update = (e) => {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
    setSaved(false);
  };
  const submit = (e) => {
    e.preventDefault();
    setProfile(form);
    setSaved(true);
  };
  const field =
    "w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">Your profile</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage the personal details shown in your workspace.
        </p>
      </div>
      <form
        onSubmit={submit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <FiUser size={25} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Personal information</h3>
            <p className="text-sm text-slate-500">
              Stored locally in this browser.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["name", "Full name"],
            ["email", "Email address"],
            ["headline", "Professional headline"],
            ["phone", "Phone number"],
            ["location", "Location"],
          ].map(([name, label]) => (
            <label
              key={name}
              className="space-y-1.5 text-sm font-medium text-slate-700"
            >
              {label}
              <input
                className={field}
                name={name}
                value={form[name] || ""}
                onChange={update}
              />
            </label>
          ))}
          <label className="space-y-1.5 text-sm font-medium text-slate-700 sm:col-span-2">
            About
            <textarea
              className={`${field} min-h-28`}
              name="about"
              value={form.about || ""}
              onChange={update}
              placeholder="A short professional introduction"
            />
          </label>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p role="status" className="text-sm text-emerald-600">
            {saved ? "Profile saved." : " "}
          </p>
          <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            <FiSave /> Save profile
          </button>
        </div>
      </form>
    </div>
  );
}
