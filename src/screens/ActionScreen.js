import React from "react";
import { Box, VStack, Text, Pressable, HStack, Divider } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { VictoryBar } from "victory-native";

const ActionScreen = ({ onClose, site }) => {
  const { sna, sbi, sarea, mday, lat, lng, ar, bemp } = site;

  const getTime = (m) => {
    const mday = String(m);
    const year = mday.slice(0, 4);
    const month = Number(mday.slice(5, 7));
    const date = Number(mday.slice(8, 10));
    const hour = Number(mday.slice(11, 13));
    const min = Number(mday.slice(14, 16));
    const sec = Number(mday.slice(17, 20));
    const time = `${year}/${month}/${date} ${hour}:${min}:${sec}`;
    return time;
  };
  return (
    <VStack
      h="50%"
      w="100%"
      bg={"#292d3e"}
      borderRadius={20}
      borderBottomRadius={0}
    >
      <Pressable onPress={onClose} position="absolute" top={8} right={4}>
        <MaterialCommunityIcons name="close-circle" color="gray" size={30} />
      </Pressable>
      <Box
        position={"absolute"}
        borderBottomColor={"white"}
        w={"15%"}
        h={1}
        borderRadius={3}
        bg="grey"
        top={3}
        alignSelf="center"
      ></Box>
      <Text fontSize="lg" px={6} mt={10} my={3} color={"#FCFAF2"}>
        {sna.slice(11)}站
      </Text>
      <Box px={6}>
        <Divider mb={6} />
        <Text color={"#FCFAF2"}>
          <Text fontWeight={"bold"} color={"gray.400"}>
            地址：
          </Text>
          {sarea} {ar}
        </Text>
        {/* <Text mt={2} color={"#FCFAF2"}>
          <Text fontWeight={"bold"}>經度/緯度：</Text>
          {Number(lng).toFixed(2)}/{Number(lat).toFixed(2)}
        </Text> */}
        <Text mt={2} color={"#FCFAF2"}>
          <Text fontWeight={"bold"} color={"gray.400"}>
            最後更新時間：
          </Text>
          {getTime(mday)}
        </Text>
        <HStack justifyContent="flex-start">
          <VictoryBar
            horizontal
            padding={{ left: 10, right: 90, top: 0, bottom: 90 }}
            domainPadding={{ x: 90 }}
            width={280}
            height={250}
            data={[
              { x: 2, y: Number(sbi), label: `可租 ( ${sbi} )` },
              { x: 1, y: Number(bemp), label: `可還 ( ${bemp} )` },
            ]}
            style={{
              data: {
                stroke: "#FCFAF2",
                strokeWidth: 1,
                fill: ({ datum }) => (datum.x == 1 ? "#DEBE6D" : "#c3e88d"),
              },
              labels: {
                fontSize: 16,
                fill: "#FCFAF2",
                padding: 16,
              },
            }}
          />
        </HStack>
      </Box>
    </VStack>
  );
};

export default ActionScreen;
