import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Mundo(props) {
  const { nodes, materials }: any = useGLTF("/models/mundo-lowpoly2.glb");
  return (
    <group {...props} dispose={null}>
      <RigidBody type="fixed" colliders="trimesh" position={[0, 1, 0]}>
        <mesh
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials.Bush1_1}
          scale={15.84}
        />
        <group
          position={[0.73, 4.81, -8.55]}
          scale={0.27}
          castShadow
          receiveShadow
        >
          <mesh
            geometry={nodes.Cylinder024.geometry}
            material={materials["Tree3_1.001"]}
          />
          <mesh
            geometry={nodes.Cylinder024_1.geometry}
            material={materials["Tree3_2.001"]}
          />
        </group>
        <group position={[2.6, 4.16, -10.61]} scale={0.35}>
          <mesh
            geometry={nodes.Cylinder003.geometry}
            material={materials["Tree3_1.002"]}
          />
          <mesh
            geometry={nodes.Cylinder003_1.geometry}
            material={materials["Tree3_2.002"]}
          />
        </group>
        <mesh
          geometry={nodes.Rock4.geometry}
          material={materials.Rock1_1}
          position={[1.86, 4.62, -8.94]}
          scale={0.24}
        />
        <mesh
          geometry={nodes.Rock4001.geometry}
          material={materials["Rock1_1.001"]}
          position={[2.12, 4.49, -9.15]}
          rotation={[-0.59, -0.37, -0.79]}
          scale={0.24}
        />
        <mesh
          geometry={nodes.Rock3.geometry}
          material={materials["Rock1_1.002"]}
          position={[2.13, 4.45, -8.8]}
        />
        <group position={[-7.18, 4.6, 8.8]} scale={0.25}>
          <mesh
            geometry={nodes.Cube020.geometry}
            material={materials["Tree1_2.001"]}
          />
          <mesh
            geometry={nodes.Cube020_1.geometry}
            material={materials.Tree1}
          />
        </group>
        <group
          position={[-7.7, 3.71, 2.74]}
          rotation={[0, 0.56, 0]}
          scale={0.21}
        >
          <mesh
            geometry={nodes.Cube001.geometry}
            material={materials["Tree1_2.002"]}
          />
          <mesh
            geometry={nodes.Cube001_1.geometry}
            material={materials["Tree1.001"]}
          />
        </group>
        <group
          position={[12.46, 2.58, 10.66]}
          rotation={[Math.PI, -0.62, Math.PI]}
          scale={0.28}
        >
          <mesh
            geometry={nodes.Cube002.geometry}
            material={materials["Tree1_2.003"]}
          />
          <mesh
            geometry={nodes.Cube002_1.geometry}
            material={materials["Tree1.002"]}
          />
        </group>
        <group
          position={[10.24, 2.38, 11.99]}
          rotation={[0.98, 0, 0]}
          scale={0.36}
        >
          <mesh
            geometry={nodes.Cylinder005.geometry}
            material={materials.Stump1_1}
          />
          <mesh
            geometry={nodes.Cylinder005_1.geometry}
            material={materials.Stump1_2}
          />
        </group>
        <group
          position={[10.52, 2.84, 12.1]}
          rotation={[-0.3, -0.13, -0.75]}
          scale={0.36}
        >
          <mesh
            geometry={nodes.Cylinder006.geometry}
            material={materials.Branch1_1}
          />
          <mesh
            geometry={nodes.Cylinder006_1.geometry}
            material={materials.Branch1_2}
          />
        </group>
      </RigidBody>
    </group>
  );
}

useGLTF.preload("/models/mundo-lowpoly2.glb");
