import { Suspense } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Canvas } from "@react-three/fiber";
import { Sky, OrbitControls } from "@react-three/drei";
import { Wrapper } from "components/dropboxes/dropbox1/style";
import GrassWithFlowers from "./Grass";
import Ground from "./Ground";
import { Tree3 } from "./Tree3";
import Cloud1 from "./Clouds";
import {
  AShapeStructure,
  DShapeStructure,
  IShapeStructure,
  KShapeStructure,
  LShapeStructure,
  SShapeStructure,
  TShapeStructure,
} from "./ShapeStructure";
import { Tree2 } from "./Tree2";
import { Tree1 } from "./Tree1";
import { Bookmark } from "./Bookmark";
import { useEffect } from "react";

import { TryGetUser, TryGetExp } from "apis/GetUserAPIs";
import { useState } from "react";

export default function MainPage() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (!user.accessToken) {
      navigate("/signin");
    }
  }, []);

  return (
    <Wrapper>
      {/* <Canvas style={{ width: "100%", height: "100vh" }} camera={{ position: [0, 0, 150]}}>
  
  const token = useSelector(state => state.user.token);

  const [exp, setExp] = useState(0)
  
  const handleFindUser = async () => {
    const result = await TryGetUser(token);
    const result2 = await TryGetExp(result.response.memberId)
        setExp(result2.response);
  };

  useEffect(() => {
    handleFindUser();
  }, []);

  return (
    <Wrapper>
      <Canvas style={{ width: "100%", height: "100vh" }} camera={{ position: [0, 0, 150]}}>
        <Sky azimuth={0.5} inclination={0.6} distance={1000} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <GrassWithFlowers />
          <Ground position={[0, -15, 0]}/>

          {exp >= 0 & exp < 100 && (
            <>
            <Tree1 position={[0,0,50]} rotation={[0, 4, 0]} scale={[7, 8, 6]} />
          </>
          )}
          {exp >= 100 & exp < 200 && (
          <>
             <Tree2 position={[0,0,50]} rotation={[0, 10, 0]} scale={[10, 10, 20]} />
          </>
          )}
          {exp >= 200 && (
          <>
            <Tree3 position={[0, 0, 50]}  scale={[15, 15, 10]} />
          </>
          )}
       
          <TShapeStructure position={[-44, 8, 80]} />
          <AShapeStructure position={[-30, 10, 80]} rotation={[50,0,0]} />
          <LShapeStructure position={[-15, 10, 80]} />
          <KShapeStructure position={[-5, 10, 80]} />
          <IShapeStructure position={[8, 10, 80]}/>
          <DShapeStructure position={[15, 10, 80]} />
          <SShapeStructure position={[34, 7, 80]} rotation={[50,0,0]}/>
          <Cloud1 position={[100, 35, -25]}  scale={[10, 10, 12]} rotation={[0, 55, 0]} opacity={10}/>
          <Cloud1 position={[-98, 53, -25]}  scale={[7, 7, 12]} rotation={[0, -10, 0]}/>
          <Cloud1 position={[-110, 47, -25]}  scale={[10, 10, 14]}/>
          <Cloud1 position={[40, 53, -25]}  scale={[7, 7, 12]} rotation={[0, -30, 0]}/>
          <Cloud1 position={[50, 47, -25]}  scale={[10, 10, 14]}/>
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} enableZoom={true} />
      </Canvas> */}
    </Wrapper>
  );
}
