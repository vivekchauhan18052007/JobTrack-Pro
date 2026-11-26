function StatCard({
  title,
  count,
  bgColor = "bg-blue-50",
  fontColor = "text-blue-600",
  icon: Icon,
}) {
  return (
    <div
      className={`rounded-2xl border border-white/70 p-5 shadow-sm ${bgColor}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">{title}</p>
        {Icon && (
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 ${fontColor}`}
          >
            <Icon size={19} />
          </span>
        )}
      </div>
      <p className={`mt-3 text-3xl font-bold tracking-tight ${fontColor}`}>
        {count}
      </p>
    </div>
  );
}
export default StatCard;
