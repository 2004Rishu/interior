import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, User, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.jpg';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navLinks = [
    { name: 'For Clients', path: '/start-project' },
    { name: 'For Designers', path: '/join-network' },
    { name: 'Browse Designers', path: '/designers' },
    { name: 'Epoxy Flooring', path: '/epoxy-flooring' },
    { name: 'Shop', path: '/shop' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 text-2xl font-serif tracking-tight text-foreground group">
              <img
                src={logo}
                alt="Interior Me Logo"
                className="h-10 w-10 rounded-full object-cover border border-sand-300 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-semibold tracking-wide bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Interior Me
              </span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-foreground ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            {user ? (
              <>
                <Link
                  to={`/dashboard/${user.role}`}
                  className="text-sm font-medium transition-colors text-foreground hover:text-muted-foreground"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium transition-colors text-foreground hover:text-muted-foreground"
              >
                Log In
              </Link>
            )}

            <Link
              to="/start-project"
              className="inline-flex h-10 items-center justify-center bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 ml-2"
            >
              Start Project
            </Link>

            <button
              onClick={() => setIsDark(!isDark)}
              className="ml-4 p-2 text-foreground hover:bg-muted rounded-full transition-colors focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-sand-200 bg-sand-50 md:hidden"
          >
            <nav className="flex flex-col space-y-4 px-4 py-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium ${
                      isActive ? 'text-charcoal-900' : 'text-sand-700'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              
              <div className="pt-4 border-t border-sand-200 mt-2">
                {user ? (
                  <>
                    <Link
                      to={`/dashboard/${user.role}`}
                      onClick={() => setIsOpen(false)}
                      className="block text-base font-medium text-charcoal-900 mb-4"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="block text-base font-medium text-sand-600"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block text-base font-medium text-charcoal-900 mb-4"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block text-base font-medium text-sand-600"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

              <Link
                to="/start-project"
                onClick={() => setIsOpen(false)}
                className="mt-6 inline-flex h-12 items-center justify-center bg-charcoal-900 px-6 text-base font-medium text-white"
              >
                Start Project
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-sand-100 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 text-2xl font-serif tracking-tight text-charcoal-900 group">
              <img
                src={logo}
                alt="Interior Me Logo"
                className="h-10 w-10 rounded-full object-cover border border-sand-300 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-semibold tracking-wide">
                Interior Me
              </span>
            </Link>
            <p className="mt-4 text-sm text-sand-700">
              The premium marketplace matching you with the perfect interior designer or epoxy flooring expert for your home.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-medium text-charcoal-900">Services</h4>
            <ul className="mt-4 space-y-3 text-sm text-sand-700">
              <li><Link to="/start-project" className="hover:text-charcoal-900">Find a Designer</Link></li>
              <li><Link to="/epoxy-flooring" className="hover:text-charcoal-900">Epoxy Flooring</Link></li>
              <li><Link to="/shop" className="hover:text-charcoal-900">Shop (Coming Soon)</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-medium text-charcoal-900">Company</h4>
            <ul className="mt-4 space-y-3 text-sm text-sand-700">
              <li><Link to="/about" className="hover:text-charcoal-900">About Us</Link></li>
              <li><Link to="/join-network" className="hover:text-charcoal-900">For Designers</Link></li>
              <li><Link to="/contact" className="hover:text-charcoal-900">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-medium text-charcoal-900">Connect</h4>
            <ul className="mt-4 space-y-3 text-sm text-sand-700">
              <li><a href="#" className="hover:text-charcoal-900">Instagram</a></li>
              <li><a href="#" className="hover:text-charcoal-900">Pinterest</a></li>
              <li><a href="#" className="hover:text-charcoal-900">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-sand-200 pt-8 text-sm text-sand-600">
          <p>&copy; {new Date().getFullYear()} Interior Me. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col font-sans text-charcoal-900 selection:bg-sage-200 selection:text-charcoal-950">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
