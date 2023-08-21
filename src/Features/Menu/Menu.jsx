import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import {
  getMenu,
  updateRecipe,
  uploadRecipe,
} from '../../Services/apiRestaurant';
import MenuItem from './MenuItem';
import AddMenuItem from './AddMenuItem';
import { useState } from 'react';
import EdditRecipeForm from './EdAddForm/EdditRecipeForm';
import AddRecipeForm from './EdAddForm/AddRecipeForm';

function Menu() {
  const menu = useLoaderData();
  const user = useRouteLoaderData('root');
  const [showAllRecipes, setshowAllRecipes] = useState(false);
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);

  // const handlerEditRecipe = () => {
  //   setIsEditting((prevState) => !prevState);
  // };

  const handleShowClick = () => {
    setshowAllRecipes((prevState) => !prevState);
  };

  const showAddingForm = () => {
    setIsAddingRecipe(true);
  };

  const hideAddingForm = () => {
    setIsAddingRecipe(false);
  };

  return (
    <>
      <div className="flex justify-center">
        {user?.role === 'service_role' && (
          <button
            className={`my-2 p-2 font-semibold ${
              showAllRecipes
                ? 'bg-lime-300 text-cyan-900'
                : 'bg-gray-200 text-gray-600'
            } rounded-lg`}
            onClick={handleShowClick}
          >
            Show all Recipes
          </button>
        )}
      </div>
      <ul className=" divide-y divide-amber-200 px-2">
        {!showAllRecipes
          ? menu.map((recipe) => {
              if (recipe.IsOnMenu) {
                return <MenuItem recipe={recipe} key={recipe.foodId} />;
              }
            })
          : menu.map((recipe) => {
              return <MenuItem recipe={recipe} key={recipe.foodId} />;
            })}
      </ul>
      {user?.role === 'service_role' && <AddMenuItem onOpen={showAddingForm} />}
      {isAddingRecipe && <AddRecipeForm onClose={hideAddingForm} />}
    </>
  );
}

export async function loader() {
  const menu = await getMenu();

  return menu;
}

export async function action({ request }) {
  const data = await request.formData();
  const typeOfForm = data.get('typeOfForm');
  console.log(typeOfForm);

  if (typeOfForm === 'addRecipe') {
    const newdData = {
      name: data.get('name'),
      ingredients: data.get('ingredients'),
      soldOut: data.get('soldOut'),
      unitPrice: data.get('unitPrice'),
      imageUrl: data.get('imageUrl'),
      IsOnMenu: data.get('IsOnMenu'),
    };
    const result = await uploadRecipe(newdData);
    return result;
  }
  if (typeOfForm === 'editRecipe') {
    const updatedData = {
      foodId: data.get('id'),
      ingredients: data.get('ingredients'),
      soldOut: data.get('soldOut'),
      unitPrice: data.get('unitPrice'),
    };

    const result = await updateRecipe(updatedData);

    return result;
  }
  return null;
}

export default Menu;
