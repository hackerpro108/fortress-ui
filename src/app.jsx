// src/app.jsx
import { useState } from 'preact/hooks';
import MonitoringPage from './pages/MonitoringPage';
import ChatPage from './pages/ChatPage';
import ReflectionPage from './pages/ReflectionPage';
import BottomNavbar from './components/BottomNavbar.jsx'; // Import đúng

export function App() {
  const [activeTab, setActiveTab] = useState('monitoring');

  const renderPage = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatPage />;
      case 'reflection':
        return <ReflectionPage />;
      default:
        return <MonitoringPage />;
    }
  };

  return (
    <>
      {/* Phần thân ứng dụng */}
      <div className="pb-16"> {/* Thêm padding-bottom để nội dung không bị thanh nav che mất */}
        {renderPage()}
      </div>

      {/* Thanh điều hướng */}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
}