import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = [
    { name: 'Store', href: '#' },
    { name: 'Titanium', href: '#' },
    { name: 'Collection', href: '#' },
    { name: 'Support', href: '#' },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 h-12 flex items-center transition-all duration-500"
      style={{
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(20px)',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      }}
    >
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-bold tracking-tighter"
        >
          Lumina Grove
        </motion.div>

        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="text-[12px] font-medium text-titanium-300 hover:text-white transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <div className="flex items-center space-x-6 text-titanium-300">
            <button className="hover:text-white transition-colors"><Search size={16} /></button>
            <button className="hover:text-white transition-colors"><ShoppingBag size={16} /></button>
          </div>
        </div>

        <div className="md:hidden flex items-center space-x-6">
          <button className="text-titanium-300"><Search size={18} /></button>
          <button className="text-titanium-300"><ShoppingBag size={18} /></button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-titanium-300">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: '100vh' }}
          className="fixed inset-0 top-12 bg-black z-40 px-10 py-10 flex flex-col space-y-8 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-bold tracking-tight"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};
