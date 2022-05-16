import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Box, Center } from "native-base";

import metroJson from "../json/metro.json";
import { getUbikeInfo } from "../api";
import mapStyle from "../mapStyle/mapStyle.json";

const MapScreen = () => {
  const [msg, setMsg] = useState("Waiting...");
  // 臺北市捷運站點資料(大安區)
  const [metro, setMetro] = useState(metroJson);
  // youbike資料(大安區)
  const [ubike, setUbike] = useState([]);
  // 是否已定位位置
  const [onCurrentLocation, setOnCurrentLocation] = useState(false);
  // 圖示比例
  const [zoomRatio, setZoomRatio] = useState(1);
  // 區域 初始為學校位置
  const [region, setRegion] = useState({
    longitude: 121.544637,
    latitude: 25.024624,
    longitudeDelta: 0.01,
    latitudeDelta: 0.02,
  });
  // marker 初始為學校位置
  const [marker, setMarker] = useState({
    coord: {
      longitude: 121.544637,
      latitude: 25.024624,
    },
    name: "我的位置",
  });
  // 拖曳地圖
  const onRegionChangeComplete = (rgn) => {
    if (
      Math.abs(rgn.latitude - region.latitude) > 0.0002 ||
      Math.abs(rgn.longitude - region.longitude) > 0.0002
    ) {
      // 非定位
      setOnCurrentLocation(false);
    }
    // 根據縮放設定圖示大小
    if (rgn.longitudeDelta > 0.02) setZoomRatio(0.02 / rgn.longitudeDelta);
    else setZoomRatio(1);
  };

  // 設定區域與 marker
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

  // 取得自己位置
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setMsg("Permission to access location was denied");
      return;
    }
    // 設定 區域 與 marker
    let loc = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 2000,
        timeInterval: 1000,
      },
      (loc) => setRegionAndMarker(loc)
    );
    // 已定位過
    setOnCurrentLocation(true);
  };

  // 取得 youbike 資料
  const getUbikeData = async () => {
    const ubikeData = await getUbikeInfo();
    setUbike(ubikeData);
  };

  // 初次執行
  // 取得 自己位置
  // 取得 youbike data
  useEffect(() => {
    getLocation();
    getUbikeData();
  }, []);

  return (
    <Box flex={1}>
      <MapView
        initialRegion={region}
        // region={region}
        style={{ flex: 1 }}
        provider={"google"}
        // showsTraffic
        customMapStyle={mapStyle}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        <Marker
          coordinate={{
            latitude: marker.coord.latitude,
            longitude: marker.coord.longitude,
          }}
          title={marker.name}
        >
          <MaterialCommunityIcons name={"target"} size={26} color={"#FCFAF2"} />
        </Marker>
        {zoomRatio > 0.14 &&
          metro.map((site) => (
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
                bg="#cad4bc"
                borderRadius={60}
                p={2 * zoomRatio}
                borderWidth={2}
                borderColor="black"
              >
                <MaterialCommunityIcons
                  name={"train"}
                  size={26 * zoomRatio}
                  color={"#252b16"}
                />
              </Center>
            </Marker>
          ))}
        {zoomRatio > 0.14 &&
          ubike.map((site) => (
            <Marker
              coordinate={{
                latitude: Number(site.lat),
                longitude: Number(site.lng),
              }}
              key={site.sno}
              title={`${site.sna} ${site.sbi}/${site.bemp}`}
              description={site.ar}
            >
              {/* <ActionButton zoomRatio={zoomRatio} site={site} /> */}
              <Center
                bg="#cad4bc"
                borderRadius={60}
                p={2 * zoomRatio}
                borderWidth={2}
                borderColor="black"
              >
                <MaterialCommunityIcons
                  name={"bike"}
                  size={26 * zoomRatio}
                  color={"#252b16"}
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
