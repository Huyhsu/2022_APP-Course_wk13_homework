import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Box, Center } from "native-base";

import metroJson from "../json/metro.json";
import mapStyle from "../mapStyle/mapStyle.json";

const MapScreen = () => {
  const [onCurrentLocation, setOnCurrentLocation] = useState(false);
  const [metro, setMetro] = useState(metroJson);
  const [msg, setMsg] = useState("Waiting...");
  const [region, setRegion] = useState({
    longitude: 121.544637,
    latitude: 25.024624,
    longitudeDelta: 0.01,
    latitudeDelta: 0.02,
  });
  const [marker, setMarker] = useState({
    coord: {
      longitude: 121.544637,
      latitude: 25.024624,
    },
    // name: "國立臺北教育大學",
    // address: "台北市和平東路二段134號",
  });

  const onRegionChangeComplete = (rgn) => {
    if (
      Math.abs(rgn.latitude - region.latitude) > 0.0002 ||
      Math.abs(rgn.longitude - region.longitude) > 0.0002
    ) {
      setRegion(rgn);
      setMarker({
        ...marker,
        coord: {
          longitude: rgn.longitude,
          latitude: rgn.latitude,
        },
      });
      setOnCurrentLocation(false);
    }
  };

  const setRegionAndMarker = (location) => {
    setRegion({
      ...region,
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });
    setMarker({
      ...marker,
      coord: {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      },
    });
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setMsg("Permission to access location was denied");
      return;
    }
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 2000,
        timeInterval: 1000,
      },
      (loc) => setRegionAndMarker(loc)
    );
    setOnCurrentLocation(true);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Box flex={1}>
      <MapView
        region={region}
        style={{ flex: 1 }}
        provider={"google"}
        // showsTraffic
        customMapStyle={mapStyle}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {/* <Marker
          coordinate={marker.coord}
          title={marker.name}
          description={marker.address}
        >
          <MaterialCommunityIcons name={"target"} size={26} color={"#FCFAF2"} />
          <MaterialCommunityIcons name={"bike"} size={26} color={"#FCFAF2"} />
          <MaterialCommunityIcons name={"train"} size={26} color={"#FCFAF2"} />
        </Marker> */}
        {metro.map((site) => (
          <Marker
            coordinate={{
              latitude: site.StationPosition.PositionLat,
              longitude: site.StationPosition.PositionLon,
            }}
            key={site.StationUID}
            title={site.StationName.Zh_tw}
            description={site.StationAddress}
          >
            <Center
              bg="white"
              borderRadius={60}
              p={2}
              borderWidth={2}
              borderColor="black"
            >
              <MaterialCommunityIcons
                name={"train"}
                size={26}
                color={"black"}
              />
            </Center>
          </Marker>
        ))}
      </MapView>
      {!onCurrentLocation && (
        <Box
          bg={"#cad4bc"}
          borderRadius={60}
          position={"absolute"}
          shadow={"2"}
          zIndex={99}
          right={5}
          bottom={5}
        >
          <MaterialCommunityIcons
            name={"target"}
            size={60}
            color={"#252b16"}
            onPress={getLocation}
          />
        </Box>
      )}
    </Box>
  );
};

export default MapScreen;
