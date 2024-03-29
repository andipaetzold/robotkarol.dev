import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import { List, ListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { DEFAULT_WORLD } from "../../constants";
import { EXAMPLES, getExample } from "../../services/examples";
import { readWorld } from "../../services/reader";
import { useAppDispatch } from "../../services/store";
import {
  setWorld,
  updateCode,
  updateJumpHeight,
  updateStorage,
  controlsStop,
} from "../../services/store/root";

interface Props {
  visible: boolean;
  onClose: () => void;
}
export function ExamplesDialog({ visible, onClose }: Props) {
  const dispatch = useAppDispatch();

  const handleClick = async (name: string) => {
    const { code, world: worldRaw, example } = await getExample(name);

    dispatch(controlsStop());
    if (code) {
      dispatch(updateCode(code));
    }

    if (worldRaw) {
      const world = readWorld(worldRaw);
      dispatch(setWorld(world));
    }

    if (example.settings) {
      dispatch(updateJumpHeight(example.settings.jumpHeight));
      dispatch(updateStorage(example.settings.storage));
    }

    onClose();
  };

  return (
    <Dialog
      id="examples-dialog"
      visible={visible}
      onRequestClose={onClose}
      aria-labelledby="examples-dialog-title"
    >
      <DialogHeader>
        <DialogTitle id="examples-dialog-title">Examples</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <Typography type="body-1" margin="none">
          Examples were created by Ulli Freiberger and are part of the official{" "}
          <a
            href="https://www.mebis.bayern.de/infoportal/empfehlung/robot-karol/"
            rel="noreferrer noopener"
          >
            Robot Karol Application
          </a>
          .
        </Typography>

        <List>
          {EXAMPLES.map((example) => (
            <ListItem
              key={example.name}
              onClick={() => handleClick(example.name)}
              primaryText={example.name}
              secondaryText={`Author: ${example.author}`}
            />
          ))}
        </List>
      </DialogContent>
      <DialogFooter>
        <Button id="settings-dialog-close" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
