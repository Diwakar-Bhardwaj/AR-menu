import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const ModelViewer = ({ modelPath, foodType = "pizza", className = "" }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(400, 400);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create a simple 3D food model based on food type
    const createFoodModel = () => {
      const group = new THREE.Group();

      if (foodType.toLowerCase().includes('pizza')) {
        // Pizza model
        const geometry = new THREE.CylinderGeometry(1.5, 1.5, 0.3, 32);
        const material = new THREE.MeshLambertMaterial({ color: 0xffd700 });
        const base = new THREE.Mesh(geometry, material);
        base.position.y = 0;
        base.castShadow = true;
        base.receiveShadow = true;
        group.add(base);

        // Cheese layer
        const cheeseGeometry = new THREE.CylinderGeometry(1.4, 1.4, 0.1, 32);
        const cheeseMaterial = new THREE.MeshLambertMaterial({ color: 0xfff8dc });
        const cheese = new THREE.Mesh(cheeseGeometry, cheeseMaterial);
        cheese.position.y = 0.2;
        cheese.castShadow = true;
        cheese.receiveShadow = true;
        group.add(cheese);

        // Pepperoni
        for (let i = 0; i < 6; i++) {
          const pepperoniGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16);
          const pepperoniMaterial = new THREE.MeshLambertMaterial({ color: 0x8b0000 });
          const pepperoni = new THREE.Mesh(pepperoniGeometry, pepperoniMaterial);
          
          const angle = (i / 6) * Math.PI * 2;
          pepperoni.position.x = Math.cos(angle) * 0.8;
          pepperoni.position.z = Math.sin(angle) * 0.8;
          pepperoni.position.y = 0.25;
          pepperoni.castShadow = true;
          group.add(pepperoni);
        }

        // Basil leaves
        for (let i = 0; i < 4; i++) {
          const leafGeometry = new THREE.SphereGeometry(0.1, 8, 6);
          const leafMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });
          const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
          
          const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
          leaf.position.x = Math.cos(angle) * 0.6;
          leaf.position.z = Math.sin(angle) * 0.6;
          leaf.position.y = 0.25;
          leaf.scale.set(1, 0.3, 1);
          leaf.castShadow = true;
          group.add(leaf);
        }
      } else if (foodType.toLowerCase().includes('burger')) {
        // Burger model
        const bunGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.2, 32);
        const bunMaterial = new THREE.MeshLambertMaterial({ color: 0xd2b48c });
        const topBun = new THREE.Mesh(bunGeometry, bunMaterial);
        topBun.position.y = 0.6;
        topBun.castShadow = true;
        group.add(topBun);

        const bottomBun = new THREE.Mesh(bunGeometry, bunMaterial);
        bottomBun.position.y = -0.6;
        bottomBun.castShadow = true;
        group.add(bottomBun);

        // Patty
        const pattyGeometry = new THREE.CylinderGeometry(1.1, 1.1, 0.3, 32);
        const pattyMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
        const patty = new THREE.Mesh(pattyGeometry, pattyMaterial);
        patty.position.y = 0;
        patty.castShadow = true;
        group.add(patty);

        // Lettuce
        const lettuceGeometry = new THREE.CylinderGeometry(1.15, 1.15, 0.1, 32);
        const lettuceMaterial = new THREE.MeshLambertMaterial({ color: 0x90ee90 });
        const lettuce = new THREE.Mesh(lettuceGeometry, lettuceMaterial);
        lettuce.position.y = 0.2;
        lettuce.castShadow = true;
        group.add(lettuce);
      } else if (foodType.toLowerCase().includes('sushi')) {
        // Sushi model
        for (let i = 0; i < 6; i++) {
          const sushiGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 16);
          const riceMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
          const sushi = new THREE.Mesh(sushiGeometry, riceMaterial);
          
          sushi.position.x = (i - 2.5) * 0.4;
          sushi.position.y = 0;
          sushi.castShadow = true;
          group.add(sushi);

          // Fish topping
          const fishGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.1, 16);
          const fishMaterial = new THREE.MeshLambertMaterial({ color: 0xff6b6b });
          const fish = new THREE.Mesh(fishGeometry, fishMaterial);
          fish.position.x = (i - 2.5) * 0.4;
          fish.position.y = 0.25;
          fish.castShadow = true;
          group.add(fish);
        }
      } else if (foodType.toLowerCase().includes('salad')) {
        // Salad model
        const bowlGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.4, 32);
        const bowlMaterial = new THREE.MeshLambertMaterial({ color: 0xf5f5dc });
        const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial);
        bowl.position.y = 0;
        bowl.castShadow = true;
        group.add(bowl);

        // Lettuce
        for (let i = 0; i < 8; i++) {
          const lettuceGeometry = new THREE.SphereGeometry(0.2, 8, 6);
          const lettuceMaterial = new THREE.MeshLambertMaterial({ color: 0x90ee90 });
          const lettuce = new THREE.Mesh(lettuceGeometry, lettuceMaterial);
          
          const angle = (i / 8) * Math.PI * 2;
          lettuce.position.x = Math.cos(angle) * 0.6;
          lettuce.position.z = Math.sin(angle) * 0.6;
          lettuce.position.y = 0.3;
          lettuce.scale.set(1, 0.5, 1);
          lettuce.castShadow = true;
          group.add(lettuce);
        }

        // Tomatoes
        for (let i = 0; i < 4; i++) {
          const tomatoGeometry = new THREE.SphereGeometry(0.15, 8, 6);
          const tomatoMaterial = new THREE.MeshLambertMaterial({ color: 0xff6347 });
          const tomato = new THREE.Mesh(tomatoGeometry, tomatoMaterial);
          
          const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
          tomato.position.x = Math.cos(angle) * 0.4;
          tomato.position.z = Math.sin(angle) * 0.4;
          tomato.position.y = 0.3;
          tomato.castShadow = true;
          group.add(tomato);
        }
      } else if (foodType.toLowerCase().includes('pasta')) {
        // Pasta model
        const plateGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 32);
        const plateMaterial = new THREE.MeshLambertMaterial({ color: 0xf5f5dc });
        const plate = new THREE.Mesh(plateGeometry, plateMaterial);
        plate.position.y = 0;
        plate.castShadow = true;
        group.add(plate);

        // Pasta strands
        for (let i = 0; i < 20; i++) {
          const pastaGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1.5, 8);
          const pastaMaterial = new THREE.MeshLambertMaterial({ color: 0xffd700 });
          const pasta = new THREE.Mesh(pastaGeometry, pastaMaterial);
          
          pasta.position.x = (Math.random() - 0.5) * 2;
          pasta.position.z = (Math.random() - 0.5) * 2;
          pasta.position.y = 0.1;
          pasta.rotation.x = Math.random() * Math.PI;
          pasta.rotation.z = Math.random() * Math.PI;
          pasta.castShadow = true;
          group.add(pasta);
        }
      } else if (foodType.toLowerCase().includes('taco')) {
        // Taco model
        for (let i = 0; i < 3; i++) {
          const tacoGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.8, 16, 1, true);
          const tacoMaterial = new THREE.MeshLambertMaterial({ color: 0xd2b48c });
          const taco = new THREE.Mesh(tacoGeometry, tacoMaterial);
          
          taco.position.x = (i - 1) * 0.6;
          taco.position.y = 0;
          taco.rotation.z = Math.PI / 2;
          taco.castShadow = true;
          group.add(taco);

          // Filling
          const fillingGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.6, 16, 1, true);
          const fillingMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
          const filling = new THREE.Mesh(fillingGeometry, fillingMaterial);
          
          filling.position.x = (i - 1) * 0.6;
          filling.position.y = 0;
          filling.rotation.z = Math.PI / 2;
          filling.castShadow = true;
          group.add(filling);
        }
      } else {
        // Default generic food model
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshLambertMaterial({ color: 0xff6b6b });
        const food = new THREE.Mesh(geometry, material);
        food.castShadow = true;
        food.receiveShadow = true;
        group.add(food);
      }

      return group;
    };

    // Add the food model
    const foodModel = createFoodModel();
    scene.add(foodModel);

    // Mouse controls for rotation
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let rotationX = 0;
    let rotationY = 0;

    const handleMouseDown = (event) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleMouseMove = (event) => {
      if (!isMouseDown) return;

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      rotationY += deltaX * 0.01;
      rotationX += deltaY * 0.01;

      foodModel.rotation.y = rotationY;
      foodModel.rotation.x = rotationX;

      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleWheel = (event) => {
      event.preventDefault();
      const delta = event.deltaY * 0.001;
      camera.position.z = Math.max(2, Math.min(10, camera.position.z + delta));
    };

    // Add event listeners
    mountRef.current.addEventListener('mousedown', handleMouseDown);
    mountRef.current.addEventListener('mouseup', handleMouseUp);
    mountRef.current.addEventListener('mousemove', handleMouseMove);
    mountRef.current.addEventListener('wheel', handleWheel);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Gentle rotation when not being controlled
      if (!isMouseDown) {
        foodModel.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Mount the renderer
    mountRef.current.appendChild(renderer.domElement);

    // Handle resize
    const handleResize = () => {
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

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousedown', handleMouseDown);
        mountRef.current.removeEventListener('mouseup', handleMouseUp);
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
        mountRef.current.removeEventListener('wheel', handleWheel);
        window.removeEventListener('resize', handleResize);
        
        if (mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
      
      renderer.dispose();
    };
  }, [modelPath]);

  const resetView = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 5);
    }
    if (sceneRef.current && sceneRef.current.children.length > 0) {
      const foodModel = sceneRef.current.children.find(child => child.type === 'Group');
      if (foodModel) {
        foodModel.rotation.set(0, 0, 0);
      }
    }
  };

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
