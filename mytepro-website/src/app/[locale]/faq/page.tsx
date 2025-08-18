'use client';

import { useTranslations } from 'next-intl';
import { useFAQs } from '@/hooks/useSanityData';
import { FAQItem } from '@/components/SanityContent';
import { PortableTextBlock } from '@portabletext/react';

interface FAQItem {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
  category?: string;
}

export default function FAQPage() {
  const t = useTranslations('Blog');
  const { data: faqs, loading, error } = useFAQs() as { 
    data: FAQItem[] | null; 
    loading: boolean; 
    error: string | null 
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{t('loadError')}</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {t('retry')}
          </button>
        </div>
      </div>
    );
  }

  // 按类别分组FAQ
  const faqsByCategory = faqs?.reduce((acc: Record<string, FAQItem[]>, faq: FAQItem) => {
    const category = faq.category || '其他';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>) || {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {Object.keys(faqsByCategory).length > 0 ? (
            <div className="space-y-12">
              {Object.entries(faqsByCategory).map(([category, categoryFaqs]) => (
                <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                    <h2 className="text-2xl font-semibold text-blue-900">{category}</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {categoryFaqs.map((faq: FAQItem) => (
                      <FAQItem key={faq._id} faq={faq} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                暂无常见问题
              </h2>
              <p className="text-gray-500 mb-6">
                如果您有任何问题，请随时联系我们
              </p>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                联系我们
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">还有其他问题？</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            我们的专业团队随时为您解答疑问，提供技术支持
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/contact'}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              联系我们
            </button>
            <button 
              onClick={() => window.location.href = '/chat'}
              className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              在线咨询
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}