export const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];
export const statusStyles = {
  Applied: "bg-blue-50 text-blue-700 ring-blue-200",
  Interview: "bg-violet-50 text-violet-700 ring-violet-200",
  Offer: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-200",
};
export const formatDate = (date) => {
  if (!date) return "Not set";
  const parsed = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsed.getTime())
    ? "Not set"
    : parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};
export const getCompany = (job) => job.company || job.name || "Unnamed company";
