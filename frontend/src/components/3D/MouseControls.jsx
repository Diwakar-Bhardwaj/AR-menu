import { useRef } from 'react';

export const useMouseControls = (foodModelRef, cameraRef) => {
  const isMouseDownRef = useRef(false);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const rotationXRef = useRef(0);
  const rotationYRef = useRef(0);

  const handleMouseDown = (event) => {
    isMouseDownRef.current = true;
    mouseXRef.current = event.clientX;
    mouseYRef.current = event.clientY;
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
  };

  const handleMouseMove = (event) => {
    if (!isMouseDownRef.current || !foodModelRef.current) return;

    const deltaX = event.clientX - mouseXRef.current;
    const deltaY = event.clientY - mouseYRef.current;

    rotationYRef.current += deltaX * 0.01;
    rotationXRef.current += deltaY * 0.01;

    foodModelRef.current.rotation.y = rotationYRef.current;
    foodModelRef.current.rotation.x = rotationXRef.current;

    mouseXRef.current = event.clientX;
    mouseYRef.current = event.clientY;
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (!cameraRef.current) return;
    
    const delta = event.deltaY * 0.001;
    cameraRef.current.position.z = Math.max(2, Math.min(10, cameraRef.current.position.z + delta));
  };

  const resetView = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 5);
    }
    if (foodModelRef.current) {
      foodModelRef.current.rotation.set(0, 0, 0);
      rotationXRef.current = 0;
      rotationYRef.current = 0;
    }
  };

  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleWheel,
    resetView,
    isMouseDown: isMouseDownRef.current
  };
};
