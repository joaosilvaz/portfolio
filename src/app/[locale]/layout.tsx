import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { AOSInitializer } from "@/components/AOSInitializer";
import { getMessages, getTranslations } from 'next-intl/server';
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ThemeProvider } from 'next-themes';
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const siteUrl = 'https://joaovitor.tech';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const title = t('title');
  const description = t('description');
  const keywords = t.raw('keywords') as string[];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: '%s · João Vitor da Silva',
    },
    description,
    keywords,
    authors: [{ name: 'João Vitor da Silva', url: siteUrl }],
    creator: 'João Vitor da Silva',
    icons: {
      icon: '/favicon.ico',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        pt: '/pt',
        en: '/en',
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}`,
      siteName: 'João Vitor da Silva',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}


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
        <Analytics /> 
      </body>
    </html>
  );
};

export default Layout;
