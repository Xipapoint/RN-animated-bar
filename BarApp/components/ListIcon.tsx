import * as ImagePicker from "expo-image-picker";
import { memo, useMemo } from "react";
import { Animated, StyleSheet } from "react-native";

import { animationConfigDown, RIGHT_PART_WIDTH } from "../constants";
import RoundedIcon from "./RoundedIcon";

const icons: React.ComponentProps<typeof RoundedIcon>["icon"][] = [
  "camera-outline",
  "videocam-outline",
  "images-outline",
];

const ListIcon: React.FC = (props) => {
  const openCamera = async () => {
    try {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (!granted) {
        alert("Access to camera is denied.");
      }
    } catch (error) {
      console.error("Error opening camera", error);
      alert("An error occurred while requesting access to the camera.");
    }
  };
  const Icons = useMemo(() => {
    return icons.map((icon) => (
      <RoundedIcon
        openCamera={openCamera}
        icon={icon}
        key={icon}
        {...animationConfigDown}
      />
    ));
  }, []);

  return (
    <Animated.View {...props} style={styles.list}>
      {Icons}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: RIGHT_PART_WIDTH,
  },
});

export default memo(ListIcon);
