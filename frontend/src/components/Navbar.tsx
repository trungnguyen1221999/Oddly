import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 mb-5">
      <ul className="flex gap-5 list-none m-0 p-0">
        <li>
          <Link 
            to="/" 
            className="text-white no-underline px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-600"
          >
            Trang Chủ
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            className="text-white no-underline px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-600"
          >
            Giới Thiệu
          </Link>
        </li>
        <li>
          <Link 
            to="/contact" 
            className="text-white no-underline px-4 py-2 rounded transition-colors duration-300 hover:bg-gray-600"
          >
            Liên Hệ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;