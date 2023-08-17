import { animated, useSpring } from "@react-spring/three";
import { Float } from "@react-three/drei";
import { Palm } from "./Beach/Palm";
import { VolleyBall } from "./Beach/VolleyBall";
import { Cauldron } from "./Haunted/Cauldron";
import { Fence } from "./Haunted/Fence";
import { Witch } from "./Haunted/Witch";
import { FerrisWheel } from "./Park/FerrisWheel";
import { Podium } from "./Park/Podium";

const STEP_DURATION = 5000;
const dummyexp = 400
export const Carousel = (props) => {
  const { carouselRotation } = useSpring({
    from: {
      carouselRotation: 0,
    },
    to: [
      {
        carouselRotation: -Math.PI / 2,
        delay: STEP_DURATION,
      },
      {
        carouselRotation: -Math.PI,
        delay: STEP_DURATION,
      },
      {
        carouselRotation: -1.5 * Math.PI,
        delay: STEP_DURATION,
      },
      {
        carouselRotation: -2 * Math.PI,
        delay: STEP_DURATION,
      },
    ],
    config: {
      mass: 5,
      tension: 400,
      friction: 50,
    },
    loop: true,
    immediate: true,
  });

  return (
    <>
      <group rotation-y={-Math.PI / 4} position-y={-0.01}>
        <animated.group>
          <mesh position={[0, -2, 0]}>
            <meshStandardMaterial color={"white"} />
          </mesh>
          <mesh scale={[1, 6, 24]} position-y={3}>
            <meshStandardMaterial color={"white"} />
          </mesh>
          <mesh scale={[24, 6, 1]} position-y={3}>
            <meshStandardMaterial color={"white"} />
          </mesh>

          <FerrisWheel position={[-20, 0, -60]} scale={[40, 40, 40]} rotation-y={Math.PI / 5}/>
          <Palm scale={[30, 30, 30]} position={[-30, 0, 80]} />
            <Palm
              scale={[20, 20, 20]}
              position={[-30, 0, 90]}
              rotation-y={Math.PI / 6}
            />

          {props.exp >= 0 && (
            <VolleyBall
            rotation-y={Math.PI / 3.5}
            position={[40,8,50]}
            />
          )}
          {dummyexp >= 100  && (
          <>
            <Float speed={-1} floatIntensity={0.01}>
                <Witch
                  position={[100, 10, 0]}
                  scale={[10, 10, 10]}
                />
            </Float>
            <Fence
              position={[90, 5, -20]}
              scale={[20, 20, 20]}
              rotation-y={Math.PI / 15}
            />
            <Cauldron position={[110, 10, 20]} scale={[5, 5, 5]} />
            
          </>
          )}
          {dummyexp >= 200 && (
          <>
            <Podium position={[-44, 8, 80]} rotation-y={Math.PI / 2} />
          </>
          )}

        </animated.group>
      </group>
    </>
  );
};
