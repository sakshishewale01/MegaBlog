import { Link } from "react-router-dom";
import { Logo } from "../index";

function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-center mb-4">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <p className="text-center text-gray-600">
          © 2026 My Blog. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;