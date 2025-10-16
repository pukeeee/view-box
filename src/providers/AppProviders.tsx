"use client";
/**
 * @file src/providers/AppProviders.tsx
 * @description Централізований компонент для всіх глобальних провайдерів додатку. Це дозволяє тримати RootLayout чистим і спрощує керування контекстами та конфігураціями.
 */

import { SWRConfig } from "swr";

/**
 * @constant swrConfig
 * @description Глобальна конфігурація для SWR (stale-while-revalidate).
 * @property {boolean} revalidateOnFocus - Вимикає автоматичну ревалідацію при фокусуванні на вікні. Це запобігає зайвим запитам.
 * @property {number} dedupingInterval - Інтервал (в мс) для дедуплікації однакових запитів. Протягом 10 секунд однаковий ключ SWR не буде викликати новий запит.
 */
const swrConfig = {
  revalidateOnFocus: false,
  dedupingInterval: 10000,
};

/**
 * Компонент-обгортка для всіх провайдерів додатку.
 * Наразі містить лише конфігурацію SWR, але може бути розширений.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}
