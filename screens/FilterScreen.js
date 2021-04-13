import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import CustomHeaderButton from "../components/CustomHeaderButton";
import Colors from "../constants/Colors";
import { applyFilters } from "../store/actions/Meals";

const SwitchContainer = (props) => {
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchText}>{props.switchTitle}</Text>
      <Switch
        value={props.value}
        onValueChange={props.onValueChange}
        trackColor={{ true: Colors.accentColor, false: Colors.accentColor }}
        thumbColor={Colors.accentColor}
      />
    </View>
  );
};
const FilterScreen = (props) => {
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
      lactosFree: isLactoseFree,
    };
    dispatch(applyFilters(appliedFilters));
  }, [isGlutenFree, isVegetarian, isVegan, isLactoseFree, dispatch]);

  useEffect(() => {
    navigation.setParams({
      save: saveFilters,
    });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Apply your filters</Text>
      <SwitchContainer
        switchTitle="GlutenFree"
        value={isGlutenFree}
        onValueChange={(newValue) => setIsGlutenFree(newValue)}
      />
      <SwitchContainer
        switchTitle="Vegan"
        value={isVegan}
        onValueChange={(newValue) => setIsVegan(newValue)}
      />
      <SwitchContainer
        switchTitle="Vegeterian"
        value={isVegetarian}
        onValueChange={(newValue) => setIsVegetarian(newValue)}
      />
      <SwitchContainer
        switchTitle="Lactose Free"
        value={isLactoseFree}
        onValueChange={(newValue) => setIsLactoseFree(newValue)}
      />
    </View>
  );
};

FilterScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filters",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Save" onPress={navData.navigation.getParam("save")} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  switchText: {
    fontFamily: "open-sans",
    fontSize: 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    marginHorizontal: 30,
  },
});
export default FilterScreen;
