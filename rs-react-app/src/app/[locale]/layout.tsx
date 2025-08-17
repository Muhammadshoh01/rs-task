import { QueryProvider } from '../providers'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Header } from '@/components/Header'


export default async function RootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {

    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const messages = (await import(`../../../messages/${locale}.json`)).default;

    return (
        <QueryProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <Header />
                {children}
            </NextIntlClientProvider>
        </QueryProvider>
    )
} 