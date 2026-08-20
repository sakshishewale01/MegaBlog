import { Link } from "react-router-dom";
import { Logo } from "../index";

function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        <Link to="/">
          <Logo />
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="text-gray-700 hover:text-blue-600"
          >
            Signup
          </Link>
        </nav>

      </div>
    </header>
  );
}

export default Header;