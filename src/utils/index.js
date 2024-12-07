import * as THREE from 'three';

export const createGroupGeometry = (mesh, geometry) => {
  // 一种用于绘制线框样式几何体的材质
  const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5 } );
  // 一种用于具有镜面高光的光泽表面的材质
  const meshMaterial = new THREE.MeshPhongMaterial( { color: 0x156289, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );
  
  mesh.add(new THREE.LineSegments(geometry, lineMaterial));
  mesh.add(new THREE.Mesh(geometry, meshMaterial));
}

export const updateGroupGeometry = (mesh, geometry) => {
  // if (mesh.children) {}
  mesh.children[0]?.geometry?.dispose();
  mesh.children[1]?.geometry?.dispose();
	mesh.children[0].geometry = new THREE.WireframeGeometry(geometry);
	mesh.children[1].geometry = geometry;
}
