import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export default function useActions({ actions }: any) {
  const [action, setAction] = useState("idle");

  const previousAction = usePrevious(action);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }
  useEffect(() => {
    if (previousAction) {
      actions[previousAction].fadeOut(0.2);
      actions[action].stop();
    }

    actions[action].play();
    actions[action].fadeIn(0.2);
  }, [actions, action, previousAction]);
}

useGLTF.preload("/models/npc.glb");
