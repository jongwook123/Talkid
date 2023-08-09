import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Sky, OrbitControls } from "@react-three/drei"
import Grass from "./Grass"
import Ground from "./Ground"
import { Wrapper } from "components/dropboxes/dropbox1/style"
import Tree from "./Tree"

export default function MainPage() {
  
  return (
    <Wrapper>
      <Canvas style={{ width: "100%", height: "100vh" }} camera={{ position: [90, 5, 50] }}>
        <Sky azimuth={1} inclination={0.6} distance={1000} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Grass />
          <Tree position={[0, 0, 0]} />
          <Ground position={[0, -10, 0]} />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
      </Canvas>
    </Wrapper>
  )
}
