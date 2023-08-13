import { useReducer } from 'react';
import CartContext from './CartContext';

function calcPriceWithPriority(updatedTotalOrder) {
  return updatedTotalOrder + (updatedTotalOrder * 20) / 100;
}
function calcPriceOfRecipes(recipesDisplayed) {
  return recipesDisplayed.reduce(
    (accumulator, obj) => accumulator + obj.unitPrice,
    0
  );
}

const defaultCartState = {
  totalAmountFromRecipes: 0,
  totalOrder: 0,
  recipesInCart: [],
  recipesDisplayed: [],
};

const CartReducer = (state, action) => {
  if (action.type === 'CLEAR') {
    return {
      ...state,
      recipesInCart: [],
      recipesDisplayed: [],
      totalAmountFromRecipes: 0,
      totalOrder: 0,
    };
  }
  if (action.type === 'ADD') {
    const updatedRecipes = [...state.recipesInCart, action.recipeObj];
    const recipesInTheOrder = updatedRecipes.filter(
      (el) => el.foodId === action.recipeObj.foodId
    );

    const updateDisplayedItems = [...state.recipesDisplayed];
    const recipeDisplayed = updateDisplayedItems.find(
      (el) => el.foodId === action.recipeObj.foodId
    );
    if (recipeDisplayed) {
      recipeDisplayed.quantity = recipesInTheOrder.length;
      recipeDisplayed.totalPrice =
        recipesInTheOrder.length * action.recipeObj.unitPrice;
    } else {
      updateDisplayedItems.push({
        foodId: action.recipeObj.foodId,
        name: action.recipeObj.name,
        quantity: 1,
        unitPrice: action.recipeObj.unitPrice,
        totalPrice: action.recipeObj.unitPrice,
      });
    }
    const updatedTotalAmountFromRecipes = calcPriceOfRecipes(updatedRecipes);
    console.log(updatedTotalAmountFromRecipes);
    const updatedTotalOrder = calcPriceWithPriority(
      updatedTotalAmountFromRecipes
    );

    return {
      ...state,
      totalAmountFromRecipes: updatedTotalAmountFromRecipes,
      totalOrder: updatedTotalOrder,
      recipesDisplayed: updateDisplayedItems,
      recipesInCart: updatedRecipes,
    };
  }
  if (action.type === 'DELETE') {
    const updatedRecipes = state.recipesInCart.filter(
      (obj) => obj.foodId !== action.id
    );
    const updatedRecipesDisplayed = state.recipesDisplayed.filter(
      (obj) => obj.foodId !== action.id
    );
    const updateTotalAmountFromRecipes = calcPriceOfRecipes(updatedRecipes);
    const updatedTotalOrder = calcPriceWithPriority(
      updateTotalAmountFromRecipes
    );

    return {
      ...state,
      totalAmountFromRecipes: updateTotalAmountFromRecipes,
      totalOrder: updatedTotalOrder,
      recipesDisplayed: updatedRecipesDisplayed,
      recipesInCart: updatedRecipes,
    };
  }
};

export default function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    CartReducer,
    defaultCartState
  );

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const addRecipeHandler = (recipeObj) => {
    dispatchCartAction({ type: 'ADD', recipeObj: recipeObj });
  };

  const deleteRecipeHandler = (id) => {
    dispatchCartAction({ type: 'DELETE', id: id });
  };

  const orderRecipesHandler = (obj) => {
    dispatchCartAction({ type: 'ORDER', obj: obj });
  };

  const cartContext = {
    totalAmountFromRecipes: cartState.totalAmountFromRecipes,
    totalOrder: cartState.totalOrder,
    recipesInCart: cartState.recipesInCart,
    recipesDisplayed: cartState.recipesDisplayed,
    addRecipe: addRecipeHandler,
    clearCart: clearCartHandler,
    deleteRecipe: deleteRecipeHandler,
    orderRecipes: orderRecipesHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
