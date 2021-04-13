import React from "react";
import { Categories } from "../data/Categories-data";
import MealList from "../components/MealList";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import DefaultText from "../components/DefaultText";

const MealCategoryScreen = (props) => {
  const categoryId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );

  if (!displayMeals || displayMeals.length === 0) {
    return (
      <View style={styles.favorite}>
        <DefaultText>No Meal found. Maybe Check your filters</DefaultText>
      </View>
    );
  }

  return <MealList meals={displayMeals} navigation={props.navigation} />;
};

MealCategoryScreen.navigationOptions = (navigationData) => {
  const categoryId = navigationData.navigation.getParam("categoryId");
  const category = Categories.find((cat) => cat.id == categoryId);
  return {
    headerTitle: category.title,
  };
};

const styles = StyleSheet.create({
  favorite: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default MealCategoryScreen;
