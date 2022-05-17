import React from "react";
import { Center, Pressable, Actionsheet, useDisclose } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ActionScreen from "../screens/ActionScreen";

export default (props) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { zoomRatio, site } = props;

  return (
    <>
      <Pressable
        // onPress={onOpen}
        onPress={() => console.log("I am not working")}
      >
        <Center
          bg="#cad4bc"
          borderRadius={60}
          p={2 * zoomRatio}
          borderWidth={2}
          borderColor="#FFCA28"
        >
          <MaterialCommunityIcons
            name={"bike"}
            size={14 * zoomRatio}
            color={"#252b16"}
          />
        </Center>
      </Pressable>
      {/* <Actionsheet isOpen={isOpen} onClose={onClose}>
        <ActionScreen onClose={onClose} site={site} />
      </Actionsheet> */}
    </>
  );
};
