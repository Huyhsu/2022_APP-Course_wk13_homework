import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";

import MapScreen from "./src/screens/MapScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        {/* <SafeAreaView> */}
        <MapScreen />
        {/* </SafeAreaView> */}
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
