import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import portraitImage from '../assets/images/regenerated_image_1778831987112.png';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background large text */}
      <div className="absolute top-[40%] xl:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
        <h1 className="text-[16vw] xl:text-[18vw] font-black text-transparent opacity-20 tracking-tighter uppercase leading-none" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.15)' }}>
          WordPress
        </h1>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center w-full">
        <motion.div 
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-2xl lg:text-3xl font-medium text-white mb-6 z-20 flex items-center justify-center gap-2 mt-[6vh] md:mt-0"
        >
          Hello, I am Farhad Hossain
        </motion.div>

        {/* Center content container containing image and overlapping text */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center mt-4">
          
          {/* Portrait Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 w-full max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl flex justify-center"
          >
            <img 
              src={portraitImage} 
              alt="Farhad Hossain" 
              className="w-full h-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
            />
          </motion.div>

          {/* Large Text block overlaying the image */}
          <motion.div 
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-20 text-center -mt-24 md:-mt-36 lg:-mt-48 w-full"
          >
            <h2 className="text-[16vw] md:text-[13vw] lg:text-[12vw] font-black font-heading text-white leading-[0.85] tracking-tight drop-shadow-2xl">
              <span className="block drop-shadow-md">& Web</span>
              <span className="block drop-shadow-md">Developer</span>
            </h2>
          </motion.div>

          {/* Floating Buttons */}
          <motion.div 
            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block absolute top-[25%] left-0 z-30"
          >
             <a href="#contact" className="bg-[#00a2ff] text-white px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-3 hover:bg-[#0081cc] transition-colors shadow-[0_0_25px_rgba(0,162,255,0.4)]">
              Hire Me Now <ArrowUpRight size={20} />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block absolute top-[25%] right-0 z-30"
          >
             <a href="#portfolio" className="bg-[#13141c] border border-gray-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:border-gray-500 hover:bg-[#1c1d27] transition-all">
              View My Work
            </a>
          </motion.div>
        </div>

        {/* Mobile buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex lg:hidden flex-wrap justify-center gap-4 mt-8 z-30 relative"
        >
          <a href="#contact" className="bg-[#00a2ff] text-white px-8 py-3.5 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-[#0081cc] transition-colors text-base shadow-[0_0_20px_rgba(0,162,255,0.4)]">
            Hire Me Now <ArrowUpRight size={18} />
          </a>
          <a href="#portfolio" className="bg-[#13141c] border border-gray-700 text-white px-8 py-3.5 rounded-full font-semibold hover:border-gray-500 transition-all text-base">
            View My Work
          </a>
        </motion.div>

        {/* Decorative particles */}
        <div className="absolute top-[25%] left-[20%] w-2 h-2 bg-[#00a2ff] rounded-full blur-[1px]"></div>
        <div className="absolute top-[20%] right-[25%] w-1.5 h-1.5 bg-white/50 rounded-full blur-[1px]"></div>
        <div className="absolute bottom-[20%] left-[25%] w-2 h-2 bg-[#00a2ff] rounded-full blur-[1px]"></div>
        <div className="absolute bottom-[25%] right-[20%] w-1.5 h-1.5 bg-[#00a2ff] rounded-full blur-[0.5px]"></div>
      </div>
    </section>
  );
}
