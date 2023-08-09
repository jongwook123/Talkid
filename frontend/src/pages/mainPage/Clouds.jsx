// import React, { Suspense } from "react"
// import { Canvas, useFrame, useThree } from "@react-three/fiber"
// import { Cloud, Sky } from "@react-three/drei"
import cloudTexture from "assets/images/cloud.png"

import { Clone, useGLTF, useTexture } from '@react-three/drei';
export default function Cloud1({ position, rotation,scale}) {
  const tree = useGLTF('https://douges.dev/static/tree.glb');
    // const yourTexture = useTexture(te1)
    const yourTexture = useTexture(cloudTexture)
    
  
    return (
      <group name="cloud" rotation={rotation} position={position} scale={scale}>
      <Clone receiveShadow castShadow object={tree.nodes.foliage}>
        <meshStandardMaterial 
          attach="material" 
          map={yourTexture} 
          alphaMap={yourTexture}  // 투명도를 적용할 알파 맵 텍스처
          transparent={true}      // 투명한 머티리얼을 사용하도록 설정
          opacity={1}       // 원하는 투명도 값 (0에서 1 사이의 값)
          roughness={0.3}
          metalness={0.1}

        />
      </Clone>
    </group>
    
    );
  }
