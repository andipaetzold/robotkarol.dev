import { View3D } from "./components/View3D";
import { DEFAULT_WORLD } from "./constants";

export function App() {
  return <View3D world={DEFAULT_WORLD} />;
}
