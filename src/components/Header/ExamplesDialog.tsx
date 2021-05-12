import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import { List, ListItem } from "@react-md/list";
import { Text } from "@react-md/typography";
import React from "react";
import { EXAMPLES, getExample } from "../../services/examples";
import { readWorld } from "../../services/reader";
import { useAppDispatch } from "../../services/store";
import { setWorld, updateCode } from "../../services/store/root";

interface Props {
  visible: boolean;
  onClose: () => void;
}
export function ExamplesDialog({ visible, onClose }: Props) {
  const dispatch = useAppDispatch();

  const handleClick = async (name: string) => {
    const { code, world: worldRaw } = await getExample(name);

    const world = readWorld(worldRaw);

    dispatch(updateCode(code));
    dispatch(setWorld(world));

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
        <Text type="body-1" margin="none">
          Examples were created by Ulli Freiberger and are part of the official{" "}
          <a
            href="https://www.mebis.bayern.de/infoportal/empfehlung/robot-karol/"
            rel="noreferrer noopener"
          >
            Robot Karol Application
          </a>
          .
        </Text>

        <List>
          {EXAMPLES.map((example) => (
            <ListItem
              key={example.name}
              onClick={() => handleClick(example.name)}
            >
              {example.name}
            </ListItem>
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
