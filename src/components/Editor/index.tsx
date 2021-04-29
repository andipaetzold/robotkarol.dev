import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ value, onChange }: Props) {
  return (
    <AceEditor
      theme="github"
      mode="text"
      onChange={onChange}
      value={value}
      editorProps={{ $blockScrolling: true }}
      height="100%"
      width="100%"
    />
  );
}
