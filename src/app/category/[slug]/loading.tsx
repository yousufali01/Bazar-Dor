export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Category Header Skeleton */}
      <div className="mb-8 rounded-2xl border border-[#e5ebe7] bg-white p-5 sm:p-6">
        <div className="h-7 w-40 animate-pulse rounded-lg bg-[#e8eeea]" />

        <div className="mt-3 h-4 w-64 animate-pulse rounded bg-[#eef2ef]" />
      </div>

      {/* Sort Skeleton */}
      <div className="mb-6 flex justify-end">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-[#e8eeea]" />
      </div>

      {/* Product Skeleton */}
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
    </main>
  );
}