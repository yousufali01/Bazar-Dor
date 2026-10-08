export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Skeleton */}
      <section className="mb-10 grid gap-6 rounded-3xl bg-[#eaf7f0] p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:p-10">
        <div className="space-y-4">
          <div className="h-5 w-44 animate-pulse rounded-full bg-white/80" />

          <div className="h-10 w-full animate-pulse rounded-xl bg-white/80 sm:h-12" />

          <div className="h-5 w-5/6 animate-pulse rounded-lg bg-white/80" />

          <div className="h-11 w-36 animate-pulse rounded-lg bg-white/80" />
        </div>

        <div className="h-56 w-full animate-pulse rounded-2xl bg-white/70 sm:h-64" />
      </section>

      {/* Products Skeleton */}
      <section>
        <div className="mb-5 h-7 w-48 animate-pulse rounded-lg bg-[#e8eeea]" />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-[#e5ebe7] bg-white"
            >
              <div className="h-40 animate-pulse bg-[#eef3f0] sm:h-48" />

              <div className="space-y-3 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-[#e8eeea]" />

                <div className="h-4 w-1/2 animate-pulse rounded bg-[#e8eeea]" />

                <div className="h-6 w-2/5 animate-pulse rounded bg-[#e8eeea]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}