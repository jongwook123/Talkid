import React from 'react';
import { Clone, useGLTF, useTexture } from '@react-three/drei';
import te1 from 'assets/images/Tree1.png'
import te2 from 'assets/images/foliage_alpha3-remove.png'
export function Tree1({ position, rotation,scale }) {
  const tree = useGLTF('https://douges.dev/static/tree.glb');
    const yourTexture = useTexture(te1)
    const yourTexture1 = useTexture(te2)
    
  return (
    <group rotation={rotation} position={position} scale={scale} color="green">
      <Clone
        receiveShadow
        castShadow
        object={tree.nodes.trunk}
        >
        <meshStandardMaterial 
        attach="material" 
        map={yourTexture}
        />
        </Clone>
    {/* <Clone receiveShadow castShadow object={tree.nodes.foliage} >
        <meshStandardMaterial 
        attach="material" 
        map={yourTexture} 
        alphaMap={yourTexture}
        roughness={0.3} // 약간의 거칠기
        metalness={0.1} // 약간의 금속성
        />
    </Clone> */}
    </group>
  );
}