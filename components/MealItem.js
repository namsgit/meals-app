import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import DefaultText from "./DefaultText";
import Colors from "../constants/Colors";

const MealItem = (props) => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View style={styles.header}>
          <ImageBackground
            source={{ uri: props.imageUrl }}
            style={styles.imgStyle}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {props.title}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.details}>
          <DefaultText>{props.duration}m</DefaultText>
          <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
          <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    backgroundColor: Colors.accentColor,
    width: "100%",
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    height: "90%",
  },
  details: {
    flexDirection: "row",
    height: "10%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  imgStyle: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "20%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});

export default MealItem;
