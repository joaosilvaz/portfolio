import { LocaleProvider } from '@/components/LocalProvider';
import Main from '@/components/Main';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params; 

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <LocaleProvider messages={messages} locale={locale}>
      <Main />
    </LocaleProvider>
  );
}
