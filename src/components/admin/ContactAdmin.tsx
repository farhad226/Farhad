import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { Mail, Phone, MapPin, Trash2, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function ContactAdmin() {
  const [info, setInfo] = useState({ email: '', phone: '', location: '', resume_url: '' });
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'info' | 'messages'>('messages');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `resume_${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('uploads').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);
      setInfo(prev => ({ ...prev, resume_url: data.publicUrl }));
      setMessage('Resume uploaded. Remember to click Save Details below.');
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Make sure 'uploads' bucket exists in your Supabase storage.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchContact();
    fetchMessages();
  }, []);

  const fetchContact = async () => {
    try {
      const { data, error } = await supabase.from('site_info').select('*').eq('id', 'contact').single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setInfo({
          email: data.email || 'farhadhossain6920@gmail.com',
          phone: data.phone || '01604118643',
          location: data.location || 'Dhaka, Bangladesh',
          resume_url: data.resume_url || ''
        });
      }
    } catch (error) {
      console.error("Error fetching contact info", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

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
        resume_url: info.resume_url,
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

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      const { error } = await supabase.from('messages').delete().eq('id', id);
      if (error) throw error;
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message", error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase.from('messages').update({ is_read: true }).eq('id', id);
      if (error) throw error;
      fetchMessages();
    } catch (error) {
      console.error("Error updating message", error);
    }
  };

  if (loading) return <div className="text-white">Loading contact data...</div>;

  return (
    <div className="space-y-8">
      <div className="flex gap-4 border-b border-gray-800">
        <button 
          onClick={() => setActiveTab('messages')}
          className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'messages' ? 'text-[#00a2ff]' : 'text-gray-400 hover:text-white'}`}
        >
          Received Messages
          {activeTab === 'messages' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00a2ff]" />}
          {messages.filter(m => !m.is_read).length > 0 && (
            <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {messages.filter(m => !m.is_read).length}
            </span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('info')}
          className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'info' ? 'text-[#00a2ff]' : 'text-gray-400 hover:text-white'}`}
        >
          Contact Info
          {activeTab === 'info' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00a2ff]" />}
        </button>
      </div>

      {activeTab === 'info' ? (
        <form onSubmit={handleSave} className="bg-[#13141c] border border-gray-800 p-6 rounded-xl space-y-4 max-w-2xl">
          {message && <div className="bg-[#1c1d27] border border-[#00a2ff]/30 text-[#00a2ff] p-3 rounded-lg text-sm">{message}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email (Visible on site & used for notifications)</label>
            <input required type="email" value={info.email} onChange={e => setInfo({...info, email: e.target.value})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
            <input required type="text" value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
            <input required type="text" value={info.location} onChange={e => setInfo({...info, location: e.target.value})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Resume Link</label>
            <input type="url" placeholder="https://..." value={info.resume_url} onChange={e => setInfo({...info, resume_url: e.target.value})} className="w-full bg-[#1c1d27] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00a2ff]" />
          </div>
          <div className="pt-4">
            <button disabled={saving || uploading} type="submit" className="bg-[#00a2ff] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0081cc] disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Details'}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12 bg-[#13141c] rounded-xl border border-dashed border-gray-800">
              <p className="text-gray-500">No messages received yet.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`bg-[#13141c] border p-6 rounded-xl transition-all ${msg.is_read ? 'border-gray-800 opacity-80' : 'border-[#00a2ff]/40 shadow-[0_0_15px_rgba(0,162,255,0.05)]'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-white font-bold text-lg flex items-center gap-2">
                      {msg.name}
                      {!msg.is_read && <span className="bg-[#00a2ff] w-2 h-2 rounded-full animate-pulse" />}
                    </h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <a href={`mailto:${msg.email}`} className="text-[#00a2ff] text-sm hover:underline flex items-center gap-1">
                        <Mail size={12} /> {msg.email}
                      </a>
                      {msg.phone && (
                        <span className="text-gray-400 text-sm flex items-center gap-1">
                          <Phone size={12} /> {msg.phone}
                        </span>
                      )}
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <Clock size={12} /> {format(new Date(msg.created_at), 'PPPp')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!msg.is_read && (
                      <button 
                        onClick={() => markAsRead(msg.id)}
                        className="p-2 bg-[#00a2ff]/10 text-[#00a2ff] rounded-lg hover:bg-[#00a2ff] hover:text-white transition-all"
                        title="Mark as read"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteMessage(msg.id)}
                      className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="bg-[#1c1d27] p-4 rounded-lg border border-gray-800">
                  <p className="text-gray-400 text-sm font-semibold mb-2">Subject: {msg.subject || 'No Subject'}</p>
                  <p className="text-white text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
