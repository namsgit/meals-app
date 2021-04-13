import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform } from "react-native";
import CategoriesScreen from "../screens/CategoriesScreen";
import MealCategoryScreen from "../screens/MealCategoryScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FilterScreen from "../screens/FilterScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const stackNavOption = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: MealCategoryScreen,
    MealDetail: MealDetailsScreen,
  },
  {
    defaultNavigationOptions: stackNavOption,
  }
);

const FavoritesStackNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailsScreen,
  },
  {
    defaultNavigationOptions: stackNavOption,
  }
);

const BottomTabsNavigator = createBottomTabNavigator(
  {
    Categories: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name={"ios-restaurant"}
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Favorites: {
      screen: FavoritesStackNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.primaryColor,
      labelStyle: {
        fontFamily: "open-sans",
      },
    },
  }
);

const FilterStackNavigator = createStackNavigator(
  {
    Filter: FilterScreen,
  },
  {
    defaultNavigationOptions: stackNavOption,
  }
);

const mainNavigator = createDrawerNavigator(
  {
    Favs: {
      screen: BottomTabsNavigator,
      navigationOptions: {
        drawerLabel: "Meals",
      },
    },
    Filters: FilterStackNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primaryColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    },
  }
);

export default createAppContainer(mainNavigator);
