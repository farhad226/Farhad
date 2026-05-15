import { supabase } from '../supabase';
import { startOfDay, startOfMonth, startOfYear, format } from 'date-fns';

export const trackVisit = async (path: string) => {
  try {
    const referrer = document.referrer;
    const { error } = await supabase.from('page_visits').insert([
      { 
        page_path: path,
        referrer: referrer || 'Direct'
      }
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
    
    const { data: visitsRaw } = await supabase
      .from('page_visits')
      .select('visited_at, referrer')
      .gte('visited_at', thirtyDaysAgo.toISOString())
      .order('visited_at', { ascending: true });

    // Group by day for the chart
    const dailyStats: { date: string, visits: number }[] = [];
    const referrerStats: { source: string, count: number }[] = [];

    if (visitsRaw) {
      // Daily Grouping
      const groups = visitsRaw.reduce((acc: any, visit: any) => {
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

      // Referrer Aggregation
      const refGroups = visitsRaw.reduce((acc: any, visit: any) => {
        let source = 'Direct';
        if (visit.referrer && visit.referrer !== 'Direct') {
          try {
            const url = new URL(visit.referrer);
            source = url.hostname.replace('www.', '');
          } catch (e) {
            source = visit.referrer;
          }
        }
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {});

      Object.entries(refGroups).forEach(([source, count]) => {
        referrerStats.push({ source, count: count as number });
      });
      referrerStats.sort((a, b) => b.count - a.count);
    }

    return {
      today: todayCount || 0,
      month: monthCount || 0,
      year: yearCount || 0,
      total: totalCount || 0,
      chartData: dailyStats,
      referrers: referrerStats.slice(0, 5) // Top 5
    };
  } catch (err) {
    console.error('Error fetching visitor stats:', err);
    return null;
  }
};

export const resetAnalytics = async () => {
  try {
    const { error } = await supabase
      .from('page_visits')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows
      
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Failed to reset analytics:', err);
    return false;
  }
};
