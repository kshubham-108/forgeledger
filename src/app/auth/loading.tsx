export default function AuthLoading() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-sm flex-col justify-center px-4 py-12">
      <div
        className="rounded-sm border border-rule bg-card p-6"
        aria-busy="true"
        aria-label="Loading"
      >
        <div className="h-6 w-40 rounded-sm bg-rule" />
        <div className="mt-4 h-4 w-full rounded-sm bg-rule" />
        <div className="mt-6 space-y-4">
          <div className="h-10 w-full rounded-sm bg-rule" />
          <div className="h-10 w-full rounded-sm bg-rule" />
          <div className="h-10 w-full rounded-sm bg-rule" />
        </div>
      </div>
    </div>
  );
}
