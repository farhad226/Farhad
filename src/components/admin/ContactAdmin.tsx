import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

export default function ContactAdmin() {
  const [info, setInfo] = useState({ email: '', phone: '', location: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data, error } = await supabase.from('site_info').select('*').eq('id', 'contact').single();
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        if (data) {
          setInfo({
            email: data.email || 'farhadhossain6920@gmail.com',
            phone: data.phone || '01604118643',
            location: data.location || 'Dhaka, Bangladesh'
          });
        } else {
          setInfo({
            email: 'farhadhossain6920@gmail.com',
            phone: '01604118643',
            location: 'Dhaka, Bangladesh'
          });
        }
      } catch (error) {
        console.error("Error fetching contact info", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const { error } = await supabase.from('site_info').upsert({
        id: 'contact',
        email: info.email,
        phone: info.phone,
        location: info.location,
        updated_at: Date.now()
      });
      if (error) throw error;
      setMessage('Successfully saved contact info.');
    } catch (error) {
      console.error("Error saving contact info", error);
      setMessage('Error saving.');
    }
    setSaving(false);
  };

  if (loading) return <p>Loading contact info...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold">Contact Info</h3>
      </div>

      <form onSubmit={handleSave} className="bg-[#13141c] border border-gray-800 p-6 rounded-xl space-y-4 max-w-2xl">
        {message && <div className="bg-[#1c1d27] border border-[#00a2ff]/30 text-[#00a2ff] p-3 rounded-lg text-sm">{message}</div>}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
          <input required type="email" value={info.email} onChange={e => setInfo({...info, email: e.target.value})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
          <input required type="text" value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
          <input required type="text" value={info.location} onChange={e => setInfo({...info, location: e.target.value})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff]" />
        </div>
        <div className="pt-4">
          <button disabled={saving} type="submit" className="bg-[#00a2ff] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0081cc] disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Details'}
          </button>
        </div>
      </form>
    </div>
  );
}
