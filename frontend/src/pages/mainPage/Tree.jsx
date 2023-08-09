
import React from "react";
import { useGLTF, ContactShadows } from '@react-three/drei'

// import treeTexture from "assets/images/zzzz.jpg"; // 나무 텍스처 이미지 임포트

const MODELS = {
    Beech: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-beech/model.gltf',
  }

export default function Tree() {
    const model  = { model: { value: 'Beech', options: Object.keys(MODELS) } }

    function Model({ url, ...props }) {
        const { scene } = useGLTF(url)
        // <primitive object={...} mounts an already existing object
        return <primitive object={scene} {...props} />
      }
    
    Object.values(MODELS).forEach(useGLTF.preload)

    return (
        <>
            <hemisphereLight color="white" groundColor="blue" intensity={0.75} />
            <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
            <group position={[0, -10, 0]}>
              <Model position={[0, 0.25, 0]} url={MODELS[model]} />
              <ContactShadows scale={20} blur={10} far={20} />
            </group>
        </>
      )
}


