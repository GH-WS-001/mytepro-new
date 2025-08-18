import { useTranslations } from 'next-intl';

export default function VRDigitalTwin() {
  const t = useTranslations('VRDigitalTwinPage');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{t('heroTitle')}</h1>
        <p className="text-xl mb-8">{t('heroSubtitle')}</p>
        <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">
          {t('scheduleDemo')}
        </button>
      </div>
    </div>
  );
}