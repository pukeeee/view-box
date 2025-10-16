/**
 * @file src/app/layout.tsx
 * @description Кореневий макет додатку. Визначає основну HTML-структуру сторінки,
 *              підключає глобальні стилі та провайдери.
 */
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { AppProviders } from "@/providers/AppProviders";

/**
 * @constant metadata
 * @description Глобальні метадані для всього сайту.
 *              Використовуються для SEO та відображення у вкладці браузера.
 */
export const metadata: Metadata = {
  title: "ViewBox",
  description: "A movie database application",
};

/**
 * Кореневий компонент макета, який обгортає всі сторінки.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>
        {/* AppProviders обгортає додаток, надаючи глобальні контексти та конфігурації */}
        <AppProviders>
          <Header />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
