import { useFrame } from "@react-three/fiber";
import { vec3 } from "@react-three/rapier";
import nipple, { JoystickManagerOptions } from "nipplejs";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";

export default function useJoystick({
  rigidBallRef,
  rigidBotRef,
  actions,
}: any) {
  let action = "idle";
  let fwdValue = 0;
  let bkdValue = 0;
  let rgtValue = 0;
  let lftValue = 0;

  const options: JoystickManagerOptions = {
    zone: document.getElementById("joystickWrapper1"),
    size: 120,
    multitouch: true,
    maxNumberOfNipples: 2,
    mode: "static",
    restJoystick: true,
    shape: "circle",
    restOpacity: 1,
    color: "red",
    position: { top: "60px", left: "60px" },
    dynamicPage: true,
  };

  const joyManager = nipple.create(options);

  joyManager["0"].on("move", function (evt, data) {
    const forward = data.vector.y;
    const turn = data.vector.x;
    console.log(data);

    if (forward > 0) {
      fwdValue = Math.abs(forward);
      bkdValue = 0;
    } else if (forward < 0) {
      fwdValue = 0;
      bkdValue = Math.abs(forward);
    }

    if (forward > 0) {
      action = "run_front";
      if (Math.abs(forward) < Math.abs(turn)) {
        if (turn >= 0) {
          action = "run_right";
        } else {
          action = "run_left";
        }
      }
    } else {
      action = "run_back";
      if (Math.abs(forward) < Math.abs(turn)) {
        if (turn > 0) {
          action = "run_right";
        } else {
          action = "run_left";
        }
      }
    }

    if (turn > 0) {
      lftValue = 0;
      rgtValue = Math.abs(turn);
    } else if (turn < 0) {
      lftValue = Math.abs(turn);
      rgtValue = 0;
    }
  });

  joyManager["0"].on("end", function (evt) {
    fwdValue = 0;
    lftValue = 0;
    rgtValue = 0;
    bkdValue = 0;
    action = "idle";
  });

  function move() {
    if (rigidBallRef.current && rigidBotRef.current) {
      const position = vec3(rigidBallRef.current.translation());
      rigidBallRef.current.lockRotations(true);
      rigidBallRef.current.setTranslation(
        new Vector3(
          position.x +
            (rgtValue - rgtValue / 1.1) -
            (lftValue - lftValue / 1.1),
          position.y,
          position.z - (fwdValue - fwdValue / 1.1) + (bkdValue - bkdValue / 1.1)
        ),
        true
      );
      rigidBotRef.current.setTranslation(
        new Vector3(
          position.x +
            (rgtValue - rgtValue / 1.1) -
            (lftValue - lftValue / 1.1),
          position.y - 0.07,
          position.z - (fwdValue - fwdValue / 1.1) + (bkdValue - bkdValue / 1.1)
        ),
        true
      );
    }
  }

  useFrame(() => {
    move();
    Object.keys(actions).map((act) => {
      if (act === action) {
        actions[action].play();
      } else {
        actions[act].stop();
      }
    });
  });

  return {
    fwdValue,
    bkdValue,
    rgtValue,
    lftValue,
  };
}
