import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import { TextField, useNumberField } from "@react-md/form";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { resize, updateJumpHeight } from "../../services/store/root";
import styles from "./SettingsDialog.module.scss";

interface Props {
  visible: boolean;
  onClose: () => void;
}
export function SettingsDialog({ visible, onClose }: Props) {
  const world = useAppSelector((s) => s.world);
  const settings = useAppSelector((s) => s.settings);

  const dispatch = useAppDispatch();
  const [width, widthProps, { reset: resetWidth }] = useNumberField({
    id: "settings-dialog-width",
    defaultValue: world.width,
    min: 1,
  });
  const [depth, depthProps, { reset: resetDepth }] = useNumberField({
    id: "settings-dialog-depth",
    defaultValue: world.depth,
    min: 1,
  });
  const [height, heightProps, { reset: resetHeight }] = useNumberField({
    id: "settings-dialog-height",
    defaultValue: world.height,
    min: 1,
    max: 10,
  });

  const [jumpHeight, jumpHeightProps, { reset: resetJumpHeight }] =
    useNumberField({
      id: "settings-dialog-jump-height",
      defaultValue: settings.jumpHeight,
      min: 0,
      max: 10,
      required: false,
    });

  const handleSave = () => {
    dispatch(
      resize({
        width,
        depth,
        height,
      })
    );
    dispatch(updateJumpHeight(jumpHeight));

    onClose();
  };

  const handleClose = () => {
    resetWidth();
    resetDepth();
    resetHeight();
    resetJumpHeight();
    onClose();
  };

  return (
    <Dialog
      id="settings-dialog"
      visible={visible}
      onRequestClose={onClose}
      aria-labelledby="settings-dialog-title"
    >
      <DialogHeader>
        <DialogTitle id="settings-dialog-title">Settings</DialogTitle>
      </DialogHeader>
      <DialogContent className={styles.Container}>
        <TextField label="Width" name="width" required {...widthProps} />
        <TextField label="Depth" name="depth" required {...depthProps} />
        <TextField label="Height" name="height" required {...heightProps} />
        <TextField label="Jump Height" name="jumpHeight" {...jumpHeightProps} />
      </DialogContent>
      <DialogFooter>
        <Button id="settings-dialog-save" onClick={handleSave} theme="primary">
          Save
        </Button>
        <Button id="settings-dialog-close" onClick={handleClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
