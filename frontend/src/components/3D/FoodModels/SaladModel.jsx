import * as THREE from 'three';

const SaladModel = () => {
  const group = new THREE.Group();

  // Bowl
  const bowlGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.4, 32);
  const bowlMaterial = new THREE.MeshLambertMaterial({ color: 0xf5f5dc });
  const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial);
  bowl.position.y = 0;
  bowl.castShadow = true;
  group.add(bowl);

  // Lettuce pieces
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

  return group;
};

export default SaladModel;
