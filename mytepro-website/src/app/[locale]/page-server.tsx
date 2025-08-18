import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <HomeClient params={params} />
    </div>
  );
}

function HomeClient({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations('HomePage');
  const [isScrolled, setIsScrolled] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{ locale: string } | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };
    
    resolveParams();
  }, [params]);

  useEffect(() => {
    // Only run scroll handler on client side to avoid hydration mismatch
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">MyTePro</div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-blue-400 transition-colors">{t('features')}</a>
              {resolvedParams && (
                <Link href={`/${resolvedParams.locale}/solution`} className="text-gray-300 hover:text-blue-400 transition-colors">{t('solutions')}</Link>
              )}
              <a href="vr-digital-twin" className="text-gray-300 hover:text-blue-400 transition-colors">{t('vrDigitalTwin')}</a>
              <a href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors">博客</a>
              <a href="/cases" className="text-gray-300 hover:text-blue-400 transition-colors">案例</a>
              <a href="/faq" className="text-gray-300 hover:text-blue-400 transition-colors">FAQ</a>
              <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">{t('contact')}</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                {t('getStarted')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Unreal Engine Style Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* ... existing code ... */}
      </section>
    </>
  );
}