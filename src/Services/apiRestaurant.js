import supabase from './supabase';

const API_URL = 'https://react-fast-pizza-api.onrender.com/api';

export async function getMenu() {
  const { data: Recipes, error } = await supabase.from('Recipes').select('*');
  if (error) throw Error('Failed getting menu');
  return Recipes;
}

export async function getOrder(id) {
  const { data: order, errorOrder } = await supabase
    .from('Orders')
    .select('*')
    .eq('id', id);
  if (errorOrder) throw Error(`Failed getting the order with the id ${id}`);
  const { data: items, errorItems } = await supabase
    .from('OrderedItems')
    .select('*')
    .eq('order_id', id);
  if (errorItems)
    throw Error(
      `Failed getting the the items that were order please contact us via the phone number in contact us`
    );

  const itemPromises = items.map(async (item) => {
    console.log(item);
    const { data: orderItemWithRName, errorRecipe } = await supabase
      .from('Recipes')
      .select('name')
      .eq('foodId', item.recipe_id);

    if (errorRecipe)
      throw Error(
        `Failed creating the complete data for displaying the order.`
      );

    item.name = orderItemWithRName[0].name;
    return item;
  });

  const updatedItems = await Promise.all(itemPromises);

  order[0].cart = updatedItems;

  return order;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error('Failed creating your order');
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error('Failed updating your order');
  }
}
