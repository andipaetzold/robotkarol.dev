import { AppBar, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import { SettingsSVGIcon } from "@react-md/material-icons";
import React, { useState } from "react";
import { SettingsDialog } from "./SettingsDialog";

export function Header() {
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
      />
    </>
  );
}
