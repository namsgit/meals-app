import React, { useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import DefaultText from "../components/DefaultText";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/Meals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.item}</DefaultText>
    </View>
  );
};

const MealDetailsScreen = (props) => {
  const mealId = props.navigation.getParam("mealId");
  const Meals = useSelector((state) => state.meals.meals);
  const isFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );
  const meal = Meals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: isFavorite });
  }, [isFavorite]);

  return (
    <ScrollView style={styles.screen}>
      <Image style={styles.image} source={{ uri: meal.imageUrl }} />
      <View style={styles.details}>
        <DefaultText>{meal.duration}m</DefaultText>
        <DefaultText>{meal.affordability.toUpperCase()}</DefaultText>
        <DefaultText>{meal.complexity.toUpperCase()}</DefaultText>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.text}>Ingredients</Text>
        {meal.ingredients.map((ingredient) => {
          return <ListItem key={ingredient} item={ingredient} />;
        })}
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.text}>Steps</Text>
        {meal.steps.map((step) => {
          return <ListItem key={step} item={step} />;
        })}
      </View>
    </ScrollView>
  );
};

MealDetailsScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFav = navigationData.navigation.getParam("toggleFav");
  const isFav = navigationData.navigation.getParam("isFav");
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFav ? "ios-star" : "ios-star-outline"}
          onPress={toggleFav}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  image: {
    height: 200,
    width: "100%",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: Colors.accentColor,
  },
  text: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listContainer: {
    marginVertical: 10,
  },
  listItem: {
    fontFamily: "open-sans",
    margin: 10,
    borderWidth: 0.5,
    borderColor: "black",
    padding: 10,
  },
});
export default MealDetailsScreen;
