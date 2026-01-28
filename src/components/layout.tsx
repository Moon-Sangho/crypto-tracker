import { useState } from "react";
import { Outlet, Link } from "react-router";
import { Coins } from "lucide-react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/crypto", label: "Cryptocurrencies" },
    { to: "/favorites", label: "Favorites" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Coins size={28} />
              CryptoTracker
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                  isSidebarOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                  isSidebarOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                  isSidebarOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-8 p-6">
          {/* Sidebar Header */}
          <Link
            to="/"
            onClick={closeSidebar}
            className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Coins size={28} />
            CryptoTracker
          </Link>

          {/* Sidebar Links */}
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeSidebar}
                className="text-lg text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center text-gray-600 text-sm">
          <p>
            Data provided by{" "}
            <a
              href="https://www.coingecko.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              CoinGecko
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
