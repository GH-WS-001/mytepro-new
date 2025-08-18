'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

const solutions = [
  {
    id: 'digital-twin',
    titleKey: 'digitalTwin',
    descKey: 'digitalTwinDesc',
    image: '/file.svg',
  },
  {
    id: 'ai-chat',
    titleKey: 'aiChat',
    descKey: 'aiChatDesc',
    image: '/window.svg',
  },
];

export default function SolutionPage() {
  const t = useTranslations('solution');
  const locale = useLocale();
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {solutions.map((s) => (
          <div key={s.id} className="group p-8 border rounded-2xl shadow-lg bg-white/80 dark:bg-gray-900/80 hover:shadow-blue-400/30 transition-all duration-300 flex flex-col items-start">
            <div className="flex items-center gap-4 mb-4">
              {s.image && <img src={s.image} alt="icon" className="w-12 h-12" />}
              <h2 className="text-2xl font-semibold group-hover:text-blue-600 transition-colors">{t(s.titleKey)}</h2>
            </div>
            <p className="mb-6 text-gray-600 dark:text-gray-300">{t(s.descKey)}</p>
            <Link href={`/${locale}/solution/${s.id}`} className="mt-auto inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium shadow hover:from-blue-600 hover:to-purple-600 transition-all">
              {t('viewDetail')}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}