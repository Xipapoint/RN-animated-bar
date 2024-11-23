import React, { memo, useMemo, useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { animationConfigUp, RIGHT_PART_WIDTH } from "../constants";
import ListIcon from "./ListIcon";
import RoundedIcon from "./RoundedIcon";
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const toggleAnimationConfig = {
  damping: 10,
  stiffness: 100,
  velocity: 6,
};

const getPlatformStyles = () =>
  Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.8,
      shadowRadius: 3,
    },
    android: {
      elevation: 15,
    },
  });

const InputBar: React.FC = (props) => {
  const [showIcon, setShowIcon] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const swing = useSharedValue(0);
  const { width } = useWindowDimensions();

  const animatedStyle = useAnimatedStyle(() => {
    const translateZ = interpolate(swing.value, [-1, 1], [-7, 7]);
    return {
      transform: [
        { translateX: -50 },
        { rotateZ: `${translateZ}deg` },
        withTiming(
          { rotateZ: `${-translateZ}deg` },
          { duration: 100, easing: Easing.inOut(Easing.sin) },
        ),
        { translateX: 50 },
      ],
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(swing.value, [1, -1], [-90, 45]);
    return {
      transform: [{ rotateZ: `${-rotate}deg` }],
    };
  });

  const combinedStyles = useMemo(() => {
    return [styles.container, animatedStyle, { width: width * 0.9 }];
  }, [animatedStyle, width]);

  const handleToggle = () => {
    swing.value = withSpring(
      swing.value === -1 ? 1 : -1,
      toggleAnimationConfig,
    );

    setShowIcon(swing.value === 1);
    setShowSearch(swing.value === -1);
  };

  return (
    <Animated.View {...props} style={combinedStyles}>
      <RoundedIcon
        onPress={handleToggle}
        style={[iconAnimatedStyle, styles.button]}
        icon="add"
      />
      {showIcon && <ListIcon />}
      {showSearch && (
        <AnimatedTextInput
          {...animationConfigUp}
          style={styles.input}
          placeholder="Message"
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    borderRadius: RIGHT_PART_WIDTH / 4,
    backgroundColor: "#7872fc",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    gap: 60,
    ...getPlatformStyles(),
  },
  input: {
    width: RIGHT_PART_WIDTH,
    height: 40,
    borderRadius: RIGHT_PART_WIDTH / 4,
    backgroundColor: "#A9A4FF",
    alignItems: "center",
    paddingLeft: 15,
    fontSize: 15,
  },

  button: {
    marginLeft: 20,
  },
});

export default memo(InputBar);
