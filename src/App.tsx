import { useAddMessage } from "@react-md/alert";
import { AppBar, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import { MoreVertSVGIcon } from "@react-md/material-icons";
import React, { useState } from "react";
import styles from "./App.module.scss";
import { Controls } from "./components/Controls";
import { Editor } from "./components/Editor";
import { View3D } from "./components/View3D";
import { DEFAULT_WORLD } from "./constants";
import { execute, parse } from "./services/runner";

export function App() {
  const addMessage = useAddMessage();
  const [world, setWorld] = useState(DEFAULT_WORLD);
  const [code, setCode] = useState("");

  const handleStart = () => {
    let ast;
    try {
      ast = parse(code);
    } catch (e) {
      addMessage({
        children: (
          <>
            Error compiling program
            <br />
            {e.message}
          </>
        ),
        twoLines: true
      });
      return;
    }

    try {
      const exec = execute(ast, world);
      let step;
      do {
        step = exec.next();
        if (step.value) {
          setWorld(step.value);
        }
      } while (!step.done);
    } catch (e) {
      addMessage({
        children: (
          <>
            Error running program
            <br />
            {e.message}
          </>
        ),
        twoLines: true
      });
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
          <Controls onStart={handleStart} />
        </div>
      </div>
    </>
  );
}
