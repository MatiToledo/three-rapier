import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Group, Quaternion, Vector3 } from "three";
import useJoystick from "../hooks/useJoystick";

export function Bot({ thirdPerson }: any) {
  const group = useRef();
  const rigidBallRef = useRef<RapierRigidBody>(null);
  const rigidBotRef = useRef<RapierRigidBody>(null);
  const { nodes, materials, animations }: any = useGLTF(
    "/models/Mannequin.glb"
  );
  const botRef = useRef<Group>();
  const { actions } = useAnimations(animations, group);
  console.log("actionsBot::: ", actions["idle"]);
  const vec = new Vector3();
  const target = new Vector3(0, 0, 0);
  useJoystick({ rigidBallRef, rigidBotRef, actions });

  useFrame((state) => {
    if (!thirdPerson || !botRef.current) {
      // target.lerp(botRef.current.getWorldPosition(vec), 0.02);
      // state.camera.lookAt(target);
      return;
    }
    let position = new Vector3(0, 0, 0);
    position.setFromMatrixPosition(botRef.current.matrixWorld);

    let quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(botRef.current.matrixWorld);

    let wDir = new Vector3(0, 0, 1);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();

    let cameraPosition = position
      .clone()
      .add(wDir.clone().multiplyScalar(3).add(new Vector3(0, 7, 10)));

    wDir.add(new Vector3(0, 0.2, 0));
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  });

  return (
    <group ref={group} dispose={null}>
      <RigidBody
        position={[0, 2, 0]}
        ref={rigidBallRef}
        colliders="ball"
        args={[0.5]}
      >
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 1]}></cylinderGeometry>
          <meshPhongMaterial transparent={true} opacity={0}></meshPhongMaterial>
        </mesh>
      </RigidBody>
      <RigidBody ref={rigidBotRef} colliders={false}>
        <group
          name="Armature"
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={0.015}
          ref={botRef}
        >
          <primitive object={nodes.mixamorig1Hips} />
          <skinnedMesh
            name="Ch36"
            geometry={nodes.Ch36.geometry}
            material={materials.Ch36_Body}
            skeleton={nodes.Ch36.skeleton}
          />
        </group>
      </RigidBody>
    </group>
  );
}

useGLTF.preload("/models/Mannequin.glb");
