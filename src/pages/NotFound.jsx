import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-5 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
        Page not found
      </p>
      <h1 className="mt-3 text-8xl font-black tracking-tighter text-slate-900">
        404
      </h1>
      <h2 className="mt-3 text-xl font-bold text-slate-800">
        This page went off the radar.
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        The link may be broken, or the page may have been moved.
      </p>
      <Link
        to="/"
        className="mt-7 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Back to dashboard
      </Link>
    </main>
  );
}
