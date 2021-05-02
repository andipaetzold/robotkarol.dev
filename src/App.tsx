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
  const [autoStep, setAutoStep] = useState(true);
  const [done, setDone] = useState(false);

  const nextStep = () => {
    if (!executor) {
      return;
    }

    try {
      const s = executor.next();
      if (s.done) {
        setDone(true);
      } else {
        setWorld(s.value);
      }
    } catch (e) {
      addMessage({ children: e.message });
    }
  };

  useInterval(() => {
    if (!autoStep) {
      return;
    }

    nextStep();
  }, 1_000);

  const handleStart = () => {
    if (executor) {
      setAutoStep(true);
      return;
    }

    try {
      const ast = parse(code);
      startWorld.current = world;
      setDone(false);
      setAutoStep(true);
      setExecutor(execute(ast, world));
    } catch (e) {
      addMessage({ children: "Error compiling program" });
    }
  };

  const handleStep = () => {
    let exec = executor;
    if (!exec) {
      try {
        const ast = parse(code);
        startWorld.current = world;
        setDone(false);
        setAutoStep(false);
        exec = execute(ast, world);
        setExecutor(exec);
      } catch (e) {
        addMessage({ children: "Error compiling program" });
      }
    }

    nextStep();
  };

  const handlePause = () => {
    setAutoStep(false);
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
            onStep={(!executor || !autoStep) && !done ? handleStep : undefined}
            onPause={executor && autoStep && !done ? handlePause : undefined}
            onStop={executor ? handleStop : undefined}
          />
        </div>
      </div>
    </>
  );
}
