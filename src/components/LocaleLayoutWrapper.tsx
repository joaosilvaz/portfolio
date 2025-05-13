import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { LocaleProvider } from './LocalProvider';

type Props = {
  children: React.ReactNode;
  locale: string;
};

export async function LocaleLayoutWrapper({ children, locale }: Props) {
  try {
    const messages = await getMessages({ locale });

    return (
      <LocaleProvider locale={locale} messages={messages}>
        {children}
      </LocaleProvider>
    );
  } catch (error: unknown) {
    
    console.error("Erro ao carregar mensagens:", error);
    notFound();
  }
}
