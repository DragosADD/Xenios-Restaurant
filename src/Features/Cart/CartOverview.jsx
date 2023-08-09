import { Link } from 'react-router-dom';

function CartOverview() {
  return (
    <div className=" bottom-0  left-0 right-0 flex h-12 items-center justify-between bg-cyan-950 py-2 pl-6 pr-10 text-sm uppercase text-green-300 sm:px-6 md:h-20 md:text-base">
      <p className="space-x-3 text-green-100">
        <span>10 Items worth of</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart </Link>
    </div>
  );
}

export default CartOverview;
