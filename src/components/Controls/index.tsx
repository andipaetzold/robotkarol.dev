import { useAddMessage } from "@react-md/alert";
import { Button } from "@react-md/button";
import {
  PauseFontIcon,
  PlayArrowFontIcon,
  SkipNextFontIcon,
  StopFontIcon,
} from "@react-md/material-icons";
import { useDispatch } from "react-redux";
import { useInterval } from "../../hooks/useInterval";
import { useAppSelector } from "../../services/store";
import {
  controlsPause,
  controlsStartOrResume,
  controlsStep,
  controlsStop,
  executionStep,
  parseCode,
} from "../../services/store/root";

export function Controls() {
  const dispatch = useDispatch();
  const execution = useAppSelector((s) => s.execution);
  const addMessage = useAddMessage();

  const handleStartResume = () => {
    if (execution.state === "stopped") {
      dispatch(parseCode());
    }

    dispatch(controlsStartOrResume());
  };

  const handleStep = () => {
    if (execution.state === "stopped") {
      dispatch(parseCode());
    }

    try {
      dispatch(controlsStep());
    } catch (e) {
      addMessage({ children: e.message });
    }
  };

  const handlePause = () => {
    dispatch(controlsPause());
  };

  const handleStop = () => {
    dispatch(controlsStop());
  };

  useInterval(() => {
    if (execution.state !== "running") {
      return;
    }

    try {
      dispatch(executionStep());
    } catch (e) {
      addMessage({ children: e.message });
    }
  }, 1_000);

  return (
    <>
      <Button
        theme="clear"
        onClick={handleStartResume}
        buttonType="icon"
        disabled={
          !(execution.state === "paused" || execution.state === "stopped")
        }
      >
        <PlayArrowFontIcon />
      </Button>
      <Button
        theme="clear"
        onClick={handleStep}
        buttonType="icon"
        disabled={
          !(execution.state === "paused" || execution.state === "stopped")
        }
      >
        <SkipNextFontIcon />
      </Button>
      <Button
        theme="clear"
        onClick={handlePause}
        buttonType="icon"
        disabled={!(execution.state === "running")}
      >
        <PauseFontIcon />
      </Button>
      <Button
        theme="clear"
        onClick={handleStop}
        buttonType="icon"
        disabled={
          !(
            execution.state === "running" ||
            execution.state === "paused" ||
            execution.state === "done"
          )
        }
      >
        <StopFontIcon />
      </Button>
    </>
  );
}
