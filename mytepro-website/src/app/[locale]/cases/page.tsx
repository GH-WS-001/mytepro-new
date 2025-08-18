import { useTranslations } from 'next-intl';
import { useCases } from '@/hooks/useSanityData';
import { CaseCard } from '@/components/SanityContent';
import Link from 'next/link';

export default function CasesPage() {
  const t = useTranslations('Cases');
  const { data: cases, loading, error } = useCases();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">加载失败</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  // 分离精选案例和普通案例
  const featuredCases = cases?.filter((case_item: any) => case_item.featured) || [];
  const regularCases = cases?.filter((case_item: any) => !case_item.featured) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Featured Cases */}
      {featuredCases.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">精选案例</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredCases.map((case_item: any) => (
                <CaseCard key={case_item._id} case_item={case_item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Cases */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">所有案例</h2>
          {regularCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularCases.map((case_item: any) => (
                <CaseCard key={case_item._id} case_item={case_item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                暂无案例
              </h2>
              <p className="text-gray-500 mb-6">
                敬请期待更多精彩案例
              </p>
              <Link 
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                返回首页
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">需要定制解决方案？</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            我们的专业团队将为您提供最适合的技术解决方案
          </p>
          <Link 
            href="/contact"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            联系我们
          </Link>
        </div>
      </section>
    </div>
  );
}