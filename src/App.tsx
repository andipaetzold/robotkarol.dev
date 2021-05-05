import React from "react";
import styles from "./App.module.scss";
import { Controls } from "./components/Controls";
import { Editor } from "./components/Editor";
import { Header } from "./components/Header";
import { View3D } from "./components/View3D";

export function App() {
  return (
    <>
      <div className={styles.Grid}>
        <div className={styles.AppHeader}>
          <Header />
        </div>
        <div className={styles.Editor}>
          <Editor />
        </div>
        <div className={styles.World}>
          <View3D />
        </div>

        <div className={styles.Controls}>
          <Controls />
        </div>
      </div>
    </>
  );
}
