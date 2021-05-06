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
  executionStep,
  stop,
  parseCode,
  updateAutoStep,
  updateState,
} from "../../services/store/root";

export function Controls() {
  const dispatch = useDispatch();
  const execution = useAppSelector((s) => s.execution);
  const addMessage = useAddMessage();

  const nextStep = () => {
    try {
      dispatch(executionStep());
    } catch (e) {
      addMessage({ children: e.message });
    }
  };

  const handleStartResume = () => {
    if (execution.state !== "running") {
      dispatch(parseCode());
    }

    dispatch(updateAutoStep(true));
    dispatch(updateState("running"));
    nextStep();
  };

  const handleStep = () => {
    if (execution.state !== "running") {
      dispatch(parseCode());
    }

    dispatch(updateAutoStep(false));
    dispatch(updateState("running"));
    nextStep();
  };

  const handlePause = () => {
    dispatch(updateAutoStep(false));
  };

  const handleStop = () => {
    dispatch(stop());
  };

  useInterval(() => {
    if (
      !execution.autoStep ||
      execution.state === "done" ||
      execution.state === "stopped"
    ) {
      return;
    }

    dispatch(executionStep());
  }, 1_000);

  return (
    <>
      <Button
        theme="clear"
        onClick={handleStartResume}
        buttonType="icon"
        disabled={
          !(
            execution.state === "stopped" ||
            (execution.state === "running" && !execution.autoStep)
          )
        }
      >
        <PlayArrowFontIcon />
      </Button>
      <Button
        theme="clear"
        onClick={handleStep}
        buttonType="icon"
        disabled={
          !(
            (execution.state === "running" && !execution.autoStep) ||
            execution.state === "stopped"
          )
        }
      >
        <SkipNextFontIcon />
      </Button>
      <Button
        theme="clear"
        onClick={handlePause}
        buttonType="icon"
        disabled={!(execution.state === "running" && execution.autoStep)}
      >
        <PauseFontIcon />
      </Button>
      <Button
        theme="clear"
        onClick={handleStop}
        buttonType="icon"
        disabled={
          !(execution.state === "running" || execution.state === "done")
        }
      >
        <StopFontIcon />
      </Button>
    </>
  );
}
