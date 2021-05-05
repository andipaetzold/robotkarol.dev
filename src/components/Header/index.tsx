import { AppBar, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import { SettingsSVGIcon } from "@react-md/material-icons";
import React, { useState } from "react";
import { World } from "../../types";
import { SettingsDialog } from "./SettingsDialog";

interface Props {
  onWorldChange: (world: World) => void;
  world: World;
}

export function Header({ onWorldChange, world }: Props) {
  const [settingsDialogVisible, setSettingsDialogVisible] = useState(false);

  return (
    <>
      <AppBar theme="default">
        <AppBarTitle>Robot Karel</AppBarTitle>

        <AppBarAction first onClick={() => setSettingsDialogVisible(true)}>
          <SettingsSVGIcon />
        </AppBarAction>
      </AppBar>
      <SettingsDialog
        visible={settingsDialogVisible}
        onClose={() => setSettingsDialogVisible(false)}
        world={world}
        onWorldChange={onWorldChange}
      />
    </>
  );
}
