import { Calendar, MapPin, Droplet } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface DonationHistoryProps {
  onBack?: () => void;
}

export function DonationHistory({ onBack }: DonationHistoryProps = {}) {
  const donations = [
    {
      id: 1,
      date: '15/12/2025',
      location: 'Bệnh viện Chợ Rẫy',
      bloodType: 'A+',
      volume: '350ml',
      status: 'completed',
    },
    {
      id: 2,
      date: '20/09/2025',
      location: 'Bệnh viện Bình Dân',
      bloodType: 'A+',
      volume: '350ml',
      status: 'completed',
    },
    {
      id: 3,
      date: '15/06/2025',
      location: 'Bệnh viện Nhi Đồng 1',
      bloodType: 'A+',
      volume: '350ml',
      status: 'completed',
    },
    {
      id: 4,
      date: '10/03/2025',
      location: 'Bệnh viện 115',
      bloodType: 'A+',
      volume: '350ml',
      status: 'completed',
    },
  ];

  const stats = [
    { label: 'Tổng số lần hiến', value: '4', icon: Droplet },
    { label: 'Tổng lượng máu', value: '1,400ml', icon: Droplet },
  ];

  return (
    <div className="min-h-full bg-background">
      <PageHeader title="Lịch sử hiến máu" onBack={onBack || (() => {})} />
      
      {/* Main Content Card */}
      <div className="px-4 pt-4 pb-20">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4">
                <Icon className="w-6 h-6 text-destructive mb-2" />
                <div className="text-2xl font-bold text-destructive">{stat.value}</div>
                <div className="text-xs text-foreground/70">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Donation List */}
        <div className="space-y-3">
          <h2 className="font-bold text-foreground mb-3">Danh sách các lần hiến máu</h2>
          {donations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-border"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                    <Droplet className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Nhóm máu {donation.bloodType}</div>
                    <div className="text-sm text-foreground/60">{donation.volume}</div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Hoàn thành
                </div>
              </div>
              
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <Calendar className="w-4 h-4" />
                  <span>{donation.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <MapPin className="w-4 h-4" />
                  <span>{donation.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state for no donations */}
        {donations.length === 0 && (
          <div className="text-center py-12">
            <Droplet className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
            <p className="text-foreground/60">Bạn chưa có lần hiến máu nào</p>
            <p className="text-sm text-foreground/40 mt-1">Hãy đăng ký hiến máu để cứu người</p>
          </div>
        )}
      </div>
    </div>
  );
}