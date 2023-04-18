import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Hi(props) {
  const { nodes, materials }: any = useGLTF("/models/hi.glb");
  return (
    // <RigidBody>
    <group
      {...props}
      dispose={null}
      position={[6.5, 3.5, 2]}
      rotation={[0, -Math.PI / 2, 0]}
      scale={0.2}
    >
      <mesh
        geometry={nodes.Torus001.geometry}
        material={nodes.Torus001.material}
        position={[0, 1.93, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={1.41}
      />
      <mesh
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        position={[0, 5.55, 2.46]}
        scale={0.45}
      />
      <mesh
        geometry={nodes.Cylinder002.geometry}
        material={nodes.Cylinder002.material}
        position={[0, 5.55, -0.04]}
        scale={0.45}
      />
      <mesh
        geometry={nodes.Cylinder001.geometry}
        material={nodes.Cylinder001.material}
        position={[0, 5.55, -2.1]}
        scale={0.45}
      />
      <mesh
        geometry={nodes.Cylinder003.geometry}
        material={nodes.Cylinder003.material}
        position={[0, 5.34, 1.23]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.43}
      />
    </group>
    // </RigidBody>
  );
}

useGLTF.preload("/models/hi.glb");
