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

export async function createOrder(newOrder, itemsOfTheOrder) {
  const { data: lastId, errorID } = await supabase
    .from('Orders')
    .select('MAX(price) as max_price');
  if (errorID) throw Error(`Failed creating your order please contact us`);

  const {
    status,
    priority,
    priorityPrice,
    orderPrice,
    Total_price,
    estimatedDelivery,
  } = newOrder;

  try {
    const { data: sentOrder, error } = await supabase
      .from('Orders')
      .insert([
        {
          id: lastId + 1,
          status: status,
          priority: priority,
          priorityPrice: priorityPrice,
          orderPrice,
          Total_price: Total_price,
          estimatedDelivery: estimatedDelivery,
        },
      ])
      .select();

    if (error) throw Error();

    for (const item of itemsOfTheOrder) {
      try {
        const { data, error } = await supabase
          .from('OrderedItems')
          .insert([
            {
              recipe_id: item.foodId,
              quantity: item.quantity,
              totalPrice: item.totalPrice,
              order_id: lastId + 1,
            },
          ])
          .select();
      } catch (error) {
        throw Error(`Failed creating your order please contact us`);
      }
    }

    return sentOrder;
  } catch {
    throw Error('Failed creating your order please contact us');
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
