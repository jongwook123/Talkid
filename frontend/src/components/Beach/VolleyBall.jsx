import { useSpring } from "@react-spring/three";
import Duck from "../Park/Duck";
import { BeachBall } from "./BeachBall";

export const VolleyBall = (props) => {
  const { beachBallPosition } = useSpring({
    from: {
      beachBallPosition: 0,
    },
    to: [
      {
        beachBallPosition: 1,
      },
      {
        beachBallPosition: 0,
      },
    ],
    config: {
      mass: 2,
      tension: 170,
      friction: 36,
    },
    loop: true,
  });

  const ballX = beachBallPosition.to([-1, 0, 1], [-30, 0, 30]);
  const ballY = beachBallPosition.to([0, 0.5, 1, 1.5, 2], [16, 20, 16, 20, 16]);
  
  // duck1과 duck2의 점프 동작을 부드럽게 제어
  const duck1Jump = beachBallPosition.to(
    [0, 0.5, 1, 1.5, 2],
    [0, 1.5, 0, 1.5, 0]
  );
  
  const duck2Jump = beachBallPosition.to(
    [0, 0.5, 1, 1.5, 2],
    [0, 0, 1.5, 0, 1.5]
  );

  return (
    <group {...props}>
      <BeachBall
        scale={[5, 5, 5]}
        position-x={ballX}
        position-y={ballY}
        position-z={8}
      />
      <Duck
        scale={[7, 7, 7]}
        color={"yellow"}
        position={[1, 0, 8]}
        rotation-y={Math.PI / 2}
        position-y={duck1Jump}
      />
      <Duck
        scale={[7, 7, 7]}
        color={"pink"}
        position={[30, 0, 8]}
        rotation-y={-Math.PI / 2}
        position-y={duck2Jump}
      />
    </group>
  );
};
