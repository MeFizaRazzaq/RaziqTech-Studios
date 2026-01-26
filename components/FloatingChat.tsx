
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in duration-300">
          <div className="bg-indigo-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">RaziqTech Support</p>
                <p className="text-xs text-indigo-100">Usually replies in minutes</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-grow p-4 bg-slate-50 overflow-y-auto space-y-4">
            <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-700 max-w-[85%]">
              Hello! 👋 How can we help you today?
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-700 max-w-[85%]">
              Are you looking for a quote or have a technical question?
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-grow text-sm focus:outline-none"
              />
              <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110 active:scale-95"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};

export default FloatingChat;
