import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const staticSkills = [
  { name: 'WordPress', percentage: 95, icon: 'https://cdn.iconscout.com/icon/free/png-256/free-wordpress-3521775-2945239.png' },
  { name: 'Elementor', percentage: 98, icon: 'https://elementor.com/app/uploads/2021/01/Elementor-Logo-Symbol-Red.png' },
  { name: 'JavaScript', percentage: 85, icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' },
  { name: 'HTML & CSS', percentage: 98, icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png' },
  { name: 'PHP', percentage: 75, icon: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg' },
  { name: 'Python', percentage: 70, icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
];

export default function SkillsAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<{id?: string, name: string, percentage: number, icon: string}>({ name: '', percentage: 80, icon: '' });

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase.from('skills').select('*').order('created_at', { ascending: true });
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentItem.id) {
        const { error } = await supabase.from('skills').update({
          name: currentItem.name,
          percentage: Number(currentItem.percentage),
          icon: currentItem.icon
        }).eq('id', currentItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('skills').insert([{
          name: currentItem.name,
          percentage: Number(currentItem.percentage),
          icon: currentItem.icon,
          created_at: Date.now()
        }]);
        if (error) throw error;
      }
      setIsEditing(false);
      setCurrentItem({ name: '', percentage: 80, icon: '' });
      fetchItems();
    } catch (error) {
      console.error("Error saving specific skill", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this specific skill?')) {
      try {
        const { error } = await supabase.from('skills').delete().eq('id', id);
        if (error) throw error;
        fetchItems();
      } catch (error) {
        console.error("Error deleting specific skill", error);
      }
    }
  };

  const startEdit = (item: any) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const seedData = async () => {
    try {
      setLoading(true);
      const itemsToInsert = staticSkills.map(item => ({
        ...item,
        created_at: Date.now()
      }));
      const { error } = await supabase.from('skills').insert(itemsToInsert);
      if (error) throw error;

      alert('Skills seeded successfully!');
      fetchItems();
    } catch (error) {
      console.error("Error seeding skills", error);
      alert('Failed to seed skills.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold">Skills</h3>
        <div className="flex gap-3">
          {items.length === 0 && (
            <button 
              onClick={seedData}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Load Default Data
            </button>
          )}
          {!isEditing && (
            <button 
              onClick={() => { setCurrentItem({ name: '', percentage: 80, icon: '' }); setIsEditing(true); }}
              className="bg-[#00a2ff] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0081cc] transition-colors flex items-center gap-2"
            >
              <Plus size={16} /> Add New Skill
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="bg-[#13141c] border border-gray-800 p-6 rounded-xl space-y-4 max-w-2xl">
          <h4 className="text-lg font-medium border-b border-gray-800 pb-2 mb-4">{currentItem.id ? 'Edit Skill' : 'New Skill'}</h4>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
            <input required type="text" value={currentItem.name} onChange={e => setCurrentItem({...currentItem, name: e.target.value})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff]" placeholder="e.g. React" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Percentage (0-100)</label>
            <input required type="number" min="0" max="100" value={currentItem.percentage} onChange={e => setCurrentItem({...currentItem, percentage: Number(e.target.value)})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Icon URL</label>
            <input required type="url" value={currentItem.icon} onChange={e => setCurrentItem({...currentItem, icon: e.target.value})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff]" placeholder="e.g. https://..." />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="bg-[#00a2ff] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0081cc]">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="border border-gray-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? <p>Loading skills...</p> : items.length === 0 ? <p className="text-gray-500">No skills found. Add some!</p> : items.map(item => (
            <div key={item.id} className="bg-[#13141c] border border-gray-800 rounded-xl p-5 group relative">
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(item)} className="p-2 bg-[#1c1d27] rounded-lg text-white hover:bg-[#00a2ff]"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-[#1c1d27] rounded-lg text-white hover:bg-red-500"><Trash2 size={16} /></button>
              </div>
              <div className="flex items-center gap-4 mb-4 mt-2">
                <div className="w-12 h-12 rounded-xl bg-[#1c1d27] flex items-center justify-center p-2">
                  <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <h4 className="text-lg font-semibold">{item.name}</h4>
              </div>
              <div className="w-full bg-[#1c1d27] rounded-full h-2">
                <div className="bg-[#00a2ff] h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
              </div>
              <p className="text-right text-sm text-[#00a2ff] mt-1 font-medium">{item.percentage}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
