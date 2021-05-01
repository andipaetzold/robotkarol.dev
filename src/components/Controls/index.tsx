import { Button } from "@react-md/button";

interface Props {
  onStart: () => void;
}

export function Controls({ onStart }: Props) {
  return (
    <Button theme="primary" onClick={onStart}>
      Start
    </Button>
  );
}
