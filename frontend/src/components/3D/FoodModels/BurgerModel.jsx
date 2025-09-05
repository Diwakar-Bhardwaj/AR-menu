import * as THREE from 'three';

const BurgerModel = () => {
  const group = new THREE.Group();

  // Top bun
  const bunGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.2, 32);
  const bunMaterial = new THREE.MeshLambertMaterial({ color: 0xd2b48c });
  const topBun = new THREE.Mesh(bunGeometry, bunMaterial);
  topBun.position.y = 0.6;
  topBun.castShadow = true;
  group.add(topBun);

  // Bottom bun
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

  return group;
};

export default BurgerModel;
