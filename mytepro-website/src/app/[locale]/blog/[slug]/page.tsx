'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePost } from '@/hooks/useSanityData';
import { PortableTextRenderer } from '@/components/SanityContent';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import Link from 'next/link';
import { PortableTextBlock } from '@portabletext/react';
import { usePathname } from 'next/navigation';

interface Author {
  name: string;
  avatar?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

interface Category {
  title: string;
}

interface Post {
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
  publishedAt: string;
  author?: Author;
  categories?: Category[];
  body: PortableTextBlock[];
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const locale = useLocale();
  const pathname = usePathname();
  const [slug, setSlug] = useState<string | null>(null);
  
  useEffect(() => {
    const resolveSlug = async () => {
      const resolved = await params;
      setSlug(resolved.slug);
    };
    resolveSlug();
  }, [params]);
  
  const t = useTranslations('Blog');
  const { data: post, loading, error } = usePost(slug || '') as { 
    data: Post | null; 
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

  if (!post) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-blue-200">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.avatar && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={urlFor(post.author.avatar).width(40).height(40).url()}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                )}
                <span>{post.author.name}</span>
              </div>
            )}
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <div className="flex items-center gap-2">
              {post.categories?.map((category: Category) => (
                <span 
                  key={category.title}
                  className="px-2 py-1 bg-blue-500/30 text-blue-100 text-xs rounded-full"
                >
                  {category.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {post.mainImage && (
            <div className="relative h-96 mb-12 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={urlFor(post.mainImage).width(1200).height(600).url()}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-sm">
            <PortableTextRenderer value={post.body} />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('relatedPosts')}</h2>
          <div className="text-center py-8">
            <p className="text-gray-600 mb-6">{t('comingSoon')}</p>
            <Link 
              href={`/${locale}/blog`}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              {t('viewAllPosts')}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}