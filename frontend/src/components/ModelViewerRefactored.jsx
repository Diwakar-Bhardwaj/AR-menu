import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { createScene, createCamera, createRenderer, setupLighting } from './3D/SceneSetup';
import { useMouseControls } from './3D/MouseControls';
import FoodModelFactory from './3D/FoodModelFactory';

const ModelViewer = ({ modelPath, foodType = "pizza", className = "" }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const foodModelRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mouse controls
  const {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleWheel,
    resetView,
    isMouseDown
  } = useMouseControls(foodModelRef, cameraRef);

  useEffect(() => {
    if (!mountRef.current) return;

    // Define here so cleanup can reference it safely
    let handleResize;

    try {
      // Scene setup
      const scene = createScene();
      sceneRef.current = scene;

      const camera = createCamera();
      cameraRef.current = camera;

      const renderer = createRenderer();
      rendererRef.current = renderer;

      // Lighting
      setupLighting(scene);

      // Create food model
      const foodModel = FoodModelFactory(foodType);
      foodModelRef.current = foodModel;
      scene.add(foodModel);

      // Add event listeners
      mountRef.current.addEventListener('mousedown', handleMouseDown);
      mountRef.current.addEventListener('mouseup', handleMouseUp);
      mountRef.current.addEventListener('mousemove', handleMouseMove);
      mountRef.current.addEventListener('wheel', handleWheel);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Gentle rotation when not being controlled
        if (!isMouseDown && foodModelRef.current) {
          foodModelRef.current.rotation.y += 0.005;
        }

        renderer.render(scene, camera);
      };

      animate();

      // Mount the renderer
      mountRef.current.appendChild(renderer.domElement);

      // Handle resize
      handleResize = () => {
        const container = mountRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousedown', handleMouseDown);
        mountRef.current.removeEventListener('mouseup', handleMouseUp);
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
        mountRef.current.removeEventListener('wheel', handleWheel);
        if (handleResize) {
          window.removeEventListener('resize', handleResize);
        }
        
        if (mountRef.current.contains(rendererRef.current?.domElement)) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [foodType]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-2xl ${className}`}>
        <div className="text-center text-red-500">
          <p>Error loading 3D model</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading 3D model...</p>
          </div>
        </div>
      )}
      <div 
        ref={mountRef} 
        className="w-full h-full bg-gray-100 rounded-2xl shadow-lg cursor-grab active:cursor-grabbing"
        style={{ minHeight: '400px' }}
      />
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={resetView}
          className="px-3 py-2 bg-white bg-opacity-90 text-gray-700 rounded-lg shadow hover:bg-opacity-100 transition text-sm"
        >
          Reset View
        </button>
      </div>
    </div>
  );
};

export default ModelViewer;
