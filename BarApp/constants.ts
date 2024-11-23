import {
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
} from "react-native-reanimated";

export const RIGHT_PART_WIDTH = 200;
export const animationConfigDown = {
  entering: SlideInDown.duration(300),
  exiting: SlideOutDown.duration(300),
};
export const animationConfigUp = {
  entering: SlideInUp.duration(300),
  exiting: SlideOutUp.duration(300),
};
export const TOUCHABLE_OPACITY = 0.65;
