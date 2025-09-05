import * as THREE from 'three';

const GenericModel = () => {
  const group = new THREE.Group();

  // Default generic food model
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshLambertMaterial({ color: 0xff6b6b });
  const food = new THREE.Mesh(geometry, material);
  food.castShadow = true;
  food.receiveShadow = true;
  group.add(food);

  return group;
};

export default GenericModel;
