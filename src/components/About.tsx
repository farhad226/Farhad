import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { supabase } from '../supabase';
import aboutImage from '../assets/images/regenerated_image_1778831992646.jpg';

export default function About() {
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const { data, error } = await supabase.from('site_info').select('resume_url').eq('id', 'contact').single();
        if (error && error.code !== 'PGRST116') throw error;
        if (data?.resume_url) {
          setResumeUrl(data.resume_url);
        }
      } catch (error) {
        console.error("Error fetching resume URL:", error);
      }
    };
    fetchInfo();
  }, []);

  return (
    <section id="about" className="py-12 md:py-24 bg-[#111219]">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden rounded-tl-3xl rounded-br-[8rem]">
              <img 
                src={aboutImage} 
                alt="Workspace" 
                className="w-full h-full object-cover aspect-[4/5] opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00a2ff]/20 to-transparent mix-blend-overlay pointer-events-none"></div>
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:-bottom-6 lg:-right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-5 rounded-2xl shadow-2xl flex items-center gap-3 sm:gap-4 w-[85%] sm:max-w-[280px]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00a2ff] rounded-full flex items-center justify-center text-white font-bold shrink-0">
                FH
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm sm:text-base">Farhad Hossain</h4>
                <p className="text-gray-300 text-[10px] sm:text-xs">Expert Web Developer</p>
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-[#00a2ff] uppercase tracking-wider font-semibold text-[10px] md:text-sm mb-3">About Me</p>
            <h2 className="text-2xl md:text-5xl font-bold font-heading mb-6 leading-tight">
              Crafting Digital Experiences with Passion
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              With over 4 years of expertise in WordPress and Elementor, I've dedicated my career to building high-quality, conversion-focused websites. My journey began with a simple curiosity about how the web works, which evolved into a professional mission to help brands establish their authority online.
            </p>

            <div className="flex flex-wrap gap-12 mb-10">
              <div>
                <h3 className="text-[22px] md:text-4xl font-bold text-white mb-2">4+</h3>
                <p className="text-gray-500 text-sm uppercase tracking-wider font-medium">Years Experience</p>
              </div>
              <div>
                <h3 className="text-[22px] md:text-4xl font-bold text-white mb-2">200+</h3>
                <p className="text-gray-500 text-sm uppercase tracking-wider font-medium">Projects Completed</p>
              </div>
            </div>

            {resumeUrl ? (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="border border-white/20 hover:border-[#00a2ff] hover:bg-[#00a2ff]/10 text-white px-8 py-3.5 rounded-full font-medium inline-flex items-center gap-3 transition-all">
                <Download size={18} />
                Download My Resume
              </a>
            ) : (
              <button disabled className="border border-white/10 text-white/50 px-8 py-3.5 rounded-full font-medium inline-flex items-center gap-3 transition-all cursor-not-allowed">
                <Download size={18} />
                Resume Not Available
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
