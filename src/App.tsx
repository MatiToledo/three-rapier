import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Sky } from "@react-three/drei";
import { Debug, Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useEffect, useState } from "react";
import { Mundo } from "./components/Mundo";
import { Bot } from "./components/Bot";
import { NPC } from "./components/Npc";
import Hi from "./components/Hi";

function App() {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition]: any = useState([10, 20, 35]);
  useEffect(() => {
    function keydownHandler(e) {
      if (e.key === "k") {
        if (thirdPerson) setCameraPosition([10, 20, 36]);
        setThirdPerson(!thirdPerson);
      }
    }

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [thirdPerson]);
  return (
    <Canvas shadows>
      <Suspense fallback={null}>
        <ambientLight></ambientLight>
        <directionalLight
          position={[-50, 100, 50]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
        {!thirdPerson && (
          <OrbitControls
            target={[0, 0, 0]}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minPolarAngle={Math.PI / 4}
          />
        )}
        <Sky></Sky>
        <Physics>
          <Mundo></Mundo>
          <Bot thirdPerson={thirdPerson}></Bot>
          <NPC></NPC>
          <Debug></Debug>
        </Physics>
      </Suspense>
    </Canvas>
  );
}

export default App;
