import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Box } from "native-base";

import mapStyle from "../mapStyle/mapStyle.json";

const MapScreen = () => {
  let region = {
    longitude: 121.544637,
    latitude: 25.024624,
    longitudeDelta: 0.01,
    latitudeDelta: 0.02,
  };
  return (
    <Box flex={1}>
      <MapView region={region} style={{ flex: 1 }} customMapStyle={mapStyle} />
    </Box>
  );
};

export default MapScreen;
