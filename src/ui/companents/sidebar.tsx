import "../style/basic.css";

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
          <a
            href="#/"
            className="block p-3 rounded hover:bg-gray-700 cursor-pointer"
          >
            Product
          </a>
        </li>
        <li>
          <a
            href="#/contact"
            className="block p-3 rounded hover:bg-gray-700 cursor-pointer"
          >
            Orders
          </a>
        </li>
        <li>
          <a
            href="#/about"
            className="block p-3 rounded hover:bg-gray-700 cursor-pointer"
          >
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
