'use client';

import { useTranslations } from 'next-intl';
import { useCases } from '@/hooks/useSanityData';
import { CaseCard } from '@/components/SanityContent';
import Link from 'next/link';
import { PortableTextBlock } from '@portabletext/react';

interface CaseItem {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  featured: boolean;
  publishedAt: string;
  technologies?: string[];
  client?: string;
  challenge?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  results?: PortableTextBlock[];
  body?: PortableTextBlock[];
}

export default function CasesPage() {
  const t = useTranslations('Cases');
  const { data: cases, loading, error } = useCases() as { 
    data: CaseItem[] | null; 
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

  // 分离精选案例和普通案例
  const featuredCases = cases?.filter((case_item: CaseItem) => case_item.featured) || [];
  const regularCases = cases?.filter((case_item: CaseItem) => !case_item.featured) || [];

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

      {/* Cases Content */}
      <section className="container mx-auto px-4 py-12">
        {/* Featured Cases */}
        {featuredCases.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              {t('featuredCases')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredCases.map((case_item: CaseItem) => (
                <Link 
                  key={case_item._id} 
                  href={`/cases/${case_item.slug.current}`}
                  className="block group"
                >
                  <CaseCard case_item={case_item} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular Cases */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            {featuredCases.length > 0 ? t('moreCases') : t('allCases')}
          </h2>
          {regularCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularCases.map((case_item: CaseItem) => (
                <Link 
                  key={case_item._id} 
                  href={`/cases/${case_item.slug.current}`}
                  className="block group"
                >
                  <CaseCard case_item={case_item} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {t('noCases')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}