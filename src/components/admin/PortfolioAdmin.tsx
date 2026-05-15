import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const staticItems = [
  {
    title: 'Modern Laboratory Website',
    category: 'WordPress',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Creative Agency Portfolio',
    category: 'Custom',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Luxury Real Estate Platform',
    category: 'WordPress',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Financial Dashboard App',
    category: 'Custom',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Minimalist Workspace Blog',
    category: 'WordPress',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'E-commerce Store Setup',
    category: 'Custom',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop'
  }
];

export default function PortfolioAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<{id?: string, title: string, category: string, image: string}>({ title: '', category: 'WordPress', image: '' });

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase.from('portfolio_items').select('*').order('created_at', { ascending: true });
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
        const { error } = await supabase.from('portfolio_items').update({
          title: currentItem.title,
          category: currentItem.category,
          image: currentItem.image
        }).eq('id', currentItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('portfolio_items').insert([{
          title: currentItem.title,
          category: currentItem.category,
          image: currentItem.image,
          created_at: Date.now()
        }]);
        if (error) throw error;
      }
      setIsEditing(false);
      setCurrentItem({ title: '', category: 'WordPress', image: '' });
      fetchItems();
    } catch (error) {
      console.error("Error saving specific portfolio item", error);
      alert('Error saving. Have you ran the Supabase SQL setup script?');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this specific portfolio item?')) {
      try {
        const { error } = await supabase.from('portfolio_items').delete().eq('id', id);
        if (error) throw error;
        fetchItems();
      } catch (error) {
        console.error("Error deleting specific portfolio item", error);
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
      const itemsToInsert = staticItems.map(item => ({
        ...item,
        created_at: Date.now()
      }));
      const { error } = await supabase.from('portfolio_items').insert(itemsToInsert);
      if (error) throw error;
      
      alert('Portfolio items seeded successfully!');
      fetchItems();
    } catch (error) {
      console.error("Error seeding portfolio items", error);
      alert('Failed to seed items. Did you run the SQL setup script?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold">Portfolio Items</h3>
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
              onClick={() => { setCurrentItem({ title: '', category: 'WordPress', image: '' }); setIsEditing(true); }}
              className="bg-[#00a2ff] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0081cc] transition-colors flex items-center gap-2"
            >
              <Plus size={16} /> Add New Item
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="bg-[#13141c] border border-gray-800 p-6 rounded-xl space-y-4 max-w-2xl">
          <h4 className="text-lg font-medium border-b border-gray-800 pb-2 mb-4">{currentItem.id ? 'Edit Item' : 'New Item'}</h4>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input required type="text" value={currentItem.title} onChange={e => setCurrentItem({...currentItem, title: e.target.value})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
            <select required value={currentItem.category} onChange={e => setCurrentItem({...currentItem, category: e.target.value})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff]">
              <option value="WordPress">WordPress</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
            <input required type="url" value={currentItem.image} onChange={e => setCurrentItem({...currentItem, image: e.target.value})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff]" />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="bg-[#00a2ff] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0081cc]">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="border border-gray-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? <p>Loading portfolio...</p> : items.length === 0 ? <p className="text-gray-500">No items found. Add some!</p> : items.map(item => (
            <div key={item.id} className="bg-[#13141c] border border-gray-800 rounded-xl overflow-hidden group">
              <div className="aspect-video relative overflow-hidden bg-[#1c1d27]">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEdit(item)} className="p-2 bg-black/60 rounded-lg text-white hover:bg-[#00a2ff]"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 bg-black/60 rounded-lg text-white hover:bg-red-500"><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="p-5">
                <span className="text-[#00a2ff] text-xs font-semibold uppercase tracking-wider">{item.category}</span>
                <h4 className="text-lg font-semibold mt-1">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
