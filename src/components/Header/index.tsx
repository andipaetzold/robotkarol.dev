import { AppBar, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import { FolderSVGIcon, SettingsSVGIcon } from "@react-md/material-icons";
import { useState } from "react";
import { ExamplesDialog } from "./ExamplesDialog";
import { SettingsDialog } from "./SettingsDialog";

export function Header() {
  const [settingsDialogVisible, setSettingsDialogVisible] = useState(false);
  const [examplesDialogVisible, setExamplesDialogVisible] = useState(false);

  return (
    <>
      <AppBar theme="default">
        <AppBarTitle>Robot Karol</AppBarTitle>

        <AppBarAction first onClick={() => setExamplesDialogVisible(true)}>
          <FolderSVGIcon />
        </AppBarAction>
        <AppBarAction onClick={() => setSettingsDialogVisible(true)}>
          <SettingsSVGIcon />
        </AppBarAction>
      </AppBar>
      <SettingsDialog
        visible={settingsDialogVisible}
        onClose={() => setSettingsDialogVisible(false)}
      />
      <ExamplesDialog
        visible={examplesDialogVisible}
        onClose={() => setExamplesDialogVisible(false)}
      />
    </>
  );
}
