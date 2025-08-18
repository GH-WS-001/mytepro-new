import { PortableText, PortableTextComponents, PortableTextBlock } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

// 自定义PortableText组件
const components: PortableTextComponents = {
  block: {
    h1: ({ children }: { children?: ReactNode }) => (
      <h1 className="text-3xl font-bold mb-4 mt-6">{children}</h1>
    ),
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 className="text-2xl font-semibold mb-3 mt-5">{children}</h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 className="text-xl font-medium mb-2 mt-4">{children}</h3>
    ),
    normal: ({ children }: { children?: ReactNode }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic bg-gray-50">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }: { children?: ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: ReactNode }) => (
      <li className="pl-2">{children}</li>
    ),
    number: ({ children }: { children?: ReactNode }) => (
      <li className="pl-2">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: ReactNode }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: { children?: ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children?: ReactNode }) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }: { value?: { href?: string }; children?: ReactNode }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <Link 
          href={value?.href || '#'} 
          target={target}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }: { value?: { asset?: { _ref?: string }; alt?: string; caption?: string } }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      
      return (
        <div className="my-6">
          <Image
            src={urlFor(value).width(800).height(400).url()}
            alt={value.alt || ' '}
            width={800}
            height={400}
            className="rounded-lg shadow-md w-full h-auto"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    code: ({ value }: { value?: { code?: string } }) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
        <code className="text-sm">{value?.code || ''}</code>
      </pre>
    ),
  },
};

// PortableText渲染器组件
export function PortableTextRenderer({ value }: { value: PortableTextBlock[] | null }) {
  return <PortableText value={value || []} components={components} />;
}

// 文章卡片组件
export function PostCard({ post }: { post: {
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
  author?: {
    name: string;
    avatar?: {
      _type: string;
      asset: {
        _ref: string;
        _type: string;
      };
    };
  };
  categories?: {
    title: string;
  }[];
} }) {
  const t = useTranslations('Blog');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.mainImage && (
        <div className="relative h-48">
          <Image
            src={urlFor(post.mainImage).width(400).height(200).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          {post.categories?.map((category: {
            title: string;
          }) => (
            <span 
              key={category.title}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {category.title}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold mb-2">
          <Link href={`/blog/${post.slug?.current}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{post.author?.name}</span>
          <time>
            {new Date(post.publishedAt).toLocaleDateString('zh-CN')}
          </time>
        </div>
      </div>
    </article>
  );
}

// 案例卡片组件
export function CaseCard({ case_item }: { case_item: {
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
} }) {
  const t = useTranslations('Cases');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {case_item.featured && (
        <div className="absolute top-2 right-2 z-10">
          <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
            精选案例
          </span>
        </div>
      )}
      {case_item.mainImage && (
        <div className="relative h-48">
          <Image
            src={urlFor(case_item.mainImage).width(400).height(200).url()}
            alt={case_item.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          <Link href={`/cases/${case_item.slug?.current}`} className="hover:text-blue-600">
            {case_item.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{case_item.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {case_item.technologies?.map((tech: string) => (
            <span 
              key={tech}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        {case_item.client && (
          <p className="text-sm text-gray-500">
            客户: {case_item.client}
          </p>
        )}
      </div>
    </article>
  );
}

// FAQ组件
export function FAQItem({ faq }: { faq: {
  question: string;
  answer: PortableTextBlock[];
} }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 text-left flex items-center justify-between hover:bg-gray-50 px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-gray-900">{faq.question}</h3>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <div className="text-gray-600">
            <PortableTextRenderer value={faq.answer} />
          </div>
        </div>
      )}
    </div>
  );
}