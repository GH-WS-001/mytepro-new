import { useTranslations } from 'next-intl';
// import { motion } from 'framer-motion';
// import ModelViewer from '../../components/ModelViewer';

export default function VRDigitalTwin() {
  const t = useTranslations('VRDigitalTwinPage');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Multi-layer background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-fixed opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        
        {/* Animated floating elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => {
            // Use deterministic positioning based on index to avoid hydration mismatch
            const left = ((i * 73) % 100); // Simple deterministic algorithm
            const top = ((i * 37) % 100);
            return (
              <div
                key={i}
                className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
                style={{
                  left: `${left}%`,
                  top: `${top}%`
                }}
              ></div>
            );
          })}
        </div>
        
        {/* Background effects - TEMPORARILY DISABLED */}
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Status badge */}
            <div
              className="inline-flex items-center px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-blue-300 text-sm font-medium">Next Generation VR Platform</span>
            </div>
            
            <h1 
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent leading-tight"
            >
              {t('heroTitle')}
            </h1>
            
            <p 
              className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-300 leading-relaxed"
            >
              {t('heroSubtitle')}
            </p>
            
            <div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <button
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
              >
                {t('scheduleDemo')}
              </button>
              <button
                className="px-10 py-4 bg-transparent border-2 border-white/50 text-white font-bold rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>
        
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative bg-black/20 backdrop-blur-sm">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-slate-900/10"></div>
        {/* Background effects - TEMPORARILY DISABLED */}
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              {t('featuresTitle')}
            </h2>
            <div 
              className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            ></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t('feature1'), desc: t('feature1Desc'), icon: '🏗️' },
              { title: t('feature2'), desc: t('feature2Desc'), icon: '🤝' },
              { title: t('feature3'), desc: t('feature3Desc'), icon: '📊' },
              { title: t('feature4'), desc: t('feature4Desc'), icon: '📱' }
            ].map((feature, index) => (
              <div
                key={index}
                className="relative group bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-300 overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Animated icon background */}
                <div 
                  className="absolute -top-4 -right-4 text-6xl opacity-10"
                >
                  {feature.icon}
                </div>
                
                <div className="relative z-10">
                  <div 
                    className="text-5xl mb-6"
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-blue-600/20 to-purple-600/20 rounded-tl-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20"
              style={{
                left: `${((i * 67) % 100)}%`,
                top: `${((i * 43) % 100)}%`
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div 
              className="space-y-8"
            >
              <h2 
                className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent leading-tight"
              >
                {t('ctaTitle')}
              </h2>
              <p 
                className="text-xl text-gray-300 leading-relaxed"
              >
                {t('ctaSubtitle')}
              </p>
              <div
                className="flex flex-col sm:flex-row gap-6"
              >
                <button
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
                >
                  {t('scheduleDemo')}
                </button>
                <button
                  className="px-8 py-4 bg-transparent border-2 border-blue-400/50 text-blue-400 font-bold rounded-full hover:bg-blue-400/10 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm"
                >
                  {t('learnMore')}
                </button>
              </div>
            </div>
            
            <div 
              className="relative"
            >
              <div 
                className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl p-1 backdrop-blur-sm border border-white/20 shadow-2xl"
              >
                <div className="relative bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 overflow-hidden">
                  {/* Animated grid background - TEMPORARILY DISABLED */}
                  
                  <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🎮</div>
                      <div className="text-gray-300">3D Model Viewer</div>
                      <div className="text-sm text-gray-500 mt-2">/models/sample.glb</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 relative bg-black/20 backdrop-blur-sm">
        {/* Background effects - TEMPORARILY DISABLED */}
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              Powered by Cutting-Edge Technology
            </h2>
            <div 
              className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            ></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Unity', desc: 'Real-time 3D Development', icon: '🎮' },
              { name: 'Unreal Engine', desc: 'Photorealistic Rendering', icon: '🔥' },
              { name: 'WebXR', desc: 'Cross-Platform VR', icon: '🌐' },
              { name: 'Three.js', desc: 'WebGL 3D Library', icon: '📐' }
            ].map((tech, index) => (
              <div
                key={index}
                className="relative group text-center"
              >
                <div 
                  className="relative bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Animated icon */}
                  <div 
                    className="text-5xl mb-4"
                  >
                    {tech.icon}
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {tech.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {tech.desc}
                    </p>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 bg-gradient-to-tl from-cyan-600/20 to-blue-600/20 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional tech info */}
          <div
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20 rounded-full">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-blue-300 font-medium">And 20+ more cutting-edge technologies</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}