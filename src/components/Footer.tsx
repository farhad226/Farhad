import React from 'react';
import { Instagram, Send, Linkedin, Github, Facebook } from 'lucide-react';
import logoImage from '../assets/images/regenerated_image_1778831989911.png';
import { WhatsAppFilled } from './WhatsAppIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook size={18} />, href: 'https://www.facebook.com/md.shovon.927543' },
    { icon: <Instagram size={18} />, href: 'https://www.instagram.com/farhad.hossain000?igsh=eGoyeDBzNHhoNXF5' },
    { icon: <Send size={18} />, href: 'https://t.me/Farhad_Hossain_WP' },
    { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/farhad-hossain-162b252a4?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { icon: <WhatsAppFilled size={18} />, href: 'https://wa.me/8801604118643' },
  ];

  return (
    <footer className="bg-[#0a0a0f] border-t border-gray-800/50 py-[50px] md:py-8">
      <div className="container mx-auto px-[15px] md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo/Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border border-[#00a2ff]">
            <img 
              src={logoImage} 
              alt="Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-lg tracking-tight">Farhad</span>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 text-sm">
          &copy; {currentYear}. All rights reserved by Farhad Hossain.
        </div>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00a2ff] hover:bg-[#00a2ff]/10 transition-all"
            >
              {link.icon}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
