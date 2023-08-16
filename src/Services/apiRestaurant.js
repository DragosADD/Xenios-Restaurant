import { getUser } from '../Utils/auth';
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

export async function createOrder(newOrder, itemsOfTheOrder) {
  const { data: lastId, errorID } = await supabase
    .from('Orders')
    .select('id')
    .order('id', { ascending: false })
    .limit(1);

  const newId = lastId[0].id + 1;
  if (errorID) throw Error(`Failed getting the ID of the last order`);
  const {
    status,
    priority,
    priorityPrice,
    orderPrice,
    Total_price,
    estimatedDelivery,
  } = newOrder;

  const user_id = await getUser();

  try {
    const { data: sentOrder, error } = await supabase
      .from('Orders')
      .insert([
        {
          id: newId,
          status: status,
          priority: priority,
          priorityPrice: priorityPrice,
          orderPrice,
          Total_price: Total_price,
          estimatedDelivery: estimatedDelivery,
          user_id: user_id.id,
        },
      ])
      .select();

    if (error) throw Error(`Failed creating your order please contact us `);

    for (const item of itemsOfTheOrder) {
      try {
        const { data, error } = await supabase
          .from('OrderedItems')
          .insert([
            {
              recipe_id: item.foodId,
              quantity: item.quantity,
              totalPrice: item.totalPrice,
              order_id: newId,
            },
          ])
          .select();
      } catch (error) {
        throw Error(`Failed creating pushing items please contact us`);
      }
    }

    return sentOrder;
  } catch {
    throw Error('Failed creating your order please contact us');
  }
}

export async function getHistory(userId) {
  const { data, error } = await supabase
    .from('Orders')
    .select('*')
    .eq('user_id', userId);

  if (error) throw Error(`Failed to fetch orders`);

  return data;
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
