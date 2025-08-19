'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';

export default function ChatPage() {
  const t = useTranslations('Chat');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t('welcomeMessage'),
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // 添加用户消息
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模拟机器人回复
    setTimeout(() => {
      const botResponses = [
        t('response1'),
        t('response2'),
        t('response3'),
        t('response4'),
        t('response5')
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('heroTitle')}</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-white">{t('aiAssistant')}</h2>
                  <p className="text-green-100 text-sm">{t('onlineNow')}</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-900/50">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex mb-6 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">AI</span>
                      </div>
                    </div>
                  )}
                  <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-tl-none'
                  }`}>
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 ml-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">You</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex mb-6">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">AI</span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
              <form onSubmit={handleSend} className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('inputPlaceholder')}
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={inputValue.trim() === ''}
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-3 rounded-full hover:from-green-700 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
              <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
                {t('poweredBy')} MyTePro AI
              </p>
            </div>
          </div>

          {/* Support Options */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">{t('needMoreHelp')}</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              {t('contactDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-semibold"
              >
                {t('contactUs')}
              </button>
              <button className="px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-semibold">
                {t('scheduleCall')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}