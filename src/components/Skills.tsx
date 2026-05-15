import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../supabase';

const SkillIcon = ({ name, url, className }: { name: string, url?: string | null, className?: string }) => {
  const [error, setError] = useState(false);
  const normalized = name.toLowerCase();

  // If a valid URL exists and hasn't errored out, use it
  if (url && !error) {
    return <img src={url} alt={name} className={className} onError={() => setError(true)} />;
  }

  // Fallback well-known icons
  if (normalized.includes('elementor')) {
    return (
      <svg className={className} viewBox="0 0 512 512" fill="#E6405D" xmlns="http://www.w3.org/2000/svg">
        <path d="M496 256c0 132.55-107.45 240-240 240S16 388.55 16 256 123.45 16 256 16s240 107.45 240 240zM212 164v184H164V164h48zm136 136H264v48h84v-48zm0-64H264v48h84v-48zm0-64H264v48h84v-48z"/>
      </svg>
    );
  }

  if (normalized.includes('html') || normalized.includes('css')) {
     return (
      <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path fill="#E34F26" d="M71,460 L30,4 L486,4 L445,460 L258,512 Z" />
        <path fill="#F06529" d="M258,472 L405,431 L440,37 L258,37 Z" />
        <path fill="#EBEBEB" d="M258,208 L181,208 L176,150 L258,150 L258,94 L113,94 L130,282 L258,282 Z M258,355 L258,414 L164,388 L158,322 L102,322 L112,435 L258,472 Z" />
        <path fill="#FFFFFF" d="M258,208 L258,282 L332,282 L326,355 L258,373 L258,414 L394,376 L404,262 L405,208 Z M258,94 L258,150 L410,150 L415,94 Z" />
      </svg>
     );
  }

  if (normalized.includes('wordpress')) {
    return (
      <svg className={className} viewBox="0 0 512 512" fill="#21759b" xmlns="http://www.w3.org/2000/svg">
        <path d="M482.4 256c0 125-101.4 226.4-226.4 226.4S29.6 381 29.6 256 131 29.6 256 29.6 482.4 131 482.4 256zm-17.6 0c0-67.4-31-127.4-78.5-167.5l-95.2 260.6c76-26.6 173.7-41 173.7-93.1zm-84-180.7C345 52.4 302 38.4 256 38.4c-83 0-155 46.5-195 116.5l94.8 261 125-340.6zM69.8 136C45.3 170.8 30.6 211.8 30.6 256c0 74 38 139.3 95.8 177.3L69.8 136zm148.5 316.5c12.2 1.6 24.8 2.5 37.7 2.5 45.6 0 88.5-12.8 125.7-35L296.8 214c11.6-4.6 25.4-8 30-19 3-7 .8-16-6-20s-16-5-19-15c-1-3-4-5-8-5h-86c-4 0-7 2-8 5-3 10-12 11-19 15s-9 13-6 20c4.6 11 18.4 14.4 30 19L218.3 452.5z"/>
      </svg>
    )
  }

  return (
    <div className={`bg-gray-800 rounded flex items-center justify-center text-xs font-bold text-gray-300 ${className}`}>
      {name.substring(0, 2).toUpperCase()}
    </div>
  );
};

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
    <section id="skills" className="py-12 md:py-24 bg-[#0a0a0f]">
      <div className="container mx-auto px-4 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#00a2ff] uppercase tracking-wider font-semibold text-[10px] md:text-sm mb-3">My Skills</p>
          <h2 className="text-2xl md:text-5xl font-bold font-heading max-w-2xl">
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
                  <SkillIcon name={skill.name} url={skill.icon} className="w-5 h-5 object-contain" />
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
