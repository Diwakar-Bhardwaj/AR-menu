import * as THREE from 'three';

const TacoModel = () => {
  const group = new THREE.Group();

  // Create multiple tacos
  for (let i = 0; i < 3; i++) {
    // Taco shell
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

  return group;
};

export default TacoModel;
