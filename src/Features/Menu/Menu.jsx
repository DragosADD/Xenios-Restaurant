import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { getMenu } from '../../Services/apiRestaurant';
import MenuItem from './MenuItem';
import AddMenuItem from './AddMenuItem';

function Menu() {
  const menu = useLoaderData();
  const user = useRouteLoaderData('root');
  return (
    <>
      <ul className=" divide-y divide-amber-200 px-2">
        {menu.map((recipe) => {
          return <MenuItem recipe={recipe} key={recipe.foodId} />;
        })}
      </ul>
      {user?.role === 'service_role' && <AddMenuItem></AddMenuItem>}
    </>
  );
}

export async function loader() {
  const menu = await getMenu();

  return menu;
}

export default Menu;
