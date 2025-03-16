import "../style/basic.css";
import { Link } from 'react-router-dom';

const Sidebar: React.FC<{ toggleSidebar: () => void; isOpen: boolean }> = ({
  isOpen,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-5 transition-transform w-64 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0`}
    >
      <h2 className="text-center text-xl font-bold mb-5">Admin</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/products"
            className="block p-3 rounded hover:bg-gray-700 cursor-pointer"
          >
            Product
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className="block p-3 rounded hover:bg-gray-700 cursor-pointer"
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="/setting"
            className="block p-3 rounded hover:bg-gray-700 cursor-pointer"
          >
            Settings
          </Link>
        </li>
        <li>
          <Link
            to="/users"
            className="block p-3 rounded hover:bg-gray-700 cursor-pointer"
          >
            users
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="block p-3 rounded hover:bg-gray-700 cursor-pointer"
          >
            login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
