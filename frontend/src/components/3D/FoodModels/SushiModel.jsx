import * as THREE from 'three';

const SushiModel = () => {
  const group = new THREE.Group();

  // Create multiple sushi pieces
  for (let i = 0; i < 6; i++) {
    // Rice base
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

  return group;
};

export default SushiModel;
