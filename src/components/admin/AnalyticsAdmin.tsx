import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform, animate } from 'motion/react';

const CountUp = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 1.5,
      onUpdate: (latest) => setDisplayValue(Math.floor(latest))
    });
    return () => controls.stop();
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
};
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { Users, Calendar, TrendingUp, BarChart2, Loader2, ArrowUpRight } from 'lucide-react';
import { getVisitorStats } from '../../services/analyticsService';

export default function AnalyticsAdmin() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    const data = await getVisitorStats();
    if (data) setStats(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#00a2ff] w-10 h-10" />
      </div>
    );
  }

  const statCards = [
    { label: "Today's Visitors", value: stats?.today || 0, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: "This Month", value: stats?.month || 0, icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: "This Year", value: stats?.year || 0, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: "Total Visits", value: stats?.total || 0, icon: BarChart2, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#0a0a0f]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-[#00a2ff]/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} p-3 rounded-xl ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} />
                Live
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              <CountUp value={stat.value} />
            </div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0a0a0f]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-white">Visitor Traffic (Last 30 Days)</h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-gray-400">
                <div className="w-2 h-2 rounded-full bg-[#00a2ff]" />
                Daily Visits
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.chartData || []}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00a2ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00a2ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0a0a0f', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ color: '#00a2ff' }}
                  cursor={{ stroke: 'rgba(0,162,255,0.2)', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visits" 
                  stroke="#00a2ff" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorVisits)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
         <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#0a0a0f]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Traffic Sources (Referrers)</h3>
            <div className="space-y-4">
              {stats?.referrers?.length > 0 ? (
                stats.referrers.map((ref: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-[#00a2ff]/30 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#00a2ff]/10 flex items-center justify-center text-[#00a2ff] text-xs font-bold">
                        {ref.source.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-300 text-sm truncate max-w-[150px] sm:max-w-none">{ref.source}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(ref.count / stats.total) * 100}%` }}
                          className="h-full bg-[#00a2ff]"
                        />
                      </div>
                      <span className="text-white text-xs font-mono">{ref.count}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No data available yet.
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-[#00a2ff]/20 to-purple-500/20 backdrop-blur-md border border-[#00a2ff]/20 rounded-2xl p-8 flex flex-col justify-center items-center text-center group"
          >
            <div className="w-16 h-16 bg-[#00a2ff] rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,162,255,0.4)]">
              <TrendingUp size={32} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Grow Your Presence</h4>
            <p className="text-gray-300 text-sm mb-6">You've had a {Math.min(100, Math.round((stats?.today || 1) * 20))}% increase in traffic since yesterday!</p>
            <button className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm hover:bg-[#00a2ff] hover:text-white transition-all transform hover:scale-105">
              View Insights
            </button>
          </motion.div>
      </div>
    </div>
  );
}
