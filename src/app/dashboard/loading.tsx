export default function DashboardLoading() {
  return (
    <div
      className="mx-auto w-full max-w-5xl px-6 py-12"
      aria-busy="true"
      aria-label="Loading your week"
    >
      <div className="h-4 w-24 animate-pulse rounded-sm bg-rule" />
      <div className="mt-4 h-10 w-64 animate-pulse rounded-sm bg-rule" />
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="h-20 animate-pulse border border-rule bg-card" />
        <div className="h-20 animate-pulse border border-rule bg-card" />
        <div className="h-20 animate-pulse border border-rule bg-card" />
      </div>
    </div>
  );
}
