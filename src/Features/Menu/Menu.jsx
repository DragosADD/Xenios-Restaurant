import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../Services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();
  console.log(menu);
  return (
    <ul className=" divide-y divide-amber-200 px-2">
      {menu.map((recipe) => {
        return <MenuItem recipe={recipe} key={recipe.foodId} />;
      })}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();

  return menu;
}

export default Menu;
