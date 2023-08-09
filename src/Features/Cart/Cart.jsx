import { Link } from 'react-router-dom';
import LinkButton from '../../UI/button/LinkButton';
import Button from '../../UI/button/Button';
import CartItem from './CartItem';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div className="px-4 py-3 ">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, Dediu Dragos</h2>
      <ul className="mt-3 divide-y divide-amber-200 border-b border-amber-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.key} />
        ))}
      </ul>
      <div className="mt-3">
        <Button
          to="/order/new"
          type="primary"
          disabled={cart.length === 0 ? true : false}
        >
          Order
        </Button>

        <Button type="clearButton" disabled={cart.length === 0 ? true : false}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
