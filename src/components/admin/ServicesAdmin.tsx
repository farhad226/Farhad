import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const staticServices = [
  {
    icon: 'Layout',
    title: "Custom WordPress Website Development",
    description: "Professional WordPress website development from scratch. Custom designs tailored to business requirements that reflect a unique brand identity."
  },
  {
    icon: 'Globe',
    title: "Elementor Page Building & Customization",
    description: "Creating stunning pages with drag-and-drop builders. Custom Elementor widgets and templates with responsive, pixel-perfect designs."
  },
  {
    icon: 'ShoppingCart',
    title: "WordPress E-commerce Solutions (WooCommerce)",
    description: "Complete online store setup. Product management system. Payment gateway integration. Shopping cart optimization."
  },
  {
    icon: 'Monitor',
    title: "Website Redesign & Modernization",
    description: "Giving outdated websites a modern look with UI/UX improvements, speed and performance upgrades, and mobile-friendly conversion."
  },
  {
    icon: 'Settings',
    title: "WordPress Maintenance & Support",
    description: "Regular updates and backups. Security monitoring, Bug fixes and troubleshooting. 24/7 technical support."
  },
  {
    icon: 'Mail',
    title: "Business Website Package Solutions",
    description: "Complete business website setup. Contact forms and lead capture. Google Maps integration. Business email setup."
  }
];

export default function ServicesAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<{id?: string, title: string, description: string, icon: string}>({ title: '', description: '', icon: 'Code' });

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
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
        const { error } = await supabase.from('services').update({
          title: currentItem.title,
          description: currentItem.description,
          icon: currentItem.icon
        }).eq('id', currentItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('services').insert([{
          title: currentItem.title,
          description: currentItem.description,
          icon: currentItem.icon,
          created_at: Date.now()
        }]);
        if (error) throw error;
      }
      setIsEditing(false);
      setCurrentItem({ title: '', description: '', icon: 'Code' });
      fetchItems();
    } catch (error) {
      console.error("Error saving specific service", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this specific service?')) {
      try {
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (error) throw error;
        fetchItems();
      } catch (error) {
        console.error("Error deleting specific service", error);
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
      const itemsToInsert = staticServices.map(item => ({
        ...item,
        created_at: Date.now()
      }));
      const { error } = await supabase.from('services').insert(itemsToInsert);
      if (error) throw error;
      
      alert('Services seeded successfully!');
      fetchItems();
    } catch (error) {
      console.error("Error seeding services", error);
      alert('Failed to seed services.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold">Services</h3>
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
              onClick={() => { setCurrentItem({ title: '', description: '', icon: 'Code' }); setIsEditing(true); }}
              className="bg-[#00a2ff] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0081cc] transition-colors flex items-center gap-2"
            >
              <Plus size={16} /> Add New Service
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="bg-[#13141c] border border-gray-800 p-6 rounded-xl space-y-4 max-w-2xl">
          <h4 className="text-lg font-medium border-b border-gray-800 pb-2 mb-4">{currentItem.id ? 'Edit Service' : 'New Service'}</h4>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input required type="text" value={currentItem.title} onChange={e => setCurrentItem({...currentItem, title: e.target.value})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff]" placeholder="e.g. Web Development" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea required rows={4} value={currentItem.description} onChange={e => setCurrentItem({...currentItem, description: e.target.value})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff] resize-none" placeholder="Description of the service..."></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Icon Name (Lucide React)</label>
            <input required type="text" value={currentItem.icon} onChange={e => setCurrentItem({...currentItem, icon: e.target.value})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff]" placeholder="e.g. Code, Palette, Server, Search" />
            <p className="text-xs text-gray-500 mt-1">Must be a valid Lucide React icon name (e.g. Code, Monitor, Server)</p>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="bg-[#00a2ff] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0081cc]">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="border border-gray-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? <p>Loading services...</p> : items.length === 0 ? <p className="text-gray-500">No services found. Add some!</p> : items.map(item => (
            <div key={item.id} className="bg-[#13141c] border border-gray-800 rounded-xl p-6 group relative">
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(item)} className="p-2 bg-[#1c1d27] rounded-lg text-white hover:bg-[#00a2ff]"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-[#1c1d27] rounded-lg text-white hover:bg-red-500"><Trash2 size={16} /></button>
              </div>
              <div className="w-14 h-14 bg-[#1c1d27] rounded-xl flex items-center justify-center border border-gray-800 text-[#00a2ff] mb-6">
                <span className="text-xs">{item.icon}</span>
              </div>
              <h4 className="text-xl font-bold mb-3">{item.title}</h4>
              <p className="text-gray-400 line-clamp-3">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
