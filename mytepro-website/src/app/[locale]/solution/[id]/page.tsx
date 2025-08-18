import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';

const solutions = [
  {
    id: 'digital-twin',
    titleKey: 'solution.digitalTwin',
    descKey: 'solution.digitalTwinDesc',
    detailKey: 'solution.digitalTwinDetail',
    image: '/public/file.svg',
  },
  {
    id: 'ai-chat',
    titleKey: 'solution.aiChat',
    descKey: 'solution.aiChatDesc',
    detailKey: 'solution.aiChatDetail',
    image: '/public/window.svg',
  },
];

export default function SolutionDetailPage({ params }: { params: { id: string } }) {
  const t = useTranslations('solution');
  const solution = solutions.find((s) => s.id === params.id);
  if (!solution) return notFound();
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-4">
        {solution.image && <img src={solution.image} alt="icon" className="w-10 h-10" />} {t(solution.titleKey)}
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-8">{t(solution.descKey)}</p>
      <div className="prose dark:prose-invert max-w-none bg-white/80 dark:bg-gray-900/80 p-6 rounded-xl shadow">
        {t(solution.detailKey, { defaultValue: t(solution.descKey) })}
      </div>
    </main>
  );
}
