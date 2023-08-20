export default function AddMenuItem({ onOpen }) {
  return (
    <div
      onClick={onOpen}
      className="hover:bg-opacity-100motion-reduce:transition-none flex transform cursor-pointer items-center justify-center rounded border border-gray-300 bg-gray-100 bg-opacity-50 p-4 backdrop-blur-lg backdrop-filter transition hover:-translate-y-1 hover:border-cyan-700 hover:border-opacity-100 hover:bg-cyan-700 motion-reduce:hover:transform-none"
    >
      <span className="text-4xl text-gray-600">+</span>
    </div>
  );
}
