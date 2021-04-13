import { Meals } from "../../data/Meals-data";
import { TOGGLE_FAVORITE, APPLY_FILTER } from "../actions/Meals";

const initialState = {
  meals: Meals,
  filteredMeals: Meals,
  favoriteMeals: [],
};

const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const mealIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (mealIndex >= 0) {
        let updatedFavMeal = [...state.favoriteMeals];
        updatedFavMeal.splice(mealIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeal };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
      break;
    case APPLY_FILTER:
      const filter = action.filters;
      const newFilteredMeals = state.meals.filter((meal) => {
        if (filter.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (filter.vegan && !meal.isVegan) {
          return false;
        }
        if (filter.vegetarian && !meal.isVegetarian) {
          return false;
        }
        if (filter.lactosFree && !meal.isLactoseFree) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals: newFilteredMeals };
      break;
    default:
      state;
  }
  return state;
};

export default mealReducer;
