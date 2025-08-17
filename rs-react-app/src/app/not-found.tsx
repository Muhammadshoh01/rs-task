import { useTranslations } from "next-intl";

export default function NotFound() {
    const t = useTranslations('NotFound')

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-5xl font-bold text-gray-800">404</h1>
            <p className="mt-4 text-lg text-gray-600">{t('title')}</p>
        </div>
    );
}
