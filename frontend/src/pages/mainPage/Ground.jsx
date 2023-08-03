import * as THREE from "three";

export default function Ground(props) {
  const groundGeo = new THREE.PlaneGeometry(300, 300); // 땅 지오메트리 생성
  const groundMat = new THREE.MeshStandardMaterial({ color: "#815639" }); // 갈색 머티리얼 생성

  return (
    <mesh {...props} geometry={groundGeo} material={groundMat} receiveShadow rotation={[Math.PI / -2, 0, Math.PI]} />
  );
}
