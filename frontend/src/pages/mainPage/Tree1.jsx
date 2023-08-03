import React from 'react';
import { Clone, useGLTF, useTexture } from '@react-three/drei';
import te1 from 'assets/images/foliage_alpha3-removebg-preview.png'
import te2 from 'assets/images/foliage_alpha3-remove.png'


export function Tree1({ position, rotation,scale }) {
    const tree = useGLTF('https://douges.dev/static/tree.glb'); // 프로젝트 폴더에서 assets 폴더로 이동해야 하므로 '../../..'를 사용합니다.

    const yourTexture = useTexture(te1)
    const yourTexture1 = useTexture(te2)
    
  return (
    <group name="tree" rotation={rotation} position={position} scale={scale}>
      <Clone
        receiveShadow
        castShadow
        object={tree.nodes.trunk}
        >
        <meshStandardMaterial 
        attach="material" 
        map={yourTexture1}
        />
        </Clone>
    <Clone receiveShadow castShadow object={tree.nodes.foliage} >
        <meshStandardMaterial 
        attach="material" 
        map={yourTexture} 
        roughness={0.3} // 약간의 거칠기
        metalness={0.1} // 약간의 금속성
        />
    </Clone>
    </group>
  );
}