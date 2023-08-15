import { Link, redirect } from 'react-router-dom';
import LinkButton from '../../UI/button/LinkButton';
import Button from '../../UI/button/Button';
import CartItem from './CartItem';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../Storage/CartContext';
import { calcPriceWithPriority, formatCurrency } from '../../utils/helpers';
import { createOrder } from '../../Services/apiRestaurant';

function Cart() {
  const cartContext = useContext(CartContext);
  const [priority, setIsPriority] = useState(false);

  const givePriorityHandler = () => {
    setIsPriority((prevPriority) => !prevPriority);
    cartContext.changePriority(priority);
  };
  const cart = cartContext.recipesDisplayed;
  const paymentTotal = calcPriceWithPriority(
    cartContext.totalAmountFromRecipes
  );

  const orderHandler = (e) => {
    cartContext.orderRecipes();
    const [food, order] = cartContext.dataForSending;
    console.log(food, order) ///undefined, the cartContext.dataForSending is empty
    // cartSendData(orderFood, orderDetails);
  };

  return (
    <div className="px-4 py-3 ">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, Dediu Dragos</h2>
      <ul className="mt-3 divide-y divide-amber-200 border-b border-amber-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.foodId} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium">
          Price Order: {formatCurrency(cartContext.totalAmountFromRecipes)}
        </p>
        {true && (
          <p className="text-sm font-medium">
            Price priority:{' '}
            {priority
              ? formatCurrency(
                  paymentTotal - cartContext.totalAmountFromRecipes
                )
              : `RON 0.00`}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery:{' '}
          {priority
            ? formatCurrency(paymentTotal)
            : formatCurrency(cartContext.totalAmountFromRecipes)}
        </p>
      </div>
      <div className=" my-2 flex flex-auto space-x-2 ">
        <input
          className="h-6 w-6 accent-lime-400 focus:outline-none focus:ring focus:ring-offset-2"
          type="checkbox"
          name="priority"
          id="priority"
          value={priority}
          onChange={givePriorityHandler}
        />
        <label htmlFor="priority">Want to yo give your order priority?</label>
      </div>
      <div className="mt-3">
        <Button
          type="primary"
          disabled={cart.length === 0 ? true : false}
          onClick={orderHandler}
        >
          Order
        </Button>

        <Button
          type="clearButton"
          disabled={cart.length === 0 ? true : false}
          onClick={cartContext.clearCart}
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;

export async function cartSendData({ orderFood, orderDetails }) {
  console.log(`hellow from loader`);
  let id;
  try {
    const data = createOrder(orderDetails, orderFood);
    const { id: newOrder } = data;
    id = newOrder;
    console.log('Order created ', data);
  } catch (error) {
    console.error(`Error Creating order:`, error.message);
  }
  return redirect(`/order/${id}`);
}
