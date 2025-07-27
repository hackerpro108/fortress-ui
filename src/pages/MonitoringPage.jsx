// src/pages/MonitoringPage.jsx
import { useQuery } from '@tanstack/react-query';

// Component Progress Bar
const ProgressBar = ({ value }) => (
  <div className="mt-2 h-2 w-full rounded-full bg-gray-700">
    <div
      className="h-2 rounded-full bg-cyan-500"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

// Component StatCard được làm an toàn hơn
const StatCard = ({ icon, title, value, unit, total, isLoading }) => {
  // Chỉ định dạng số khi value thực sự là một con số
  const displayValue = typeof value === 'number' ? value.toFixed(1) : value;

  return (
    <div className="flex flex-col justify-between rounded-lg bg-gray-800 p-4 shadow-lg transition hover:scale-105">
      <div>
        <div className="flex items-center text-sm font-medium text-gray-400">
          <span className="mr-2 text-lg">{icon}</span>
          {title}
        </div>
        {isLoading ? (
          <div className="mt-1 h-8 w-24 animate-pulse rounded bg-gray-700"></div>
        ) : (
          <div className="mt-1 text-3xl font-semibold text-white">
            {displayValue}<span className="text-xl text-gray-500">{unit}</span>
          </div>
        )}
      </div>
      {total && !isLoading && (
        <div className="text-xs text-gray-500">{total}</div>
      )}
      {(title.includes("Usage")) && !isLoading && typeof value === 'number' && <ProgressBar value={value} />}
    </div>
  );
};

// Hàm gọi API không thay đổi
const fetchVpsStats = async () => {
  const res = await fetch('https://status.lohi.io.vn/api/stats');
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

// Đổi tên hàm thành MonitoringPage
export default function MonitoringPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['vpsStats'],
    queryFn: fetchVpsStats,
    refetchInterval: 2000,
  });

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Bảng điều khiển Fortress</h1>
        <p className="text-gray-400">Giám sát tài nguyên VPS và AI</p>
      </header>

      {error && (
        <div className="rounded bg-red-900 p-4 text-red-300">
          Lỗi khi kết nối đến API: {error.message}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {/* Bây giờ chúng ta truyền thẳng giá trị, không gọi toFixed() ở đây nữa */}
        <StatCard icon="💻" title="CPU Usage" value={data?.cpuUsage} unit="%" isLoading={isLoading} />
        <StatCard icon="🧠" title="RAM Usage" value={data?.ramUsage} unit="%" isLoading={isLoading} />
        <StatCard icon="💾" title="Disk Usage" value={data?.diskUsage} unit="%" total={`Tổng: ${data?.diskDetails?.total || '...'}`} isLoading={isLoading} />
        <StatCard icon="⏱️" title="Uptime" value={data?.uptime} unit="" isLoading={isLoading} />
      </div>
    </div>
  );
}