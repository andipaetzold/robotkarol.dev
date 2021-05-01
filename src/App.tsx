import React, { useState } from "react";
import styles from "./App.module.scss";
import { Editor } from "./components/Editor";
import { View3D } from "./components/View3D";
import { DEFAULT_WORLD } from "./constants";

export function App() {
  const [world] = useState(DEFAULT_WORLD);
  const [code, setCode] = useState("");

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
