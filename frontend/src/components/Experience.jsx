import { ContactShadows, OrbitControls } from "@react-three/drei";

import { Carousel } from "./Carousel";

import { useFrame } from "@react-three/fiber";
import { LayerMaterial } from "lamina";
import { useRef } from "react";
import * as THREE from "three";

const BG_SPEED = 0.3;

const Background = () => {
  const ref = useRef();

  useFrame((_state, delta) => {
    ref.current.rotation.x =
      ref.current.rotation.y =
      ref.current.rotation.z +=
        delta * BG_SPEED;
  });

  return (
    <mesh scale={100} ref={ref}>
      <LayerMaterial side={THREE.BackSide}>
      </LayerMaterial>
    </mesh>
  );
};

export const Experience = ({exp}) => {
  
  return (
    <>
      <OrbitControls enableZoom={false}/>

      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 20, 20]} intensity={1} />

      <Carousel exp={exp}/>
      <ContactShadows scale={30} opacity={0.32} />

      <Background />
    </>
  );
};
