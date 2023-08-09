import React from "react";

export function TShapeStructure(props) {

  return (
    <group {...props}>
      {/* T-shape의 수직 부분 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 10, 3]} />
        <meshStandardMaterial color="#FFCCAB" />
      </mesh>
      
      {/* T-shape의 수평 부분 */}
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[10, 4, 3]} />
        <meshStandardMaterial color="#FFCCAB" />
      </mesh>
    </group>
  );
}

export function SShapeStructure(props) {
    return (
      <group {...props}>
        {/* 반대로 뒤집힌 S-shape의 상단 부분 */}
        <mesh position={[-1.75, 6, 0]}>
          <boxGeometry args={[8, 3, 3]} />
          <meshStandardMaterial color="#FFCCAB" />
          
        </mesh>
        <mesh position={[-4.25, 4, 0]}>
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color="#FFCCAB" />
        </mesh>
  
        {/* 반대로 뒤집힌 S-shape의 중앙 부분 */}
        <mesh position={[-1.75, 1, 0]}>
          <boxGeometry args={[8, 3, 3]} />
          <meshStandardMaterial color="#FFCCAB" />
        </mesh>
        <mesh position={[0.75, -1.5, 0]}>
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color="#FFCCAB" />
        </mesh>
  
        {/* 반대로 뒤집힌 S-shape의 하단 부분 */}
        <mesh position={[-1.75, -4, 0]}>
          <boxGeometry args={[8, 3, 3]} />
          <meshStandardMaterial color="#FFCCAB" />
        </mesh>
      </group>
    );
  }

  export function LShapeStructure(props) {
    return (
      <group {...props}>
        {/* L-shape의 왼쪽 수직 부분 */}
        <mesh position={[-3, -1, 0]}>
          <boxGeometry args={[4, 13, 3]} />
          <meshStandardMaterial color="#8EA3BC" />
        </mesh>
  
        {/* L-shape의 아래쪽 수평 부분 */}
        <mesh position={[0, -6, 0]}>
          <boxGeometry args={[10, 4, 3]} />
          <meshStandardMaterial color="#8EA3BC" />
        </mesh>
      </group>
    );
  }

  export function KShapeStructure(props) {
    return (
      <group {...props}>
        {/* K-shape의 왼쪽 수직 부분 */}
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[4, 13, 3]} />
          <meshStandardMaterial color="#FFCCAB" />
        </mesh>
  
        {/* K-shape의 상단 가로 부분 */}
        <mesh position={[3, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[10, 4, 3]} />
          <meshStandardMaterial color="#FFCCAB" />
        </mesh>
  
        {/* K-shape의 오른쪽 하단 대각선 부분 */}
        <mesh position={[3, -2, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[10, 4, 3]} />
          <meshStandardMaterial color="#FFCCAB" />
        </mesh>
      </group>
    );
  }


  export function IShapeStructure(props) {
    return (
      <group {...props}>
        {/* I-shape의 수직 부분 */}
        <mesh position={[0, -2, 0]}>
          <boxGeometry args={[4, 13, 3]} />
          <meshStandardMaterial color="#9BBA8E" />
        </mesh>
      </group>
    );
  }
  

  export function DShapeStructure(props) {
    return (
      <group {...props}>
        {/* K-shape의 왼쪽 수직 부분 */}
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[4, 13, 3]} />
          <meshStandardMaterial color="#8EA3BC" />
        </mesh>
        {/* K-shape의 오른쪽 수직 부분 */}
        <mesh position={[6.8, -1, 0]}>
          <boxGeometry args={[3, 6.5, 3]} />
          <meshStandardMaterial color="#8EA3BC" />
        </mesh>
  
        {/* K-shape의 상단 가로 부분 */}
        <mesh position={[4.5, 2.5, 0]} rotation={[0, 0, -Math.PI / 7]}>
          <boxGeometry args={[7, 3, 3]} />
          <meshStandardMaterial color="#8EA3BC" />
        </mesh>
  
        {/* K-shape의 오른쪽 하단 대각선 부분 */}
        <mesh position={[4.5, -4.7, 0]} rotation={[0, 0, Math.PI / 7]}>
          <boxGeometry args={[7, 3, 3]} />
          <meshStandardMaterial color="#8EA3BC" />
        </mesh>
      </group>
    );
  }


  export function AShapeStructure(props) {
      const groupRef = React.useRef();
    
      return (
        <group ref={groupRef} {...props}>
  
          <mesh position={[0, 4.8, 0]}>
            <boxGeometry args={[4.5, 2, 3]} />
            <meshStandardMaterial color="#9BBA8E" />
          </mesh>
    
  
          <mesh position={[0, -3, 0]}>
            <boxGeometry args={[5, 2, 3]} />
            <meshStandardMaterial color="#9BBA8E" />
          </mesh>
    
          {/* A-shape의 왼쪽 수직 부분 */}
          <mesh position={[-3, -1, 0]} rotation={[0, 0, -Math.PI / 8]}>
            <boxGeometry args={[4, 13, 3]} />
            <meshStandardMaterial color="#9BBA8E" />
          </mesh>
    
          {/* A-shape의 오른쪽 수직 부분 */}
          <mesh position={[3, -1, 0]} rotation={[0, 0, Math.PI / 8]}>
            <boxGeometry args={[4, 13, 3]} />
            <meshStandardMaterial color="#9BBA8E" />
          </mesh>
        </group>
      );
    }
