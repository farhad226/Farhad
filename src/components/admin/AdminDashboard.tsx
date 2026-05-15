import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import PortfolioAdmin from './PortfolioAdmin';
import SkillsAdmin from './SkillsAdmin';
import ServicesAdmin from './ServicesAdmin';
import ContactAdmin from './ContactAdmin';
import AnalyticsAdmin from './AnalyticsAdmin';
import { LogOut, Home, Briefcase, Code, Settings, MessageSquare, BarChart2 } from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('analytics');
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      } else {
        navigate('/admin/login');
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        navigate('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-[#13141c] border-r border-gray-800 p-6 flex flex-col">
        <h2 className="text-2xl font-bold font-heading mb-8">Admin Dashboard</h2>
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'analytics' ? 'bg-[#00a2ff] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <BarChart2 size={18} /> Analytics
          </button>
          <button 
            onClick={() => setActiveTab('portfolio')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'portfolio' ? 'bg-[#00a2ff] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Briefcase size={18} /> Portfolio Items
          </button>
          <button 
            onClick={() => setActiveTab('skills')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'skills' ? 'bg-[#00a2ff] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Code size={18} /> Skills
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'services' ? 'bg-[#00a2ff] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Settings size={18} /> Services
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'contact' ? 'bg-[#00a2ff] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <MessageSquare size={18} /> Contact Info
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Home size={18} /> Back to Site
          </button>
        </nav>
        <div className="mt-auto border-t border-gray-800 pt-6">
          <p className="text-xs text-gray-500 mb-4 truncate">{user.email}</p>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>
      
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {activeTab === 'analytics' && <AnalyticsAdmin />}
        {activeTab === 'portfolio' && <PortfolioAdmin />}
        {activeTab === 'skills' && <SkillsAdmin />}
        {activeTab === 'services' && <ServicesAdmin />}
        {activeTab === 'contact' && <ContactAdmin />}
      </main>
    </div>
  );
}
