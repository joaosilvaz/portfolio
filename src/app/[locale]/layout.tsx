import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { getMessages, getTranslations } from 'next-intl/server';
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ThemeProvider } from 'next-themes';
import { Analytics } from "@vercel/analytics/react";
import { SiteShell } from "@/components/site/SiteShell";

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

/** Roda antes da pintura: marca JS ativo e pula o loader em visitas seguintes. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('jv-loader-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.loader='skip'}}catch(e){d.dataset.loader='skip'}})();`;

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
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.png',
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
    <html lang={locale} className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{'[data-loader-root]{display:none}'}</style>
        </noscript>
      </head>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <SiteShell>{children}</SiteShell>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics /> 
      </body>
    </html>
  );
};

export default Layout;
