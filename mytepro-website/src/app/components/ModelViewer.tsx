'use client';

import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, Stats } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// 模型加载组件
function Model({ url }: { url: string }) {
  const modelRef = useRef<THREE.Group>(null);
  const [model, setModel] = useState<GLTF | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useFrame((state) => {
    if (modelRef.current) {
      // 轻微自动旋转
      modelRef.current.rotation.y += 0.002;
    }
  });

  // 加载模型
  const loader = new GLTFLoader();
  loader.load(
    url,
    (gltf) => {
      setModel(gltf);
      setError(null);
    },
    (progress) => {
      // 加载进度
      console.log('Loading progress:', progress);
    },
    (err) => {
      setError('模型加载失败');
      console.error('Error loading model:', err);
    }
  );

  if (error) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  if (!model) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    );
  }

  return <primitive ref={modelRef} object={model.scene} />;
}

// 场景设置组件
function Scene({ modelUrl }: { modelUrl: string }) {
  const { camera } = useThree();
  
  // 设置相机位置
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);

  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.6} />
      
      {/* 方向光 */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* 点光源 */}
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* 模型 */}
      <Model url={modelUrl} />
      
      {/* 网格地面 */}
      <Grid 
        args={[10, 10]} 
        cellSize={1} 
        cellThickness={0.5} 
        cellColor="#6b7280" 
        sectionSize={3} 
        sectionThickness={1} 
        sectionColor="#374151"
        fadeDistance={25}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid
      />
      
      {/* 环境贴图 */}
      <Environment preset="warehouse" />
      
      {/* 轨道控制器 */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={20}
        enableDamping={true}
        dampingFactor={0.05}
      />
      
      {/* 性能监控 */}
      <Stats />
    </>
  );
}

// 主组件
export default function ModelViewer({ modelPath = '/models/demo.glb' }: { modelPath?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleModelLoad = () => {
    setIsLoading(false);
  };

  const handleModelError = (err: any) => {
    setError('模型加载失败');
    setIsLoading(false);
    console.error('Model loading error:', err);
  };

  return (
    <div className="w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">加载3D模型中...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <div className="text-red-600 text-4xl mb-4">⚠️</div>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      )}
      
      <Canvas
        camera={{ position: [5, 5, 5], fov: 75 }}
        shadows
        onCreated={handleModelLoad}
        onError={handleModelError}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <Scene modelUrl={modelPath} />
        </Suspense>
      </Canvas>
      
      {/* 控制提示 */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded text-sm">
        <p>🖱️ 左键拖拽旋转 | 滚轮缩放 | 右键平移</p>
      </div>
    </div>
  );
}