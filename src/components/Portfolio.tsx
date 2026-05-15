import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { supabase } from '../supabase';

const staticItems = [
  {
    id: '1',
    title: 'Modern Laboratory Website',
    category: 'WordPress',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Creative Agency Portfolio',
    category: 'Custom',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Luxury Real Estate Platform',
    category: 'WordPress',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Financial Dashboard App',
    category: 'Custom',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Minimalist Workspace Blog',
    category: 'WordPress',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'E-commerce Store Setup',
    category: 'Custom',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop'
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [portfolioItems, setPortfolioItems] = useState<any[]>(staticItems);
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase.from('portfolio_items').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) {
          setPortfolioItems(data);
        }
      } catch (error) {
        console.error("Error fetching portfolio items", error);
      }
    };
    fetchItems();
  }, []);

  const filters = ['All', 'WordPress', 'Custom'];

  const filteredItems = filter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-[#111219]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#00a2ff] uppercase tracking-wider font-semibold text-sm mb-3">Latest Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-8">Turning Ideas Into Digital Reality</h2>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f 
                    ? 'bg-[#00a2ff] text-white' 
                    : 'bg-[#1c1d27] text-gray-400 hover:text-white hover:bg-[#252736]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: false, amount: 0.1 }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative bg-[#1c1d27]/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:bg-[#1c1d27]/80 hover:border-[#00a2ff]/30 transition-all duration-500 cursor-pointer flex flex-col"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#00a2ff]/0 to-[#00a2ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10 blur-xl"></div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl border-b border-white/5">
                   <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0a0a0f]/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                
                <div className="p-6 md:p-8 relative flex-grow flex flex-col justify-between">
                  <div>
                    <div className="bg-white/5 text-gray-300 text-xs font-semibold rounded-full px-4 py-1.5 uppercase tracking-wider w-max mb-4 border border-white/10 group-hover:border-[#00a2ff]/30 group-hover:text-[#00a2ff] transition-colors">
                      {item.category}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00a2ff] transition-colors leading-tight mb-3">
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors flex items-center gap-2">
                        View Project
                        <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#00a2ff] transition-colors">
                          <ArrowUpRight size={16} className="text-white" />
                        </span>
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
