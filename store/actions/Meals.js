export const TOGGLE_FAVORITE = "TOGGLE_FAOVIRTE";
export const APPLY_FILTER = "APPLY_FILTER";

export const toggleFavorite = (id) => {
  return {
    type: TOGGLE_FAVORITE,
    mealId: id,
  };
};

export const applyFilters = (filters) => {
  return {
    type: APPLY_FILTER,
    filters: filters,
  };
};
