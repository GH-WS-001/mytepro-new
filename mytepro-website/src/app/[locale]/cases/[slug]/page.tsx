'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useCase } from '@/hooks/useSanityData';
import { PortableTextRenderer } from '@/components/SanityContent';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
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

export default function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const locale = useLocale();
  const [slug, setSlug] = useState<string | null>(null);
  
  useEffect(() => {
    const resolveSlug = async () => {
      const resolved = await params;
      setSlug(resolved.slug);
    };
    resolveSlug();
  }, [params]);
  const t = useTranslations('Cases');
  const { data: caseItem, loading, error } = useCase(slug || '') as { 
    data: CaseItem | null; 
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

  if (!caseItem) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href={`/${locale}/cases`} className="inline-flex items-center text-green-200 hover:text-white mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回案例列表
          </Link>
          <h1 className="text-4xl font-bold mb-4">{caseItem.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-green-200">
            {caseItem.client && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>客户: {caseItem.client}</span>
              </div>
            )}
            <time dateTime={caseItem.publishedAt}>
              {new Date(caseItem.publishedAt).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {caseItem.featured && (
              <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                精选案例
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Case Content */}
      <article className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {caseItem.mainImage && (
            <div className="relative h-96 mb-12 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={urlFor(caseItem.mainImage).width(1200).height(600).url()}
                alt={caseItem.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {/* Technologies */}
          {caseItem.technologies && caseItem.technologies.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">使用技术</h2>
              <div className="flex flex-wrap gap-2">
                {caseItem.technologies.map((tech: string) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Content Sections */}
          <div className="space-y-16">
            {/* Challenge */}
            {caseItem.challenge && (
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-red-600">挑战</h2>
                <div className="prose prose-lg max-w-none">
                  <PortableTextRenderer value={caseItem.challenge} />
                </div>
              </div>
            )}

            {/* Solution */}
            {caseItem.solution && (
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-green-600">解决方案</h2>
                <div className="prose prose-lg max-w-none">
                  <PortableTextRenderer value={caseItem.solution} />
                </div>
              </div>
            )}

            {/* Results */}
            {caseItem.results && (
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-blue-600">成果</h2>
                <div className="prose prose-lg max-w-none">
                  <PortableTextRenderer value={caseItem.results} />
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">需要类似的解决方案？</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            联系我们的专家团队，为您量身定制最适合的技术解决方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${locale}/contact`}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
            >
              联系我们
            </Link>
            <Link 
              href={`/${locale}/solution`}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors text-lg font-semibold"
            >
              查看解决方案
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}