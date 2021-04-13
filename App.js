import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import MealsNavigator from "./navigation/MealsNavigator";
import { createStore, combineReducers } from "redux";
import { enableScreens } from "react-native-screens";
import { LogBox } from "react-native";
import mealReducer from "./store/reducers/Meals";
import { Provider } from "react-redux";
// Ignore log notification by message
LogBox.ignoreAllLogs();

enableScreens();

const rootReducer = combineReducers({
  meals: mealReducer,
});

const store = createStore(rootReducer);

export default function App() {
  const [dataLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!dataLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}
