'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useTheme } from '../context/ThemeContexts';
import LocaleSwitcher from './LocaleSwitcher';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  const t = useTranslations('Header');
  return (
    <header
      data-testid="header"
      className={`text-white flex justify-between p-4 text-xl font-bold ${theme === 'light' ? 'bg-pink-500 text-white' : 'bg-gray-800 text-pink-200'}`}
    >
      <h1>{t("title")}</h1>
      <nav className='flex gap-3 items-center'>
        <ul className='flex gap-3'>
          <li>
            <Link href="/">{t('Home')}</Link>
          </li>
          <li>
            <Link href="/about">{t('About')}</Link>
          </li>
        </ul>
        <button
          className="cursor-pointer text-white px-3 py-1 rounded"
          onClick={toggleTheme}
        >
          {t('toggle')}
        </button>
        <LocaleSwitcher />
      </nav>
    </header>
  );
}
