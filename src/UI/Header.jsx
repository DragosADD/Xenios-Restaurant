import { Link } from 'react-router-dom';
import SearchOrder from '../Features/Order/SearchOrder';
import Username from '../Features/User/Username';
import { useState } from 'react';

function Header() {
  return (
    <header className="h-25 flex items-center justify-between border-b-4 border-dashed border-amber-400 bg-lime-300 px-4 py-3 font-mono text-sm font-bold tracking-widest text-cyan-600 sm:px-7 md:h-auto md:text-lg">
      <span className="w-20  md:w-auto">
        <div className="mb-1">
          <Link className=" text-xl md:text-4xl" to="/">
            Xenios taverna
          </Link>
        </div>
        <SearchOrder />
      </span>
      <Username />
    </header>
  );
}

export default Header;
