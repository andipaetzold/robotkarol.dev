import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";
import styles from "./index.module.scss";

interface Props {
  value: string;
  onChange: (value: string) => void;
  activeRow?: number;
}

export function Editor({ value, onChange, activeRow }: Props) {
  return (
    <AceEditor
      theme="github"
      mode="text"
      onChange={onChange}
      value={value}
      editorProps={{ $blockScrolling: true }}
      height="100%"
      width="100%"
      markers={
        activeRow !== undefined
          ? [
              {
                type: "fullLine",
                className: styles.activeRow,
                startRow: activeRow,
                endRow: activeRow,
                startCol: 0,
                endCol: Infinity,
              },
            ]
          : []
      }
    />
  );
}
