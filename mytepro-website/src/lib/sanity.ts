import { createClient } from '@sanity/client';
import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity客户端配置
// 使用Sanity官方示例项目进行开发测试:
// 项目ID: 81pocpw8 (Sanity官方示例项目)
// 数据集: production
//
// 在生产环境中，请替换为您的实际项目ID
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '81pocpw8'; // 默认使用官方示例项目ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// 验证projectId格式
if (projectId && !/^[a-z0-9-]+$/.test(projectId)) {
  throw new Error(`Invalid projectId format: "${projectId}". ProjectId can only contain lowercase letters, numbers, and dashes.`);
}

export const client = createClient({
  projectId,
  dataset,
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
export async function fetchData<T>(query: string, params?: Record<string, string | number | boolean>): Promise<T[]> {
  try {
    const data = await client.fetch(query, params);
    return data || [];
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    return [];
  }
}

// 单条文档获取函数
export async function fetchDocument<T>(query: string, params?: Record<string, string | number | boolean>): Promise<T | null> {
  try {
    const data = await client.fetch(query, params);
    return data || null;
  } catch (error) {
    console.error('Error fetching document from Sanity:', error);
    return null;
  }
}

// GROQ查询模板
export const queries = {
  // 博客文章查询
  allPosts: groq`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{name, avatar},
    categories[]->{title}
  }`,
  
  postBySlug: groq`*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body,
    author->{name, avatar, bio},
    categories[]->{title}
  }`,
  
  // 案例查询
  allCases: groq`*[_type == "case"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    featured,
    publishedAt,
    technologies,
    client
  }`,
  
  caseBySlug: groq`*[_type == "case" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    featured,
    publishedAt,
    body,
    technologies,
    client,
    challenge,
    solution,
    results
  }`,
  
  // FAQ查询
  allFAQs: groq`*[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }`,
  
  // 站点设置查询
  siteSettings: groq`*[_type == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    logo,
    favicon,
    socialLinks,
    contactInfo
  }`
};