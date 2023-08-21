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

  const user = await getUser();

  const {
    id: user_id,
    user_metadata: { address, phone },
  } = user;

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
          user_id: user_id,
          address: address,
          mobileNumber: phone,
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
  if (userId === 'all') {
    const { data, error } = await supabase.from('Orders').select('*');

    if (error) throw Error(`Failed to fetch orders`);

    return data;
  }
  const { data, error } = await supabase
    .from('Orders')
    .select('*')
    .eq('user_id', userId);

  if (error) throw Error(`Failed to fetch orders`);

  return data;
}

export async function removeRecipeFromMenu(id) {
  try {
    const { data, error } = await supabase
      .from('Recipes')
      .update({ IsOnMenu: false })
      .eq('foodId', id);
    if (error) throw Error();
    window.location.reload();
    return data;
  } catch (error) {
    throw Error('Failed updating your order' + error.message);
  }
}

export async function addBackRecipeFromOnMenu(id) {
  try {
    const { data, error } = await supabase
      .from('Recipes')
      .update({ IsOnMenu: true })
      .eq('foodId', id);
    if (error) throw Error();
    window.location.reload();
    return data;
  } catch (error) {
    throw Error('Failed updating your order' + error.message);
  }
}

export async function updateRecipe(updatedData) {
  const { foodId, soldOut, ingredients, unitPrice } = updatedData;
  try {
    const { data, error } = await supabase
      .from('Recipes')
      .update({
        soldOut: soldOut,
        ingredients: ingredients,
        unitPrice: unitPrice,
      })
      .eq('foodId', foodId);
    if (error) throw Error();
    return data;
  } catch (error) {
    throw Error('Failed updating your order' + error.message);
  }
}

export async function uploadRecipe(data) {
  const requiredFields = ['name', 'unitPrice', 'ingredients', 'imageUrl'];

  for (const field of requiredFields) {
    if (
      !(field in data) ||
      data[field] === null ||
      data[field] === undefined ||
      data[field] === ''
    ) {
      throw new Error(`Required field "${field}" is missing or empty`);
    }
  }

  if (!('soldOut' in data)) {
    throw new Error('Required field "soldOut" is missing');
  }

  if (!('IsOnMenu' in data)) {
    throw new Error('Required field "IsOnMenu" is missing');
  }

  const { data: lastId, errorID } = await supabase
    .from('Recipes')
    .select('foodId')
    .order('foodId', { ascending: false })
    .limit(1);

  if (errorID) throw new Error('Failed getting the last Recipe Added');

  const actualLastId = lastId[0].foodId + 19;

  const { name, unitPrice, ingredients, soldOut, imageUrl, IsOnMenu } = data;

  const { data: final, error } = await supabase
    .from('Recipes')
    .insert([
      {
        foodId: actualLastId,
        name: name,
        unitPrice: unitPrice,
        ingredients: ingredients,
        soldOut: soldOut,
        imageUrl: imageUrl,
        IsOnMenu: IsOnMenu,
      },
    ])
    .select();
  if (error) throw Error('Failed updating your order' + error.message);
  return final;
}

export async function updateStatusPriorityRecipe(newData) {
  const { id, status, priority, orderPrice, priorityPrice, Total_price } =
    newData;
  const { data: updatedData, error } = await supabase
    .from('Orders')
    .update({
      status: status,
      priority: priority,
      orderPrice: orderPrice,
      priorityPrice: priorityPrice,
      Total_price: Total_price,
    })
    .eq('id', id)
    .select();
  if (error)
    throw new Error(`Failed updating the status and priority of the order`);
  return updatedData;
}

export async function updateStatusToCompleted(id) {
  const { data: updatedOrder, error } = await supabase
    .from('Orders')
    .update({
      status: 'Delivered',
    })
    .eq('id', id)
    .select();
  if (error) throw new Error(`Unable to update status` + error.message);

  return updatedOrder;
}
