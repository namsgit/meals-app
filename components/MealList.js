import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import MealItem from "./MealItem";
import { useSelector } from "react-redux";

const MealList = (props) => {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);
  const displayMeal = (itemData) => {
    const isFavorite = favoriteMeals.some(
      (meal) => meal.id === itemData.item.id
    );
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        affordability={itemData.item.affordability}
        complexity={itemData.item.complexity}
        imageUrl={itemData.item.imageUrl}
        onSelectMeal={() =>
          props.navigation.navigate("MealDetail", {
            mealId: itemData.item.id,
            mealTitle: itemData.item.title,
            isFav: isFavorite,
          })
        }
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.meals}
        keyExtractor={(item, index) => item.id}
        renderItem={displayMeal}
        style={{ width: "90%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealList;
