import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';
import { supabase } from '../supabase';

const staticExperience = [
  {
    company: "WordPress Agency",
    role: "Senior WordPress Developer",
    period: "2022 - Present",
    description: "Leading the development of complex WooCommerce sites and custom WordPress plugins for international clients."
  },
  {
    company: "Tech Solutions Ltd",
    role: "Web Developer",
    period: "2020 - 2022",
    description: "Developed and maintained multiple business websites, ensuring high performance and responsive design."
  }
];

export default function Experience() {
  const [experience, setExperience] = useState<any[]>(staticExperience);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const { data, error } = await supabase.from('experience').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) {
          setExperience(data);
        }
      } catch (error) {
        console.error("Error fetching experience", error);
      }
    };
    fetchExperience();
  }, []);

  return (
    <section id="experience" className="py-[50px] md:py-24 bg-[#0a0a0f]">
      <div className="container mx-auto px-[15px] md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h4 className="text-[#00a2ff] font-bold tracking-widest uppercase text-sm mb-3">Journey</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a2ff] to-[#007acc]">Experience</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A timeline of my professional journey and the companies I've had the pleasure of working with.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {experience.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-0`}
              >
                {/* Content Side */}
                <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <div className="bg-[#111219] border border-white/5 p-6 rounded-2xl hover:border-[#00a2ff]/30 transition-all group">
                    <div className="flex items-center gap-2 mb-2 text-[#00a2ff] text-sm font-medium justify-start md:justify-normal" style={{ justifyContent: idx % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                      <Calendar size={14} />
                      <span>{item.period}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{item.role}</h3>
                    <h4 className="text-gray-400 font-medium mb-4">{item.company}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Center Circle */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[#00a2ff] rounded-full transform -translate-x-1/2 border-4 border-[#0a0a0f] z-10 hidden md:block" />

                {/* Spacer for other side */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
