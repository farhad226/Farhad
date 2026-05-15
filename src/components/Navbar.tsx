import React, { useState, useEffect } from 'react';
import { Instagram, Send, Linkedin, Github, Menu, X, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from '../assets/images/regenerated_image_1778831989911.png';
import { WhatsAppFilled } from './WhatsAppIcon';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <Facebook size={18} />, href: 'https://www.facebook.com/md.shovon.927543' },
    { icon: <Instagram size={18} />, href: 'https://www.instagram.com/farhad.hossain000?igsh=eGoyeDBzNHhoNXF5' },
    { icon: <Send size={18} />, href: 'https://t.me/Farhad_Hossain_WP' },
    { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/farhad-hossain-162b252a4?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { icon: <WhatsAppFilled size={18} />, href: 'https://wa.me/8801604118643' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-md py-4 shadow-lg shadow-black/20' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 z-50">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-[#00a2ff]">
            {/* Placeholder for face logo */}
            <img 
              src={logoImage} 
              alt="Farhad Logo" 
              className="w-full h-full object-cover"
            />
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-[#00a2ff] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Socials & CTA Area (Socials shown in the original design) */}
        <div className="hidden md:flex items-center gap-4">
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00a2ff] hover:bg-[#00a2ff]/10 transition-all"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 text-gray-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-8 z-40"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-medium text-gray-300 hover:text-[#00a2ff] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-4 mt-4">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00a2ff] transition-all"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
