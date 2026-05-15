import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronDown } from 'lucide-react';

const baseTestimonials = [
  {
    name: "James Wilson",
    role: "CEO at TechFlow",
    content: "Farhad is an exceptional WordPress developer. He transformed our slow site into a lightning-fast marketing machine. Highly recommended!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  {
    name: "Sarah Jenkins",
    role: "Marketing Director",
    content: "Professional, timely, and very skilled. He understood our complex requirements perfectly and delivered ahead of schedule.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=2"
  },
  {
    name: "Robert Chen",
    role: "E-commerce Owner",
    content: "The best experience I've had with a freelancer. His attention to detail in WooCommerce setup is unmatched.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=3"
  },
  {
    name: "Emma Davis",
    role: "Blogger",
    content: "My blog looks amazing now! Farhad fixed all the mobile responsiveness issues that were bothering me for months.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=4"
  },
  {
    name: "Michael Brown",
    role: "Startup Founder",
    content: "Incredible technical skills. He built a custom plugin for us that works flawlessly. A true WordPress expert.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=5"
  },
  {
    name: "Linda Thompson",
    role: "Real Estate Agent",
    content: "Very patient and helpful. He explained everything clearly and made sure I was comfortable managing the site myself.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=6"
  },
  {
    name: "David Miller",
    role: "Creative Director",
    content: "Design-wise, he is brilliant. The UI/UX improvements he suggested made a huge difference in our conversion rates.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=7"
  },
  {
    name: "Lisa Garcia",
    role: "Non-profit Manager",
    content: "Excellent communication throughout the project. He is my go-to guy for anything related to WordPress now.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=8"
  },
  {
    name: "Kevin Lee",
    role: "SaaS Dev",
    content: "Clean code and great performance optimization. Our PageSpeed score went from 40 to 95+ after his work.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=9"
  },
  {
    name: "Susan White",
    role: "Event Planner",
    content: "Reliable and honest. He doesn't just do what you ask; he does what is best for your business success.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=10"
  },
  {
    name: "Alex Reed",
    role: "Photographer",
    content: "Beautiful portfolio site! It represents my brand perfectly. The animations are smooth and modern.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=11"
  },
  {
    name: "Maria Jones",
    role: "Store Manager",
    content: "He managed our site migration perfectly with zero downtime. Saved us a lot of potential stress.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=12"
  },
  {
    name: "Thomas Wright",
    role: "App Developer",
    content: "Great team player. He integrated our API with the WordPress front-end seamlessly. Very impressive work.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=13"
  },
  {
    name: "Jessica Hall",
    role: "Life Coach",
    content: "The booking system he implemented is a lifesaver. My clients find it extremely easy to use.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=14"
  },
  {
    name: "William Turner",
    role: "Small Business Owner",
    content: "Top-notch SEO optimization. My site is finally starting to rank on the first page of Google.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=15"
  },
  {
    name: "Nancy Adams",
    role: "Writer",
    content: "He handled my security issues quickly and professionally. I feel much safer with his maintenance plan.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=16"
  },
  {
    name: "George Harris",
    role: "Cafe Owner",
    content: "Simple, elegant, and functional. Exactly what I needed for my local business website. Great job!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=17"
  },
  {
    name: "Karen Clark",
    role: "Fashion Designer",
    content: "His eye for aesthetics is wonderful. The site looks high-end and premium. Exceeded my expectations.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=18"
  },
  {
    name: "Steven Lewis",
    role: "Tech Journalist",
    content: "Fast turnaround and high quality. He is one of the few developers who actually follows documentation.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=19"
  },
  {
    name: "Patricia Young",
    role: "Bakery Owner",
    content: "Friendly and professional. He made the whole process easy for someone like me who isn't tech-savvy.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=20"
  }
];

