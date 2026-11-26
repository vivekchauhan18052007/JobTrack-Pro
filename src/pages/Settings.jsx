import { useJobs } from "../Context/JobContext";
export default function Settings() {
  const { preferences, setPreferences } = useJobs();

  const toggle = (key) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">Settings</h2>
        <p className="mt-1 text-sm text-slate-500">
          Control how JobTrack Pro behaves on this device.
        </p>
      </div>

      <section className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white px-5 shadow-sm">
        <div className="flex items-center justify-between gap-5 py-5">
          <div>
            <h3 className="font-semibold text-slate-900">
              Confirm before deleting
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Ask for confirmation before removing an application.
            </p>
          </div>

          <button
            role="switch"
            aria-checked={preferences.confirmDelete}
            onClick={() => toggle("confirmDelete")}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
              preferences.confirmDelete ? "bg-blue-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                preferences.confirmDelete ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </section>
    </div>
  );
}
