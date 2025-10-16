import MovieCardSkeleton from '@/components/ui/MovieCardSkeleton';

/**
 * Компонент, що відображає сітку скелетонів.
 * Використовується для індикації завантаження списку медіа.
 * @param {object} props - Пропси компонента.
 * @param {number} [props.count=10] - Кількість скелетонів для відображення.
 */
export const SkeletonGrid = ({ count = 10 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
};
