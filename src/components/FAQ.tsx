import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How much does a custom WordPress website cost?",
    answer: "Pricing varies based on project complexity, number of pages, and specific features. I offer competitive rates starting from basic setups to enterprise-level solutions. Contact me for a personalized quote."
  },
  {
    question: "How long does a typical project take to complete?",
    answer: "A standard business website usually takes 2-4 weeks from start to finish. E-commerce platforms and highly customized sites may take 6-12 weeks depending on the requirements."
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes, I offer ongoing maintenance packages that include security updates, regular backups, performance optimization, and content updates to ensure your site runs smoothly."
  },
  {
    question: "Can you customize an existing Elementor or WordPress theme?",
    answer: "Absolutely. I can take your current theme and redesign it, add new features, optimize its performance, and restructure the layout to better align with your current brand goals."
  },
  {
    question: "What do I need to provide to start the project?",
    answer: "To get started, I typically need your logo, branding guidelines, content (text and images) for the pages, and examples of websites you like to understand your preferred aesthetic."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-24 bg-[#0a0a0f]">
      <div className="container mx-auto px-4 md:px-12 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#00a2ff] uppercase tracking-wider font-semibold text-[10px] md:text-sm mb-3">Common Questions</p>
          <h2 className="text-[22px] md:text-5xl font-bold font-heading">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index} 
              className="bg-[#13141c] border border-gray-800 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left focus:outline-none"
              >
                <span className="font-semibold text-base md:text-lg pr-4 md:pr-8 leading-tight">{faq.question}</span>
                <ChevronDown 
                  className={`flex-shrink-0 text-[#00a2ff] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={18} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 md:p-6 pt-0 text-gray-400 text-sm md:text-base leading-relaxed border-t border-gray-800/50 mt-1 md:mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
