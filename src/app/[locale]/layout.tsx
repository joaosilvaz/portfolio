import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { AOSInitializer } from "@/components/AOSInitializer";
import { getMessages } from 'next-intl/server';
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ThemeProvider } from 'next-themes';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'João Vitor da Silva - Portfolio',
  description: 'Portfólio of João Vitor da Silva, Full Stack Developer',
  icons: {
    icon: '/favicon.ico',
  },
};

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};


const Layout: React.FC<LayoutProps> = async ({ children, params }) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className='scroll-smooth' suppressHydrationWarning>
      <body className={`${poppins.variable} font-poppins bg-white text-black dark:bg-black dark:text-white antialiased
            [&::-webkit-scrollbar]:w-4 
            [&::-webkit-scrollbar-track]:bg-accent
            [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:hover:bg-border/80
            dark:[&::-webkit-scrollbar-track]:bg-secondary dark:[&::-webkit-scrollbar-thumb]:bg-border
            dark:[&::-webkit-scrollbar-thumb]:hover:bg-border/80
      `}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <AOSInitializer />
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
