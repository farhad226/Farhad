import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloatingCTA() {
  const phoneNumber = "8801604118643";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end"
    >
      <motion.a
        href={`tel:+${phoneNumber}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-[#00a2ff] text-white px-3 py-2 md:px-5 md:py-3 rounded-full shadow-[0_0_20px_rgba(0,162,255,0.4)] font-bold text-[10px] md:text-base border border-[#00a2ff]/50"
      >
        <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center">
          <Phone size={14} className="md:w-[18px] md:h-[18px]" fill="currentColor" />
        </div>
        <span>Need To Help?</span>
      </motion.a>
    </motion.div>
  );
}
