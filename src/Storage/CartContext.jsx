import React from 'react';

const CartContext = React.createContext({
  totalAmountFromRecipes: 0,
  totalOrder: 0,
  recipesInCart: [],
  recipesDisplayed: [],
  deleteRecipe: (recipeId) => {},
  addRecipe: (recipeObj) => {},
  clearCart: () => {},
  orderRecipes: (id) => {},
});

export default CartContext;
