import { Overlay } from "@react-md/overlay";
import { Text } from "@react-md/typography";
import noop from "lodash/noop";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import styles from "./App.module.scss";
import { Controls } from "./components/Controls";
import { Editor } from "./components/Editor";
import { Header } from "./components/Header";
import { View3D } from "./components/View3D";
import { readFile } from "./services/file-reader";
import { readWorldFile } from "./services/reader";
import { setWorld, updateCode } from "./services/store/root";

export function App() {
  const dispatch = useDispatch();
  const onDrop = useCallback(
    async (files) => {
      for (const file of files) {
        if (file.name.endsWith(".kdw")) {
          const world = await readWorldFile(file);
          dispatch(setWorld(world));
        } else {
          const code = await readFile(file);
          dispatch(updateCode(code));
        }
      }
    },
    [dispatch]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ["text/*", ".kdp", ".kdw"],
    multiple: true,
    noClick: true,
  });

  return (
    <div {...getRootProps()} className={styles.Dropzone}>
      <input {...getInputProps()} />
      <Overlay
        visible={isDragActive}
        onRequestClose={noop}
        className={styles.DropzoneOverlay}
      >
        <Text type="headline-3">Drop file to load code or world</Text>
      </Overlay>
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
    </div>
  );
}
