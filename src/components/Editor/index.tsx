import { useMemo } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../services/store";
import { updateCode } from "../../services/store/root";
import styles from "./index.module.scss";
import Mode from "./Mode";
import { ErrorBoundary } from "@sentry/react";

export function Editor() {
  const activeRow = useAppSelector((s) => s.execution.activeLine);
  const code = useAppSelector((s) => s.code);
  const error = useAppSelector((s) => s.error);
  const dispatch = useDispatch();

  const mode = useMemo(() => new Mode(), []);

  return (
    <ErrorBoundary>
      <AceEditor
        theme="github"
        mode={mode}
        onChange={(v) => dispatch(updateCode(v))}
        value={code}
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
        annotations={
          error?.data?.line !== undefined
            ? [
                {
                  text: error.message,
                  type: "error",
                  column: 0,
                  row: error.data.line,
                },
              ]
            : []
        }
      />
    </ErrorBoundary>
  );
}
