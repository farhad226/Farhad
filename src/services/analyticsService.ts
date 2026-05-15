import { supabase } from '../supabase';
import { startOfDay, startOfMonth, startOfYear, format } from 'date-fns';

export const trackVisit = async (path: string) => {
  try {
    const { error } = await supabase.from('page_visits').insert([
      { page_path: path }
    ]);
    if (error) console.error('Error tracking visit:', error);
  } catch (err) {
    console.error('Failed to track visit:', err);
  }
};

export const getVisitorStats = async () => {
  try {
    const today = startOfDay(new Date()).toISOString();
    const monthStart = startOfMonth(new Date()).toISOString();
    const yearStart = startOfYear(new Date()).toISOString();

    // Today's visits
    const { count: todayCount } = await supabase
      .from('page_visits')
      .select('*', { count: 'exact', head: true })
      .gte('visited_at', today);

    // Monthly visits
    const { count: monthCount } = await supabase
      .from('page_visits')
      .select('*', { count: 'exact', head: true })
      .gte('visited_at', monthStart);

    // Yearly visits
    const { count: yearCount } = await supabase
      .from('page_visits')
      .select('*', { count: 'exact', head: true })
      .gte('visited_at', yearStart);

    // Total visits
    const { count: totalCount } = await supabase
      .from('page_visits')
      .select('*', { count: 'exact', head: true });

    // Last 30 days daily stats for chart
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data: chartDataRaw } = await supabase
      .from('page_visits')
      .select('visited_at')
      .gte('visited_at', thirtyDaysAgo.toISOString())
      .order('visited_at', { ascending: true });

    // Group by day for the chart
    const dailyStats: { date: string, visits: number }[] = [];
    if (chartDataRaw) {
      const groups = chartDataRaw.reduce((acc: any, visit: any) => {
        const dateKey = format(new Date(visit.visited_at), 'yyyy-MM-dd');
        acc[dateKey] = (acc[dateKey] || 0) + 1;
        return acc;
      }, {});

      for (let i = 0; i <= 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - (30 - i));
        const key = format(d, 'yyyy-MM-dd');
        dailyStats.push({
          date: format(d, 'MMM dd'),
          visits: groups[key] || 0
        });
      }
    }

    return {
      today: todayCount || 0,
      month: monthCount || 0,
      year: yearCount || 0,
      total: totalCount || 0,
      chartData: dailyStats
    };
  } catch (err) {
    console.error('Error fetching visitor stats:', err);
    return null;
  }
};
