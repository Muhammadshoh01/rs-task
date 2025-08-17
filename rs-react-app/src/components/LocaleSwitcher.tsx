'use client';

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const languages = [
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
    { code: 'uz', label: 'O\'zbekcha' },
]


function LocaleSwitcher() {
    const router = useRouter();
    const pathName = usePathname();
    const currentLocale = useLocale();

    function changeLanguage(locale: string) {
        const segments = pathName.split('/');
        segments[1] = locale;
        router.push(segments.join('/'))
    }
    return (
        <select value={currentLocale} onChange={(e) => changeLanguage(e.target.value)} className="border rounded px-2 py-1 cursor-pointer">
            {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                    {lang.label}
                </option>
            ))}
        </select>
    )
}

export default LocaleSwitcher