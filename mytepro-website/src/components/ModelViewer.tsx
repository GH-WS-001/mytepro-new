'use client';

import { useEffect, useRef } from 'react';

interface ModelViewerProps {
  modelPath: string;
  autoRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  className?: string;
}

export default function ModelViewer({ 
  modelPath, 
  autoRotate = true, 
  enableZoom = true, 
  enablePan = true,
  className = '' 
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 这里可以集成Three.js或其他3D库
    // 目前只是一个占位符
    const container = containerRef.current;
    if (!container) return;

    // 创建一个简单的3D场景占位符
    const canvas = document.createElement('div');
    canvas.className = 'w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center';
    canvas.innerHTML = `
      <div class="text-center">
        <div class="text-4xl mb-4">🎮</div>
        <div class="text-gray-300">3D Model Viewer</div>
        <div class="text-sm text-gray-500 mt-2">${modelPath}</div>
      </div>
    `;
    
    container.appendChild(canvas);

    return () => {
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [modelPath]);

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className}`}
    >
      <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🎮</div>
          <div className="text-gray-300">3D Model Viewer</div>
          <div className="text-sm text-gray-500 mt-2">{modelPath}</div>
        </div>
      </div>
    </div>
  );
}