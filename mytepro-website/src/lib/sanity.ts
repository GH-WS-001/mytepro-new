import { createClient, groq } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity客户端配置
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03', // 使用当前日期
  useCdn: process.env.NODE_ENV === 'production', // 生产环境使用CDN
  token: process.env.SANITY_API_TOKEN, // 可选，用于写入操作
});

// 图片URL构建器
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// 通用数据获取函数
export async function fetchData<T>(query: string, params?: Record<string, any>): Promise<T[]> {
  try {
    const data = await client.fetch(query, params);
    return data || [];
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    return [];
  }
}

// 获取单个文档
export async function fetchDocument<T>(query: string, params?: Record<string, any>): Promise<T | null> {
  try {
    const data = await client.fetch(query, params);
    return data || null;
  } catch (error) {
    console.error('Error fetching document from Sanity:', error);
    return null;
  }
}

// 预定义查询
export const queries = {
  // 获取所有文章
  posts: groq`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    author->{name, avatar},
    categories[]->{title},
    publishedAt,
    "estimatedReadingTime": round(length(pt::text(content)) / 200)
  }`,
  
  // 获取单个文章
  postBySlug: groq`*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    author->{name, avatar, bio},
    categories[]->{title},
    publishedAt,
    content,
    "estimatedReadingTime": round(length(pt::text(content)) / 200)
  }`,
  
  // 获取所有案例
  cases: groq`*[_type == "case"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    featured,
    client,
    technologies,
    publishedAt,
    content
  }`,
  
  // 获取单个案例
  caseBySlug: groq`*[_type == "case" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    featured,
    client,
    technologies,
    publishedAt,
    content
  }`,
  
  // 获取所有FAQ
  faqs: groq`*[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }`,
  
  // 获取站点设置
  siteSettings: groq`*[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    favicon,
    socialLinks,
    contactInfo
  }`
};