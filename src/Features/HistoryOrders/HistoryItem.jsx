import React from 'react';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { useNavigate } from 'react-router-dom/dist';

export default function HistoryItem({ order }) {
  const {
    id,
    Total_price,
    estimatedDelivery,
    orderPrice,
    priority,
    priorityPrice,
    status,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const navigation = useNavigate();

  const redirectHandler = () => {
    navigation(`/order/${id}`);
  };

  return (
    <li className=" bg-stone-200" onClick={redirectHandler}>
      <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-5 ">
        <h2 className="text-lg font-semibold">Order# {id} status</h2>
        <div className="space-x-2">
          {priority && (
            <span className=" px-3 py-1 text-sm  uppercase tracking-wide text-red-600">
              Priority
            </span>
          )}
          <span className="rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-500">
            {status} order
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-1">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <div className="space-y-2 bg-stone-200 px-6 py-1 pb-3">
        {priority && (
          <p className="text-sm font-medium">
            Price Order: {formatCurrency(orderPrice)}
          </p>
        )}
        {priority && (
          <p className="text-sm font-medium">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          Total Price of the order: {formatCurrency(Total_price)}
        </p>
      </div>
    </li>
  );
}
