import { AppRegistry } from "react-native";
import { name as appName } from "./app.json" assert { type: "json" };
import { App } from "./src/App";

AppRegistry.registerComponent(String(appName), () => App);
