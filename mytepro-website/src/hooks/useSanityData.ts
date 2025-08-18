"use client";

import { useState, useEffect } from 'react';
import { fetchData, fetchDocument } from '@/lib/sanity';

// 通用数据获取hook
export function useSanityData<T>(
  query: string, 
  params?: Record<string, string | number | boolean>,
  options: {
    initialData?: T[];
    enabled?: boolean;
    refetchInterval?: number;
  } = {}
) {
  const { initialData = [], enabled = true, refetchInterval } = options;
  
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const fetchDataFromSanity = async () => {
    if (!enabled) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchData(query, params);
      setData(result as T[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromSanity();
  }, [query, JSON.stringify(params), enabled]);

  // 定时刷新
  useEffect(() => {
    if (!refetchInterval || !enabled) return;
    const interval = setInterval(fetchDataFromSanity, refetchInterval);
    return () => clearInterval(interval);
  }, [refetchInterval, enabled]);

  return {
    data,
    loading,
    error,
    refetch: fetchDataFromSanity,
  };
}

// 单条数据获取hook
export function useSanityDocument<T>(
  query: string, 
  params?: Record<string, string | number | boolean>,
  options: {
    initialData?: T | null;
    enabled?: boolean;
  } = {}
) {
  const { initialData = null, enabled = true } = options;
  
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const fetchDataFromSanity = async () => {
    if (!enabled) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchDocument<T>(query, params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromSanity();
  }, [query, JSON.stringify(params), enabled]);

  return {
    data,
    loading,
    error,
    refetch: fetchDataFromSanity,
  };
}

// 预定义hooks
export function usePosts() {
  return useSanityData(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{name, avatar},
    categories[]->{title}
  }`);
}

export function usePost(slug: string) {
  return useSanityDocument(`*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body,
    author->{name, avatar, bio},
    categories[]->{title}
  }`, { slug });
}

export function useCases() {
  return useSanityData(`*[_type == "case"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    featured,
    publishedAt,
    technologies,
    client
  }`);
}

export function useCase(slug: string) {
  return useSanityDocument(`*[_type == "case" && slug.current == $slug][0] {
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
  }`, { slug });
}

export function useFAQs() {
  return useSanityData(`*[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }`);
}

export function useSiteSettings() {
  return useSanityDocument(`*[_type == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    logo,
    favicon,
    socialLinks,
    contactInfo
  }`);
}