'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useTheme } from '@/context/ThemeContexts';

export default function About() {
    const router = useRouter();
    const t = useTranslations('About');
    const { theme } = useTheme();

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 py-12 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'
                }`}
        >
            <div
                className={`shadow-lg rounded-2xl p-8 max-w-xl w-full space-y-6 ${theme === 'light'
                    ? 'bg-white text-gray-800'
                    : 'bg-gray-800 text-gray-100'
                    }`}
            >
                <h2 className="text-3xl font-bold text-center">{t('about')}</h2>

                <div className="leading-relaxed text-lg">
                    <p>{t('description')}</p>
                    <p className="mt-4">
                        {t('source')}
                        <br />
                        <a
                            href="https://rs.school/courses/reactjs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hover:underline ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                                }`}
                        >
                            https://rs.school/courses/reactjs
                        </a>
                    </p>
                </div>

                <div
                    className={`border-t pt-4 text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                        }`}
                >
                    <p>{t('createdBy')}</p>
                    <p
                        className={`font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                            }`}
                    >
                        Muhammadshoh Rajabov
                    </p>
                    <p>Frontend Developer, React & Vue Enthusiast</p>
                    <p className="text-xs mt-1">2025</p>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => router.back()}
                        className={`mt-4 font-semibold px-6 py-2 rounded transition ${theme === 'light'
                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-gray-100'
                            }`}
                    >
                        ⬅ {t('back')}
                    </button>
                </div>
            </div>
        </div>
    );
}
