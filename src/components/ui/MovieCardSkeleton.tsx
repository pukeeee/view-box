import { Skeleton } from "@/components/ui/skeleton";

/**
 * Компонент-скелетон для картки фільму на базі shadcn/ui.
 * Відображає заповнювач з анімацією пульсації,
 * імітуючи структуру реальної картки на час завантаження даних.
 */
const MovieCardSkeleton = () => {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg">
      {/* Заповнювач для зображення */}
      <Skeleton className="w-full" style={{ paddingTop: "150%" }} />

      {/* Заповнювач для контенту */}
      <div className="p-4 space-y-2">
        {/* Заповнювач для заголовка */}
        <Skeleton className="h-6 w-3/4" />
        {/* Заповнювач для дати */}
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
