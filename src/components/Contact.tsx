import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '../supabase';

export default function Contact() {
  const [contactInfo, setContactInfo] = useState({
    email: 'farhadhossain6920@gmail.com',
    phone: '01604118643',
    location: 'Dhaka, Bangladesh'
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const { data, error } = await supabase.from('site_info').select('*').eq('id', 'contact').single();
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        if (data) {
          setContactInfo({
            email: data.email || 'farhadhossain6920@gmail.com',
            phone: data.phone || '01604118643',
            location: data.location || 'Dhaka, Bangladesh'
          });
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 1. Save to Supabase (Reliable storage backup)
      const { error: supabaseError } = await supabase.from('messages').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      }]);

      if (supabaseError) throw supabaseError;

      // 2. Send email via our Backend API
      const response = await fetch('/api/contact', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Backend email failed');
      }
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-[50px] md:py-24 bg-[#111219] relative overflow-hidden">
      {/* Decorative blurred background blob */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#00a2ff]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-[15px] md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Side: Info */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#00a2ff] uppercase tracking-wider font-semibold text-sm mb-3">Contact Me</p>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 leading-tight">
              Let's Create<br />
              Extraordinary Together
            </h2>
            <p className="text-gray-400 mb-12 max-w-md leading-relaxed">
              Ready to start your next project? Get in touch and let's discuss how we can bring your vision to life.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-gradient-to-br from-[#00a2ff]/20 to-transparent rounded-2xl flex items-center justify-center shrink-0 border border-[#00a2ff]/30 group-hover:border-[#00a2ff]/60 transition-colors shadow-[0_0_20px_rgba(0,162,255,0.1)]">
                  <Mail className="text-[#00a2ff]" size={24} />
                </div>
                <div className="pt-1">
                  <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-1">Email Me</p>
                  <p className="font-bold text-base md:text-lg text-white group-hover:text-[#00a2ff] transition-colors break-all">{contactInfo.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-gradient-to-br from-[#00a2ff]/20 to-transparent rounded-2xl flex items-center justify-center shrink-0 border border-[#00a2ff]/30 group-hover:border-[#00a2ff]/60 transition-colors shadow-[0_0_20px_rgba(0,162,255,0.1)]">
                  <Phone className="text-[#00a2ff]" size={24} />
                </div>
                <div className="pt-1">
                  <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-1">Call Me</p>
                  <p className="font-bold text-base md:text-lg text-white group-hover:text-[#00a2ff] transition-colors">{contactInfo.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-gradient-to-br from-[#00a2ff]/20 to-transparent rounded-2xl flex items-center justify-center shrink-0 border border-[#00a2ff]/30 group-hover:border-[#00a2ff]/60 transition-colors shadow-[0_0_20px_rgba(0,162,255,0.1)]">
                  <MapPin className="text-[#00a2ff]" size={24} />
                </div>
                <div className="pt-1">
                  <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-1">Location</p>
                  <p className="font-bold text-base md:text-lg text-white group-hover:text-[#00a2ff] transition-colors">{contactInfo.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-[#13141c]/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            {/* Subtle glow inside the form card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00a2ff]/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="relative group">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name" 
                    className="w-full bg-[#0a0a0f]/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00a2ff] focus:ring-2 focus:ring-[#00a2ff]/30 transition-all duration-300 hover:border-[#00a2ff]/50 shadow-inner group-hover:bg-[#0a0a0f]/70"
                  />
                </div>
                <div className="relative group">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your Email" 
                    className="w-full bg-[#0a0a0f]/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00a2ff] focus:ring-2 focus:ring-[#00a2ff]/30 transition-all duration-300 hover:border-[#00a2ff]/50 shadow-inner group-hover:bg-[#0a0a0f]/70"
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="relative group">
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Your Phone Number" 
                    className="w-full bg-[#0a0a0f]/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00a2ff] focus:ring-2 focus:ring-[#00a2ff]/30 transition-all duration-300 hover:border-[#00a2ff]/50 shadow-inner group-hover:bg-[#0a0a0f]/70"
                  />
                </div>
                <div className="relative group">
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Subject" 
                    className="w-full bg-[#0a0a0f]/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00a2ff] focus:ring-2 focus:ring-[#00a2ff]/30 transition-all duration-300 hover:border-[#00a2ff]/50 shadow-inner group-hover:bg-[#0a0a0f]/70"
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="How can I help you?" 
                  className="w-full bg-[#0a0a0f]/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00a2ff] focus:ring-2 focus:ring-[#00a2ff]/30 transition-all duration-300 hover:border-[#00a2ff]/50 shadow-inner resize-none group-hover:bg-[#0a0a0f]/70"
                ></textarea>
              </motion.div>

              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-center justify-center font-medium"
                >
                  Message sent successfully!
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center justify-center text-center font-medium"
                >
                  Failed to send message. Please try again later or contact me directly via email.
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={isSubmitting}
                  className="group relative w-full bg-gradient-to-r from-[#00a2ff] to-[#007acc] text-white py-4 rounded-xl font-bold text-lg overflow-hidden transition-all shadow-[0_4px_20px_rgba(0,162,255,0.3)] hover:shadow-[0_8px_30px_rgba(0,162,255,0.5)] disabled:opacity-70 disabled:cursor-not-allowed border border-transparent"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-300">
                    {isSubmitting ? 'Sending...' : 'Send Message'} 
                    <Send size={18} className={`transform transition-all duration-300 ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                  </span>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
