import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, OrbitControls } from "@react-three/drei";
import { Wrapper } from "components/dropboxes/dropbox1/style";
import GrassWithFlowers from "./Grass";
import Ground from "./Ground";
import { Tree } from "./Tree";
import { Tree1 } from "./Tree1";


export default function MainPage() {
  return (
    <Wrapper>
      <Canvas style={{ width: "100%", height: "100vh" }} camera={{ position: [30, 5, 50] }}>
        <Sky azimuth={1} inclination={0.6} distance={1000} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <GrassWithFlowers />
          <Ground position={[0, -15, 0]} />
          <Tree position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[5, 5, 5]} />
          <Tree position={[50, 0, 0]} rotation={[0, 0, 0]} scale={[10, 10, 10]} />
          <Tree position={[100, 0, 0]} rotation={[0, 20, 0]} scale={[15, 15, 15]} />
          <Tree1 position={[10, 0, 0]} rotation={[0, 20, 0]} scale={[15, 15, 15]} />

        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} enableZoom={true} />
      </Canvas>
    </Wrapper>
  );
}
