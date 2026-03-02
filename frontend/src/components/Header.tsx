import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-slate-700 text-white shadow-md mb-5 container mx-auto">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/images/logo.png" 
            alt="Oddly Logo" 
            className="h-10 object-contain"
          />
        </Link>
        
        {/* Navigation Section */}
        <nav>
          <ul className="flex gap-6 list-none m-0 p-0">
            <li>
              <Link 
                to="/about" 
                className="text-white no-underline px-4 py-2 rounded transition-colors duration-300 hover:bg-slate-600"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="text-white no-underline px-4 py-2 rounded transition-colors duration-300 hover:bg-slate-600"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;