import { Button } from "@react-md/button";
import {
  PauseFontIcon,
  PlayArrowFontIcon,
  SkipNextFontIcon,
  StopFontIcon,
} from "@react-md/material-icons";

interface Props {
  onStart?: () => void;
  onPause?: () => void;
  onStep?: () => void;
  onStop?: () => void;
}

export function Controls({ onStart, onPause, onStep, onStop }: Props) {
  return (
    <>
      <Button
        theme="clear"
        onClick={onStart}
        buttonType="icon"
        disabled={onStart === undefined}
      >
        <PlayArrowFontIcon />
      </Button>
      <Button
        theme="clear"
        onClick={onStep}
        buttonType="icon"
        disabled={onStep === undefined}
      >
        <SkipNextFontIcon />
      </Button>
      {/* <Button theme="clear" onClick={onStart} buttonType="icon">
        <FastForwardFontIcon />
      </Button> */}
      <Button
        theme="clear"
        onClick={onPause}
        buttonType="icon"
        disabled={onPause === undefined}
      >
        <PauseFontIcon />
      </Button>
      <Button
        theme="clear"
        onClick={onStop}
        buttonType="icon"
        disabled={onStop === undefined}
      >
        <StopFontIcon />
      </Button>
    </>
  );
}
