// src/components/BottomNavbar.jsx

// Component Icon không thay đổi
const Icon = ({ emoji, label }) => (
    <div className="flex flex-col items-center justify-center">
        <span className="text-2xl">{emoji}</span>
        <span className="text-xs font-medium">{label}</span>
    </div>
);

// Danh sách các nút không thay đổi
const navItems = [
    { id: 'monitoring', emoji: '📊', label: 'Giám sát' },
    { id: 'chat', emoji: '🤖', label: 'AI Chat' },
    { id: 'reflection', emoji: '🤔', label: 'Phản tư' },
];

// Quan trọng: Phải có "export default" ở đây
export default function BottomNavbar({ activeTab, setActiveTab }) {
    return (
        <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-700 bg-gray-900 shadow-lg">
            <div className="mx-auto flex h-16 max-w-md items-center justify-around text-gray-400">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`transition-colors ${activeTab === item.id ? 'text-cyan-400' : 'hover:text-cyan-400'}`}
                    >
                        <Icon emoji={item.emoji} label={item.label} />
                    </button>
                ))}
            </div>
        </nav>
    );
}