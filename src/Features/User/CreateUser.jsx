import { useState } from 'react';
import Button from '../../UI/button/Button';

function CreateUser() {
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="focus: mb-8 w-48 rounded-full  border border-stone-200 bg-zinc-200 px-4 py-2 text-sm text-cyan-950 outline-none transition-all duration-300 placeholder:text-cyan-950 focus:ring focus:ring-amber-700 md:w-80 md:px-6 md:py-3 "
      />

      {username !== '' && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
