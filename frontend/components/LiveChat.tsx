import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, Smile, Image } from 'lucide-react';
// FIX: Import Theme from emoji-picker-react to use the correct type for the theme prop.
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { getChatMessages, sendChatMessage } from '../api';

interface LiveChatProps {
  coinId: string;
  coinName: string;
  isAuthenticated: boolean;
}

interface Message {
    id: number;
    text: string;
    userId: number;
    coinId:string;
    createdAt: string;
    username: string;
    badge?: 'analyst' | 'admin' | null;
}

const LiveChat = ({ coinId, coinName, isAuthenticated }: LiveChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const fetchMessages = async () => {
    if (!coinId) return;
    try {
        const data = await getChatMessages(coinId);
        setMessages(data);
    } catch (error) {
        console.error('Failed to fetch messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Poll for new messages every 5 seconds
    return () => clearInterval(interval);
  }, [coinId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !isAuthenticated) return;

    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("Not authenticated");
        
        await sendChatMessage(coinId, { text: newMessage }, token);
        setNewMessage('');
        setShowEmojiPicker(false);
        fetchMessages(); // Immediately refetch messages after sending
    } catch (error) {
        console.error("Failed to send message:", error);
    }
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
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg h-full flex flex-col">
      <div className="flex items-center space-x-2 p-4 border-b border-gray-700/30">
        <MessageCircle className="w-5 h-5 text-cyan-400" />
        <h3 className="font-bold text-white">Live Chat - {coinName}</h3>
        <div className="ml-auto flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">LIVE</span>
        </div>
      </div>
      
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => {
          const usernameColor = msg.badge ? 'text-yellow-400' : 'text-gray-200';
          return (
            <div key={msg.id}>
              <div className="flex items-baseline space-x-2">
                  <span className={`font-bold text-sm ${usernameColor}`}>{msg.username}</span>
                  {msg.badge && <span className="text-yellow-400 text-xs" title={msg.badge}>⭐</span>}
                  <span className="text-xs text-gray-500">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
              </div>
              <div className="mt-1 text-sm text-gray-200 bg-[#30363D] rounded-lg px-3 py-2 inline-block max-w-full break-words shadow">
                  {msg.text}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="relative p-4 border-t border-gray-700/30">
        {isAuthenticated ? (
          <div className="space-y-2">
            <form onSubmit={handleSendMessage} className="flex space-x-2 relative">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-gray-700/50 border border-gray-600/30 rounded px-3 py-2 pr-20 text-sm text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-1 text-gray-400 hover:text-yellow-400 transition-colors rounded hover:bg-gray-600/30">
                    <Smile className="w-4 h-4" />
                  </button>
                  <button type="button" className="p-1 text-gray-400 hover:text-pink-400 transition-colors rounded hover:bg-gray-600/30">
                    <Image className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-2 rounded transition-colors font-bold">
                <Send className="w-4 h-4" />
              </button>
            </form>
            {showEmojiPicker && (
              <div ref={emojiPickerRef} className="absolute bottom-full right-4 mb-2 z-50 border border-gray-600/30 rounded-lg overflow-hidden shadow-2xl">
                {/* FIX: Use the Theme enum for the theme prop instead of a string literal to fix the type error. */}
                <EmojiPicker onEmojiClick={handleEmojiClick} theme={Theme.DARK} width={300} height={400} />
              </div>
            )}
          </div>
        ) : (
          <a href="#/login" className="block w-full text-center bg-[#30363D] hover:bg-gray-700 text-gray-300 py-2 rounded-lg text-sm">
              Login to join the conversation
          </a>
        )}
      </div>
    </div>
  );
};

export default LiveChat;