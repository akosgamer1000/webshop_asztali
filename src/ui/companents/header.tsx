
import  "../style/basic.css";


const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
    return (
      <div className="bg-white p-4 shadow-md sticky top-0 z-50 flex items-center">
        <button
          className="md:hidden text-gray-800 text-2xl mr-4"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <h1 className="text-xl font-bold text-center w-full">Admin Panel</h1>
      </div>
    );
  };
  export default Header;