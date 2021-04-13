import React from "react";
import MealList from "../components/MealList";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { View, StyleSheet } from "react-native";
import DefaultText from "../components/DefaultText";

const FavoritesScreen = (props) => {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);
  if (!favoriteMeals || favoriteMeals.length === 0) {
    return (
      <View style={styles.favorite}>
        <DefaultText>No favorites found.</DefaultText>
      </View>
    );
  }
  return <MealList navigation={props.navigation} meals={favoriteMeals} />;
};

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Favorites!",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  favorite: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
export default FavoritesScreen;
