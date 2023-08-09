import Button from '../../UI/button/Button';
import { formatCurrency } from '../../utils/helpers';

function MenuItem({ recipe }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = recipe;

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col">
        <p className={`font-medium${soldOut ? ' grayscale' : ''}`}>{name}</p>
        <p
          className={`text-sm capitalize italic${soldOut ? ' grayscale' : ''}`}
        >
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex  items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-lime-800">
              Sold out
            </p>
          )}
          <Button type="addButton" disabled={soldOut ? true : false}>
            Add
          </Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
