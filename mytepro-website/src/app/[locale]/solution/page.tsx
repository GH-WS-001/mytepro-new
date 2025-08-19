'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const solutions = [
  {
    id: 'digital-twin',
    titleKey: 'digitalTwin',
    descKey: 'digitalTwinDesc',
    icon: '🏗️',
    features: [
      'digitalTwinFeature1',
      'digitalTwinFeature2',
      'digitalTwinFeature3',
      'digitalTwinFeature4'
    ]
  },
  {
    id: 'ai-chat',
    titleKey: 'aiChat',
    descKey: 'aiChatDesc',
    icon: '🤖',
    features: [
      'aiChatFeature1',
      'aiChatFeature2',
      'aiChatFeature3',
      'aiChatFeature4'
    ]
  },
];

export default function SolutionPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations('solution');
  const tHome = useTranslations('HomePage');
  const tBlog = useTranslations('Blog');
  const tCases = useTranslations('Cases');
  const locale = useLocale();
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
    if (typeof window !== 'undefined') {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Navigation - Consistent with homepage */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">MyTePro</div>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href={`/${resolvedParams?.locale || 'en'}`} className="text-gray-300 hover:text-blue-400 transition-colors">{tHome('home')}</Link>
              <span className="text-blue-400">{tHome('solutions')}</span>
              {resolvedParams && (
                <Link href={`/${resolvedParams.locale}/vr`} className="text-gray-300 hover:text-blue-400 transition-colors">{tHome('vrDigitalTwin')}</Link>
              )}
              {resolvedParams && (
                <Link href={`/${resolvedParams.locale}/blog`} className="text-gray-300 hover:text-blue-400 transition-colors">{tBlog('title')}</Link>
              )}
              {resolvedParams && (
                <Link href={`/${resolvedParams.locale}/cases`} className="text-gray-300 hover:text-blue-400 transition-colors">{tCases('title')}</Link>
              )}
              <Link href={`/${locale}/contact`} className="text-gray-300 hover:text-blue-400 transition-colors">{tHome('contact')}</Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                {tHome('getStarted')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Matches feature page style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-fixed opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-blue-900/40 to-transparent"></div>
        
        {/* Animated floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-3000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-6000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-blue-300 text-sm font-medium">{t('subtitle')}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.4 }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {t('title')}
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
            >
              {t('heroSubtitle')}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  {tHome('getStarted')}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group border-2 border-blue-400 text-blue-400 px-10 py-4 rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:bg-blue-400 hover:text-white"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tHome('watchDemo')}
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-gray-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Solutions Grid Section */}
      <section className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              {t('solutionsTitle')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              {t('solutionsSubtitle')}
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative group bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {solution.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {t(solution.titleKey)}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                    {t(solution.descKey)}
                  </p>
                  
                  {/* Features list */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-blue-300 mb-3">{t('keyFeatures')}</h4>
                    <ul className="space-y-2">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          {t(feature)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link 
                    href={`/${locale}/solution/${solution.id}`}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    {t('viewDetail')}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-bl-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
          >
            {t('readyToTransform')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {t('readyToTransformDesc')}
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              {tHome('getStarted')}
            </motion.button>
            {resolvedParams && (
              <Link 
                href={`/${resolvedParams.locale}`}
                className="px-10 py-4 border-2 border-blue-400 text-blue-400 font-bold rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300 inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2 2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {tHome('home')}
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}