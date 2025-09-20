import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, Smile, Image } from 'lucide-react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

interface LiveChatProps {
  coinId: string;
  coinName: string;
  isAuthenticated: boolean;
}

interface Message {
    id: number;
    text: string;
    userId: number;
    createdAt: string;
    username: string;
    badge?: 'analyst' | 'admin' | null;
}

// --- Mock Data for Simulation ---
const fakeUsernames = ['CryptoKing', 'MoonLover', 'AnonHodler', 'PumpMaster', 'DiamondHands', 'LamboDreamer', 'ApeIn', 'SatoshiJr'];
const fakeMessages = ['To the moon! 🚀', 'When Lambo?', 'Pump it!', 'This is the way! 🙌', 'DYOR', 'LFG! 🔥', 'GM!', 'NGMI 📉', 'WGMI 💎', 'HODL!!!', 'Looks bullish', 'I am aping in!', 'ATH soon', 'Paper hands selling lol', 'Just bought more', '😂', '💯', '🤯'];
const fakeGifs = [
    'https://media.giphy.com/media/YprxQv4p4M2Ww/giphy.gif',
    'https://cdn.pixabay.com/photo/2021/08/25/20/42/cat-6577457_960_720.png',
    'https://media.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif',
    'https://media.giphy.com/media/3oKIPdG6K2Avf7S_Bu/giphy.gif',
    'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif',
];

const isImageUrl = (url: string) => {
    return /\.(jpeg|jpg|gif|png)$/i.test(url);
};

const LiveChat = ({ coinId, coinName, isAuthenticated }: LiveChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: number; username: string } | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
    }
  }, [isAuthenticated]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Effect for generating automatic messages
  useEffect(() => {
    setMessages([]); // Clear messages when coin changes
    const interval = setInterval(() => {
        const shouldSendGif = Math.random() < 0.1; // 10% chance of sending a GIF
        const content = shouldSendGif
            ? fakeGifs[Math.floor(Math.random() * fakeGifs.length)]
            : fakeMessages[Math.floor(Math.random() * fakeMessages.length)];

        const automaticMessage: Message = {
            id: Date.now() + Math.random(),
            text: content,
            userId: Math.floor(Math.random() * 1000), // Fake user ID
            username: fakeUsernames[Math.floor(Math.random() * fakeUsernames.length)],
            createdAt: new Date().toISOString(),
        };
        setMessages(prev => [...prev, automaticMessage]);
    }, Math.random() * 5000 + 5000); // Random interval between 5-10 seconds

    return () => clearInterval(interval);
  }, [coinId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !isAuthenticated || !currentUser) return;

    const messageToSend: Message = {
        id: Date.now(),
        text: newMessage,
        userId: currentUser.id,
        createdAt: new Date().toISOString(),
        username: currentUser.username,
        badge: 'admin', // Example badge for the current user
    };

    setMessages(prev => [...prev, messageToSend]);
    setNewMessage('');
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ height: '100%' }} className="bg-[#0a0a0a] border border-gray-800 rounded-lg flex flex-col">
      <div className="flex items-center space-x-2 p-4 border-b border-gray-800">
        <MessageCircle className="w-5 h-5 text-[#00f5b3]" />
        <h3 className="font-bold text-white">Live Chat - {coinName}</h3>
        <div className="ml-auto flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">LIVE</span>
        </div>
      </div>
      
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => {
          const usernameColor = msg.badge ? 'text-yellow-400' : 'text-gray-200';
          const isImage = isImageUrl(msg.text);
          return (
            <div key={msg.id}>
              <div className="flex items-baseline space-x-2">
                  <span className={`font-bold text-sm ${usernameColor}`}>{msg.username}</span>
                  {msg.badge && <span className="text-yellow-400 text-xs" title={msg.badge}>⭐</span>}
                  <span className="text-xs text-gray-500">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
              </div>
              <div className="mt-1 max-w-full inline-block">
                {isImage ? (
                    <img src={msg.text} alt="chat-gif" className="max-w-[150px] h-auto rounded-lg mt-1 shadow" />
                ) : (
                    <div className="text-sm text-gray-200 bg-gray-800 rounded-lg px-3 py-2 inline-block max-w-full break-words shadow">
                        {msg.text}
                    </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="relative p-4 border-t border-gray-800">
        {isAuthenticated ? (
          <div className="space-y-2">
            <form onSubmit={handleSendMessage} className="flex space-x-2 relative">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 pr-20 text-sm text-white placeholder-gray-400 focus:border-green-400 focus:ring-1 focus:ring-green-400/20 transition-all"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-1 text-gray-400 hover:text-yellow-400 transition-colors rounded hover:bg-gray-700">
                    <Smile className="w-4 h-4" />
                  </button>
                  <button type="button" className="p-1 text-gray-400 hover:text-pink-400 transition-colors rounded hover:bg-gray-700">
                    <Image className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition-colors font-bold">
                <Send className="w-4 h-4" />
              </button>
            </form>
            {showEmojiPicker && (
              <div ref={emojiPickerRef} className="absolute bottom-full right-4 mb-2 z-50 border border-gray-700 rounded-lg overflow-hidden shadow-2xl">
                <EmojiPicker onEmojiClick={handleEmojiClick} theme={Theme.DARK} width={300} height={400} />
              </div>
            )}
          </div>
        ) : (
          <a href="#/login" className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-lg text-sm">
              Login to join the conversation
          </a>
        )}
      </div>
    </div>
  );
};

export default LiveChat;