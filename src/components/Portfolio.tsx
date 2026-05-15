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
                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/5] sm:aspect-square md:aspect-[4/5]"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle Base Overlay & Bottom Dark Gradient */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90"></div>
                </div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  {/* Top: Category Tag */}
                  <div className="w-full flex justify-end">
                    <div className="bg-[#00a2ff] text-white text-sm font-semibold px-4 py-1.5 shadow-md rounded-md">
                      {item.category}
                    </div>
                  </div>
                  
                  {/* Bottom: Text & Link */}
                  <div>
                    {/* Optional Date (mocked if not available) or subtitle */}
                    <div className="text-white/80 text-sm mb-2 font-medium">
                      Project
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-4 group-hover:text-[#00a2ff] transition-colors">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white/90 group-hover:text-white transition-colors flex items-center gap-2">
                          View details
                          <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/40 transition-colors backdrop-blur-sm">
                            <ArrowUpRight size={16} className="text-white" />
                          </span>
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-white/50 flex items-center gap-2">
                          Coming Soon
                        </span>
                      )}
                    </div>
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