// Generate additional testimonials to reach 100+
const firstNames = ["Liam", "Noah", "Oliver", "James", "Elijah", "William", "Henry", "Lucas", "Benjamin", "Theodore", "Mateo", "Levi", "Sebastian", "Daniel", "Jack", "Wyatt", "Alexander", "Owen", "Asher", "Samuel"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
const roles = ["Software Engineer", "Project Manager", "UX Designer", "Marketing Executive", "Business Analyst", "Content Specialist", "HR Manager", "E-commerce Specialist", "Graphic Designer", "Systems Admin"];
const reviewTemplates = [
  "Absolutely amazing work! The website is fast and looks great.",
  "Highly skilled and professional. Delivered exactly what I needed.",
  "A pleasure to work with. He really knows WordPress inside out.",
  "Great communication and very timely delivery. Five stars!",
  "Transformed our digital presence. Incredible attention to detail.",
  "The best developer I've worked with. Highly recommended for any project.",
  "Exceeded all expectations. The custom features are perfect.",
  "Fast, reliable, and very knowledgeable. Will hire again!",
  "Solved complex issues with ease. A true expert in his field.",
  "Wonderful experience from start to finish. Professional and helpful."
];

const generatedTestimonials = Array.from({ length: 85 }, (_, i) => {
  const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const role = roles[Math.floor(Math.random() * roles.length)];
  const content = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
  
  return {
    name: `${fName} ${lName}`,
    role: `${role}`,
    content: content,
    rating: 5,
    avatar: `https://i.pravatar.cc/150?u=${i + 30}`
  };
});

const testimonials = [...baseTestimonials, ...generatedTestimonials];


export default function Testimonials() {
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 2 : 8;
    }
    return 8;
  });

  // Handle window resize to maintain responsiveness
  React.useEffect(() => {
    const handleResize = () => {
      // Only adjust if the current count matches one of our defaults, 
      // suggesting the user hasn't manually expanded it yet.
      if (visibleCount === 2 || visibleCount === 8) {
        if (window.innerWidth < 768) {
          setVisibleCount(2);
        } else {
          setVisibleCount(8);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [visibleCount]);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, testimonials.length));
  };

  const visibleTestimonials = testimonials.slice(0, visibleCount);

  return (
    <section id="testimonials" className="py-12 md:py-24 relative overflow-hidden bg-[#0a0a0f]">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00a2ff]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#00a2ff] font-bold tracking-widest uppercase text-[10px] md:text-sm mb-3"
          >
            Testimonials
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[22px] md:text-5xl font-bold text-white mb-6"
          >
            What My Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a2ff] to-[#007acc]">Say</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            I've helped hundreds of clients worldwide build their dream websites. 
            Here are some of their experiences working with me.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleTestimonials.map((item, idx) => (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="bg-[#0f0f17] border border-white/5 rounded-2xl p-6 hover:border-[#00a2ff]/30 transition-all group relative flex flex-col h-full"
              >
                <Quote className="absolute top-4 right-4 text-[#00a2ff]/10 group-hover:text-[#00a2ff]/20 transition-colors" size={40} />
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#00a2ff] text-[#00a2ff]" />
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic flex-grow">
                  "{item.content}"
                </p>

                <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                  <img 
                    src={item.avatar} 
                    alt={item.name} 
                    className="w-10 h-10 rounded-full border border-white/10"
                  />
                  <div>
                    <h5 className="text-white font-semibold text-sm">{item.name}</h5>
                    <p className="text-gray-500 text-xs">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibleCount < testimonials.length && (
          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMore}
              className="group relative px-8 py-3 bg-[#0a0a0f] border border-[#00a2ff]/30 rounded-full text-white font-bold transition-all hover:border-[#00a2ff] hover:shadow-[0_0_20px_rgba(0,162,255,0.2)] flex items-center gap-2 mx-auto"
            >
              <span>Load More Reviews</span>
              <ChevronDown className="group-hover:translate-y-1 transition-transform" size={18} />
            </motion.button>
            <p className="mt-4 text-gray-500 text-xs">
              Showing {visibleCount} of {testimonials.length} reviews
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
