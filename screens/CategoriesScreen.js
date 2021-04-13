import React from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Categories } from "../data/Categories-data";
import CategoryGrid from "../components/CartegoryGrid";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

const CategoriesScreen = (props) => {
  const renderCategories = (itemData) => {
    return (
      <CategoryGrid
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() =>
          props.navigation.navigate("CategoryMeals", {
            categoryId: itemData.item.id,
          })
        }
      />
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={Categories}
        numColumns={2}
        renderItem={renderCategories}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

CategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Meal Categories",
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
  screen: {
    flex: 1,
  },
});

export default CategoriesScreen;
