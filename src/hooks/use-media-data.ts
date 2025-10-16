import useSWRInfinite from "swr/infinite";
import { useMediaStore } from "@/store/media-store";
import { Movie, TVShow } from "@/types/schemas";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * `useMediaData` - кастомний хук для 'нескінченного' завантаження даних в секції "Огляд".
 * Використовує `useSWRInfinite` для завантаження сторінок даних та їх накопичення.
 */
export const useMediaData = () => {
  const { mediaType, movieCategory, tvCategory } = useMediaStore();
  const category = mediaType === "movie" ? movieCategory : tvCategory;

  // `getKey` - це функція, що генерує ключ (URL) для кожної сторінки.
  // `pageIndex` - індекс поточної сторінки (починається з 0).
  // `previousPageData` - дані попередньої сторінки.
  const getKey = (pageIndex: number, previousPageData: Movie[] | TVShow[]) => {
    // Якщо попередній запит повернув порожній масив, значить, ми дійшли до кінця.
    if (previousPageData && !previousPageData.length) return null;

    // Формуємо URL з номером сторінки. API очікує сторінки з 1, а pageIndex з 0.
    return `/api/${mediaType}/${category}?page=${pageIndex + 1}`;
  };

  const {
    data: pages, // `data` тепер є масивом сторінок
    error,
    isLoading,
    size, // Кількість сторінок, які потрібно завантажити
    setSize, // Функція для зміни `size` (для завантаження наступної сторінки)
  } = useSWRInfinite<Movie[] | TVShow[]>(getKey, fetcher);

  // Визначаємо, чи йде завантаження і чи не є це початковим завантаженням
  const isLoadingMore =
    isLoading || (size > 0 && pages && typeof pages[size - 1] === "undefined");

  // Перевіряємо, чи досягнуто кінця списку
  const isReachingEnd = pages && pages[pages.length - 1]?.length === 0;

  return {
    pages, // Масив з масивами даних (кожен внутрішній масив - це сторінка)
    isLoading: isLoading, // Початкове завантаження
    isError: !!error,
    loadMore: () => setSize(size + 1), // Функція для завантаження наступної сторінки
    isLoadingMore, // Індикатор завантаження наступних сторінок
    isReachingEnd, // Флаг, що вказує на кінець даних
  };
};
