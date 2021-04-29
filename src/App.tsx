import React, { useState } from "react";
import { View3D } from "./components/View3D";
import { DEFAULT_WORLD } from "./constants";
import { useKeyPress } from "./hooks/useKeyPress";
import {
  pickUpBrick,
  putBrick,
  reset,
  step,
  toggleMarker,
  turnLeft,
  turnRight,
} from "./services/actions";
import styles from "./App.module.scss";
import { Editor } from "./components/Editor";

export function App() {
  const [world, setWorld] = useState(DEFAULT_WORLD);
  const [code, setCode] = useState("");

  useKeyPress({
    ArrowUp: () => setWorld(step(world)),
    ArrowDown: () => setWorld(step(world, -1)),
    ArrowLeft: () => setWorld(turnLeft(world)),
    ArrowRight: () => setWorld(turnRight(world)),
    m: () => setWorld(toggleMarker(world)),
    p: () => setWorld(putBrick(world)),
    u: () => setWorld(pickUpBrick(world)),
    r: () => setWorld(reset(world)),
  });

  return (
    <div className={styles.Grid}>
      <div className={styles.Editor}>
        <Editor value={code} onChange={setCode} />
      </div>
      <div className={styles.World}>
        <View3D world={world} />
      </div>
    </div>
  );
}
