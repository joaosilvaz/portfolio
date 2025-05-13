'use client';
import { IntlProvider } from 'next-intl';
import { AbstractIntlMessages } from 'next-intl';

type Props = {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale: string;
};

export function LocaleProvider({ children, messages, locale }: Props) {
  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      timeZone="America/Sao_Paulo"
    >
      {children}
    </IntlProvider>
  );
}
