import { useContext, useEffect } from 'react';
import Button from '../../UI/button/Button';
import { formatCurrency } from '../../utils/helpers';
import CartContext from '../../Storage/CartContext';
import { useRouteLoaderData } from 'react-router-dom';

function MenuItem({ recipe }) {
  const { foodId, name, unitPrice, ingredients, soldOut, imageUrl } = recipe;
  const cartCtx = useContext(CartContext);
  const addRecipeHandler = () => {
    cartCtx.addRecipe(recipe);
  };

  const user = useRouteLoaderData('root');
  // console.log(user.role);

  const removeRecipeFromMenu = () => {};

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 w-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col">
        <p className={`font-medium${soldOut ? ' grayscale' : ''}`}>{name}</p>
        <p
          className={`text-sm capitalize italic${soldOut ? ' grayscale' : ''}`}
        >
          {ingredients}
        </p>
        <div className="mt-auto flex  items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-lime-800">
              Sold out
            </p>
          )}
          {user?.role !== 'service_role' ? (
            <Button
              type="addButton"
              disabled={soldOut ? true : false}
              onClick={addRecipeHandler}
            >
              Add
            </Button>
          ) : (
            <Button
              type="addButton"
              disabled={soldOut ? true : false}
              onClick={removeRecipeFromMenu}
            >
              remove
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
