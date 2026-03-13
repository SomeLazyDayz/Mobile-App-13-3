import { useState, useEffect } from 'react';
import { Users, Hospital, TrendingUp, LogOut } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../api';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState({ users: 0, hospitals: 0 });
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // In a real app we'd fetch this from the backend
    // For now, we will mock the chart data and try to fetch summary counts
    const fetchStats = async () => {
      try {
        const userRes = await api.get('/users');
        const hospitalRes = await api.get('/hospitals');
        const totalUsers = userRes.data.count || 0;
        const totalHospitals = hospitalRes.data.count || 0;
        setStats({ users: totalUsers, hospitals: totalHospitals });

        // Mock chart data based on retrieved values for demonstration
        setChartData([
          { name: 'T1', donors: Math.max(1, totalUsers - 5) },
          { name: 'T2', donors: Math.max(2, totalUsers - 3) },
          { name: 'T3', donors: Math.max(3, totalUsers - 1) },
          { name: 'T4', donors: totalUsers },
        ]);
      } catch (error) {
        console.error('Error fetching admin stats', error);
        // Fallback mock data
        setStats({ users: 15, hospitals: 3 });
        setChartData([
          { name: 'T1', donors: 8 },
          { name: 'T2', donors: 12 },
          { name: 'T3', donors: 10 },
          { name: 'T4', donors: 15 },
        ]);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-full bg-background pb-24">
      {/* Header */}
      <div className="bg-destructive px-6 pt-12 pb-6 rounded-b-[40px] shadow-lg sticky top-0 z-10 w-[393px]">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <button onClick={onLogout} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>
        <p className="text-white/80 mt-2 text-sm">Quản lý hệ thống Giọt Ấm</p>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-3xl p-5 shadow-lg flex flex-col items-center justify-center border border-muted">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-destructive" />
            </div>
            <div className="text-3xl font-bold text-foreground">{stats.users}</div>
            <div className="text-sm text-muted-foreground mt-1">Tình nguyện viên</div>
          </div>
          
          <div className="bg-card rounded-3xl p-5 shadow-lg flex flex-col items-center justify-center border border-muted">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Hospital className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-foreground">{stats.hospitals}</div>
            <div className="text-sm text-muted-foreground mt-1">Bệnh viện</div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-card rounded-3xl p-6 shadow-lg border border-muted">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-destructive" />
            <h2 className="text-lg font-bold text-foreground">Tăng trưởng người hiến</h2>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="donors" 
                  fill="#930511" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
