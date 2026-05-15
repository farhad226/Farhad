import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { supabase } from '../supabase';

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
        if (error) throw error;
        if (data && data.length > 0) {
          setServices(data);
        } else {
          // Fallback static data if empty
          setServices([
            { title: 'Loading...', description: 'Loading services from database...', icon: 'Loader' }
          ]);
        }
      } catch (error) {
        console.error("Error fetching services", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="text-[#00a2ff]" size={24} />;
    }
    return <Icons.Shield className="text-[#00a2ff]" size={24} />;
  };

  return (
    <section id="services" className="py-12 md:py-24 bg-[#0a0a0f]">
      <div className="container mx-auto px-4 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#00a2ff] uppercase tracking-wider font-semibold text-[10px] md:text-sm mb-3">What I Do</p>
          <h2 className="text-2xl md:text-5xl font-bold font-heading mb-4">Premium Services For You</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I help businesses grow by creating stunning, high-performing websites that stand out in the digital landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#13141c] border border-gray-800 rounded-2xl p-8 hover:bg-[#1a1c24] hover:border-gray-700 transition-all group"
            >
              <div className="w-14 h-14 bg-[#00a2ff]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00a2ff]/20 transition-colors">
                {renderIcon(service.icon)}
              </div>
              <h3 className="text-[15px] md:text-xl font-semibold mb-4 text-white line-clamp-2">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
