import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
} from "react-native";

const CategoryGrid = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridStyle}>
      <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
        <View style={[styles.container, { backgroundColor: props.color }]}>
          <Text style={styles.titleText} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridStyle: {
    flex: 1,
    margin: 15,
    height: 120,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 8,
  },
  container: {
    flex: 1,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,

    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  titleText: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    textAlign: "right",
  },
});

export default CategoryGrid;
