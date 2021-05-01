import { AppBar, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import { MoreVertSVGIcon } from "@react-md/material-icons";
import React, { useState } from "react";
import styles from "./App.module.scss";
import { Controls } from "./components/Controls";
import { Editor } from "./components/Editor";
import { View3D } from "./components/View3D";
import { DEFAULT_WORLD } from "./constants";

export function App() {
  const [world] = useState(DEFAULT_WORLD);
  const [code, setCode] = useState("");

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
          <Controls />
        </div>
      </div>
    </>
  );
}
