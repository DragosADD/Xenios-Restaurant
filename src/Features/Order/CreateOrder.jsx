import { useState } from 'react';
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../Services/apiRestaurant';
import FormInput from '../../UI/input/FormInput';
import Button from '../../UI/button/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

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

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const [withPriority, setWithPriority] = useState(false);

  const formErrors = useActionData();

  const cart = fakeCart;

  return (
    <div className=" ml-2 flex flex-col items-center justify-center font-medium text-cyan-950">
      <h2 className=" mb-8 mt-5 text-xl font-semibold">
        Ready to order? Lets go!
      </h2>

      <Form method="POST" action="/order/new">
        <div className="my-2 flex flex-col">
          <label>First name</label>
          <FormInput
            type="text"
            name="customer"
            placeholder="Enter your Name"
          />
        </div>

        <div className="my-2 flex flex-col">
          <label>Phone number</label>
          <div>
            <FormInput
              type="tel"
              name="phone"
              placeholder="Enter phone number"
            />
          </div>
          {formErrors?.phone && (
            <p className="mt-2 w-2/3 rounded-full bg-red-100 py-2 pl-3 text-xs font-semibold text-red-500">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="my-2 flex flex-col">
          <label>Address</label>
          <div>
            <FormInput type="text" name="address" placeholder="Enter address" />
          </div>
        </div>

        <div className=" my-2 flex flex-auto space-x-2 ">
          <input
            className="h-6 w-6 accent-lime-400 focus:outline-none focus:ring focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? 'Processing order...' : 'Order now'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone = 'Wrong phone number, it is required';

  if (Object.keys(errors).length > 0) return errors;

  // if everything is okey, create new order and redirect
  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
