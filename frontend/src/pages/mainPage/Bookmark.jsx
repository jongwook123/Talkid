export function Bookmark(props) {
  return (
    <group {...props}>
        <DifferentColoredFaces position={[0, 0, 0]} />
    </group>
  );
}

function DifferentColoredFaces(props) {


  return (
    <group {...props}>
      {/* 윗면 */}
      <mesh position={[0, 10, 2.5]}>
        <boxGeometry args={[15, 0, 5]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* 아랫면 */}
      <mesh position={[0, -15, 0]}>
        <boxGeometry args={[30, 0, 10]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* 왼쪽면 */}
      <mesh position={[-15, 0, 0]}>
        <boxGeometry args={[0, 30, 10]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* 오른쪽면 */}
      <mesh position={[15, 0, 0]}>
        <boxGeometry args={[0, 30, 10]} />
        <meshStandardMaterial color="yellow" />
      </mesh>

      {/* 뒷쪽면 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[15, 20, 0]} />
        <meshStandardMaterial color="purple" />
      </mesh>

      {/* 앞쪽면 */}
      <mesh position={[0, 0, 5]}>
        <boxGeometry args={[15, 20, 0]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </group>
  );
}
