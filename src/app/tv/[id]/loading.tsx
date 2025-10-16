// src/app/tv/[id]/loading.tsx
export default function DetailLoading() {
  return (
    <main className="min-h-screen">
      {/* Hero skeleton */}
      <div className="relative h-[60vh] lg:h-[70vh] bg-dracula-current-line animate-pulse">
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Poster skeleton */}
            <div className="hidden md:block w-48 h-72 bg-dracula-background rounded-lg" />

            <div className="flex-1 space-y-4">
              {/* Title skeleton */}
              <div className="h-12 lg:h-16 bg-dracula-background rounded w-3/4" />
              {/* Tagline skeleton */}
              <div className="h-6 bg-dracula-background rounded w-1/2" />
              {/* Info skeleton */}
              <div className="flex gap-4">
                <div className="h-6 w-20 bg-dracula-background rounded" />
                <div className="h-6 w-20 bg-dracula-background rounded" />
                <div className="h-6 w-20 bg-dracula-background rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="px-8 lg:px-16 xl:px-24 py-12 space-y-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Overview title */}
            <div className="h-8 bg-dracula-current-line rounded w-32 animate-pulse" />
            {/* Overview text */}
            <div className="space-y-3">
              <div className="h-4 bg-dracula-current-line rounded animate-pulse" />
              <div className="h-4 bg-dracula-current-line rounded animate-pulse" />
              <div className="h-4 bg-dracula-current-line rounded w-3/4 animate-pulse" />
            </div>
          </div>

          <div className="space-y-6">
            {/* Genres */}
            <div className="h-6 bg-dracula-current-line rounded w-24 animate-pulse" />
            <div className="flex flex-wrap gap-2">
              <div className="h-10 w-24 bg-dracula-current-line rounded-full animate-pulse" />
              <div className="h-10 w-28 bg-dracula-current-line rounded-full animate-pulse" />
              <div className="h-10 w-20 bg-dracula-current-line rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="space-y-6">
          <div className="flex gap-8 border-b border-dracula-current-line pb-2">
            <div className="h-8 w-24 bg-dracula-current-line rounded animate-pulse" />
            <div className="h-8 w-24 bg-dracula-current-line rounded animate-pulse" />
            <div className="h-8 w-24 bg-dracula-current-line rounded animate-pulse" />
          </div>

          {/* Cast grid skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="w-full aspect-[2/3] bg-dracula-current-line rounded-lg animate-pulse" />
                <div className="h-4 bg-dracula-current-line rounded animate-pulse" />
                <div className="h-3 bg-dracula-current-line rounded w-3/4 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations skeleton */}
        <div className="space-y-6">
          <div className="h-8 bg-dracula-current-line rounded w-48 animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="w-full aspect-[2/3] bg-dracula-current-line rounded-lg animate-pulse" />
                <div className="h-4 bg-dracula-current-line rounded animate-pulse" />
                <div className="h-3 bg-dracula-current-line rounded w-1/2 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
