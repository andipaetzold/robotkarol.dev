import { useAddMessage } from "@react-md/alert";
import { AppBar, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import { MoreVertSVGIcon } from "@react-md/material-icons";
import React, { useRef, useState } from "react";
import styles from "./App.module.scss";
import { Controls } from "./components/Controls";
import { Editor } from "./components/Editor";
import { View3D } from "./components/View3D";
import { DEFAULT_WORLD } from "./constants";
import { useInterval } from "./hooks/useInterval";
import { execute, parse } from "./services/runner";
import { World } from "./types";

export function App() {
  const addMessage = useAddMessage();
  const [world, setWorld] = useState(DEFAULT_WORLD);
  const [code, setCode] = useState("");

  const startWorld = useRef<World | null>(null);
  const [executor, setExecutor] = useState<ReturnType<typeof execute> | null>(
    null
  );

  useInterval(() => {
    if (!executor) {
      return;
    }

    try {
      const s = executor.next();
      if (s.value) {
        setWorld(s.value);
      }
    } catch (e) {
      addMessage({ children: e.message });
    }
  }, 1_000);

  const handleStart = () => {
    if (executor) {
      return;
    }

    try {
      const ast = parse(code);
      startWorld.current = world;
      setExecutor(execute(ast, world));
    } catch (e) {
      addMessage({ children: "Error compiling program" });
    }
  };

  const handleStop = () => {
    setExecutor(null);
    if (startWorld.current) {
      setWorld(startWorld.current!);
    }
  };

  return (
    <>
      <div className={styles.Grid}>
        <AppBar theme="default" className={styles.AppHeader}>
          <AppBarTitle>Robot Karel</AppBarTitle>

          <AppBarAction first>
            <MoreVertSVGIcon />
          </AppBarAction>
        </AppBar>
        <div className={styles.Editor}>
          <Editor value={code} onChange={setCode} />
        </div>
        <div className={styles.World}>
          <View3D world={world} />
        </div>

        <div className={styles.Controls}>
          <Controls
            onStart={executor ? undefined : handleStart}
            // onStep={console.log}
            // onPause={console.log}
            onStop={executor ? handleStop : undefined}
          />
        </div>
      </div>
    </>
  );
}
