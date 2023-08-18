import { Suspense } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Canvas } from "@react-three/fiber";
import { Sky, OrbitControls } from "@react-three/drei";
import GrassWithFlowers from "./Grass";
import Ground from "./Ground";
import Cloud1 from "./Clouds";
import { TryGetUser, TryGetExp } from "apis/GetUserAPIs";
import { useState, useEffect } from "react";
import { Experience } from "components/Experience";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  margin-top: 80px;
  position: relative;
`


export default function MainPage() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // console.log(user);

  useEffect(() => {
    if (!user.accessToken) {
      navigate("/signin");

      return;
    }
  }, []);
  const token = useSelector(state => state.user.accessToken);

  const [exp, setExp] = useState(0)
  
  const handleFindUser = async () => {
    const result = await TryGetUser(token);
    const result2 = await TryGetExp(result.response.memberId)
        setExp(result2.response);
  };

  useEffect(() => {
    if (!user.accessToken) {
      navigate("/signin");

      return;
    }

    handleFindUser();
  }, []);

  return (
    <Wrapper>
      <Canvas style={{ width: "100%" }} camera={{ position: [0, 0, 150]}}>
        <Sky azimuth={0.5} inclination={0.6} distance={1000} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <GrassWithFlowers />
          <Ground position={[0, -15, 0]}/>
          <Experience exp={exp}/>
          <Cloud1 position={[100, 35, -25]}  scale={[10, 10, 12]} rotation={[0, 55, 0]} opacity={10}/>
          <Cloud1 position={[-98, 53, -25]}  scale={[7, 7, 12]} rotation={[0, -10, 0]}/>
          <Cloud1 position={[-110, 40, -25]}  scale={[10, 10, 14]}/>
          <Cloud1 position={[-50, 53, -25]}  scale={[7, 7, 12]} />
          <Cloud1 position={[-40, 47, -25]}  scale={[10, 10, 14]} rotation={[0, -90, 0]}/>
        </Suspense>
        <OrbitControls
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.5}
          enableZoom={false} // 줌 기능 비활성화
        />
      </Canvas>
    </Wrapper>
  );
}
