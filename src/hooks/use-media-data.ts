import useSWR from "swr";
import { useMediaStore } from "@/store/media-store";

// Новий, значно простіший фетчер.
// Він приймає URL і просто завантажує дані з нього.
const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * `useMediaData` - кастомний хук для завантаження даних в секції "Огляд".
 * Він бере стан з Zustand, формує URL до внутрішнього API і використовує
 * SWR для завантаження та кешування даних на клієнті.
 */
export const useMediaData = () => {
  const { mediaType, movieCategory, tvCategory } = useMediaStore();

  const category = mediaType === "movie" ? movieCategory : tvCategory;

  // Формуємо URL до нашого внутрішнього API
  const url = `/api/${mediaType}/${category}`;

  // Ключем для SWR тепер є просто URL.
  // Коли URL зміниться, SWR автоматично зробить новий запит.
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    isLoading,
    isError: !!error,
  };
};
