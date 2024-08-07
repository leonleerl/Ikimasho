

function Navbar() {
  return (
    <nav className="bg-red-400 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">一緒に行きましょ！</div>
        <div className="space-x-4">
          <a href="/" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="/about" className="text-white hover:text-gray-300">
            About
          </a>
          <a href="/services" className="text-white hover:text-gray-300">
            Services
          </a>
          <a href="/contact" className="text-white hover:text-gray-300">
            Games
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
