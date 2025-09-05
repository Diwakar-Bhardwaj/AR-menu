import * as THREE from 'three';

const PizzaModel = () => {
  const group = new THREE.Group();

  // Pizza base (crust)
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

  // Pepperoni toppings
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

  return group;
};

export default PizzaModel;
