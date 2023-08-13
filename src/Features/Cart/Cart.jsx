import { Link } from 'react-router-dom';
import LinkButton from '../../UI/button/LinkButton';
import Button from '../../UI/button/Button';
import CartItem from './CartItem';
import { useContext, useEffect } from 'react';
import CartContext from '../../Storage/CartContext';
import { formatCurrency } from '../../utils/helpers';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const cartContext = useContext(CartContext);
  useEffect(() => {
    console.log(cartContext.totalOrder);
    console.log(cartContext.totalAmountFromRecipes);
  }, [cartContext]);
  const cart = cartContext.recipesDisplayed;

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
            {formatCurrency(
              cartContext.totalOrder - cartContext.totalAmountFromRecipes
            )}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(cartContext.totalOrder)}
        </p>
      </div>
      <div className="mt-3">
        <Button
          to="/order/new"
          type="primary"
          disabled={cart.length === 0 ? true : false}
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
