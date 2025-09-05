import * as THREE from 'three';

const PastaModel = () => {
  const group = new THREE.Group();

  // Plate
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

  return group;
};

export default PastaModel;
