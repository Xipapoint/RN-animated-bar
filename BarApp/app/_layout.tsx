import { StyleSheet, View } from "react-native";

import InputBar from "@/components/InputBar";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <InputBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
