import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { Plus, Trash2, Edit2, X, Check, Briefcase } from 'lucide-react';

export default function ExperienceAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<{id?: string, company: string, company_url?: string, role: string, period: string, description: string}>({ 
    company: '', company_url: '', role: '', period: '', description: '' 
  });

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('experience').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching experience", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const itemToSave = {
        company: currentItem.company,
        company_url: currentItem.company_url,
        role: currentItem.role,
        period: currentItem.period,
        description: currentItem.description
      };

      if (currentItem.id) {
        const { error } = await supabase.from('experience').update(itemToSave).eq('id', currentItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('experience').insert([{
          ...itemToSave,
          created_at: Date.now()
        }]);
        if (error) throw error;
      }
      setIsEditing(false);
      setCurrentItem({ company: '', company_url: '', role: '', period: '', description: '' });
      fetchExperience();
    } catch (error: any) {
      console.error("Error saving experience", error);
      if (error?.message?.includes('column "company_url" does not exist')) {
        alert("Error: Database needs update. Please run the provided SQL in your Supabase SQL Editor to add the 'company_url' column.");
      } else {
        alert("Error saving: " + (error?.message || "Unknown error"));
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const { error } = await supabase.from('experience').delete().eq('id', id);
      if (error) throw error;
      fetchExperience();
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  const startEdit = (item: any) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  if (loading) return <div className="text-white">Loading experience...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Briefcase size={20} className="text-[#00a2ff]" /> Manage Experience
        </h3>
        <button 
          onClick={() => { setIsEditing(true); setCurrentItem({ company: '', role: '', period: '', description: '' }); }}
          className="bg-[#00a2ff] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0081cc] transition-colors"
        >
          <Plus size={18} /> Add Experience
        </button>
      </div>

      {isEditing && (
        <div className="bg-[#15161e] border border-gray-800 p-6 rounded-xl shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-semibold text-white">{currentItem.id ? 'Edit' : 'Add New'} Experience</h4>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
                <input 
                  required 
                  type="text" 
                  value={currentItem.company} 
                  onChange={e => setCurrentItem({...currentItem, company: e.target.value})} 
                  className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff]"
                  placeholder="e.g. Google"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Company Website (URL)</label>
                <input 
                  type="url" 
                  value={currentItem.company_url || ''} 
                  onChange={e => setCurrentItem({...currentItem, company_url: e.target.value})} 
                  className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff]"
                  placeholder="https://company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Role / Job Title</label>
                <input 
                  required 
                  type="text" 
                  value={currentItem.role} 
                  onChange={e => setCurrentItem({...currentItem, role: e.target.value})} 
                  className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff]"
                  placeholder="e.g. Senior WordPress Developer"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Period (Date Range)</label>
              <input 
                required 
                type="text" 
                value={currentItem.period} 
                onChange={e => setCurrentItem({...currentItem, period: e.target.value})} 
                className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff]"
                placeholder="e.g. 2021 - Present"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea 
                required 
                rows={4}
                value={currentItem.description} 
                onChange={e => setCurrentItem({...currentItem, description: e.target.value})} 
                className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff]"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
            <button type="submit" className="w-full bg-[#00a2ff] text-white font-bold py-3 rounded-lg hover:bg-[#0081cc] transition-colors flex items-center justify-center gap-2">
              <Check size={18} /> Save Experience
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-[#15161e] border border-gray-800 p-6 rounded-xl group hover:border-[#00a2ff]/30 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-white font-bold text-base">{item.role}</h4>
                <p className="text-[#00a2ff] font-medium">{item.company}</p>
                <p className="text-gray-500 text-sm mb-4">{item.period}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(item)} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && !isEditing && (
          <div className="text-center py-12 bg-[#15161e] rounded-xl border border-dashed border-gray-800">
            <p className="text-gray-500">No experience items added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
