import { useState, useRef, useEffect } from 'preact/hooks';
import { useMutation } from '@tanstack/react-query';

// Hàm để gửi tin nhắn đến API
const postChatMessage = async (message) => {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    throw new Error('Failed to get response from AI');
  }
  return res.json();
};

// Component cho một bong bóng chat
const MessageBox = ({ text, isUser }) => (
  <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${isUser ? 'bg-cyan-600' : 'bg-gray-700'}`}>
      <p className="text-white">{text}</p>
    </div>
  </div>
);

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { text: 'Chào bạn, tôi là AI của Fortress. Bạn cần giúp gì?', isUser: false },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const mutation = useMutation({
    mutationFn: postChatMessage,
    onSuccess: (data) => {
        // Thêm tin nhắn trả lời của AI vào danh sách
        setMessages((prev) => [...prev, { text: data.reply, isUser: false }]);
    },
    onError: (error) => {
        // Xử lý lỗi nếu không gửi được
        setMessages((prev) => [...prev, { text: `Lỗi: ${error.message}`, isUser: false }]);
    }
  });

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || mutation.isPending) return;

    // Thêm tin nhắn của người dùng vào danh sách
    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    // Gọi API
    mutation.mutate(input);
    // Xóa ô nhập liệu
    setInput('');
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-4xl flex-col bg-gray-900">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Trợ lý AI</h1>
        <p className="text-gray-400">Gửi lệnh hoặc câu hỏi cho AI của bạn</p>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <MessageBox key={index} text={msg.text} isUser={msg.isUser} />
        ))}
        {mutation.isPending && <MessageBox text="..." isUser={false} />}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto p-4">
        <form onSubmit={handleSend} className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập lệnh cho AI..."
            className="flex-1 rounded-full bg-gray-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            disabled={mutation.isPending}
          />
          <button
            type="submit"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-600 text-white transition hover:bg-cyan-700 disabled:opacity-50"
            disabled={mutation.isPending}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}