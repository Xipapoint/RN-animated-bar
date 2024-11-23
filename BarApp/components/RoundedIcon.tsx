import Ionicons from "@expo/vector-icons/Ionicons";
import React, { memo, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import Animated, {
  AnimatedProps,
  AnimatedStyle,
} from "react-native-reanimated";

import { TOUCHABLE_OPACITY } from "@/constants";

type IconProps = React.ComponentProps<typeof Ionicons>;

type Icon = IconProps["name"];

interface Props {
  icon: Icon;
  size?: number;
  color?: "black" | "white";
  entering?: AnimatedProps<typeof Ionicons>["entering"];
  exiting?: AnimatedProps<typeof Ionicons>["exiting"];
  style?: StyleProp<AnimatedStyle<TextStyle>>;
  onPress?: () => void;
  openCamera?: () => Promise<void>;
}

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const RoundedIcon: React.FC<Props> = ({
  icon,
  size = 24,
  color,
  entering,
  exiting,
  style,
  onPress,
  openCamera,
}) => {
  const combinedStyles = useMemo(() => {
    return [styles.icon, style];
  }, [style]);
  return (
    <TouchableOpacity activeOpacity={TOUCHABLE_OPACITY} onPressIn={openCamera}>
      <AnimatedIcon
        size={size}
        color={color}
        name={icon}
        style={combinedStyles}
        exiting={exiting}
        entering={entering}
        onPress={onPress}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#A9A4FF",
    padding: 15,
    borderRadius: 40,
  },
});

export default memo(RoundedIcon);
