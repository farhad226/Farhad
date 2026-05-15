import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../supabase';

export default function Skills() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase.from('skills').select('*').order('created_at', { ascending: true });
        if (error) throw error;
        if (data && data.length > 0) {
          setSkills(data);
        } else {
          // Fallback static data if empty
          setSkills([
            { name: 'Loading Skills...', percentage: 50, icon: '' }
          ]);
        }
      } catch (error) {
        console.error("Error fetching skills", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-24 bg-[#0a0a0f]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#00a2ff] uppercase tracking-wider font-semibold text-sm mb-3">My Skills</p>
          <h2 className="text-3xl md:text-5xl font-bold font-heading max-w-2xl">
            Expertise in Modern Web Technologies
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 font-medium">
                  {skill.icon ? (
                    <img src={skill.icon} alt="" className="w-5 h-5 object-contain opacity-70" />
                  ) : null}
                  <span className="text-gray-200">{skill.name}</span>
                </div>
                <span className="text-[#00a2ff] font-semibold">{skill.percentage}%</span>
              </div>
              <div className="h-2 w-full bg-[#1c1d27] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                  className="h-full bg-gradient-to-r from-[#00a2ff]/60 to-[#00a2ff] rounded-full relative"
                >
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/20 blur-[2px] rounded-full"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
