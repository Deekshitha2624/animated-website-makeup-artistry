import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Sparkles, Bot } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: "Welcome to Aura Makeup. I am Priya's AI Concierge. How may I assist you with your luxury wedding beauty reservation today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Trigger greeting popup after a small delay (3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPopup(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const userText = inputValue.trim();
    if (!userText) return;

    // Add User Message
    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Call API Chat endpoint (only if running locally)
    const isLocal = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    if (isLocal) {
      try {
        const res = await fetch('http://localhost:3001/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userText }),
        });

        if (res.ok) {
          const data = await res.json();
          const aiMsg: Message = {
            id: Date.now() + 1,
            sender: 'ai',
            text: data.reply,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMsg]);
          setIsTyping(false);
          return;
        } else {
          throw new Error('API failed');
        }
      } catch (err) {
        console.warn("Local chat agent offline, falling back to local rules");
      }
    }

    // Trigger local response fallback directly in production or if agent is offline
    const localResponse = getLocalResponse(userText);
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: localResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  // Local fallback response generator if server is down
  const getLocalResponse = (rawMsg: string): string => {
    const msg = rawMsg.toLowerCase();
    if (msg.includes('price') || msg.includes('package') || msg.includes('cost') || msg.includes('pricing') || msg.includes('rate') || msg.includes('charge')) {
      return "Aura Makeup offers three bespoke pricing packages to fit your wedding aesthetic:\n\n• *Classic Elegance ($600+):* Full bridal application, standard skin-prep, and soft glam.\n• *Couture Diamond ($850+):* Custom HD/Airbrush makeup, luxury skin-prep, and custom hair consulting.\n• *Editorial Royal ($1,200+):* Full day coverage, multiple look changes, premium hair styling, and styling consultations.\n\nYou can view all details under our 'Packages' section!";
    } else if (msg.includes('product') || msg.includes('brand') || msg.includes('kit') || msg.includes('makeup used') || msg.includes('cream')) {
      return "Priya exclusively utilizes elite luxury brands in her kit to guarantee flawless, photographic longevity. These include *Chanel, Dior, Tom Ford, Charlotte Tilbury, and Pat McGrath Labs*, selected specifically for your skin type.";
    } else if (msg.includes('trial') || msg.includes('consultation') || msg.includes('test') || msg.includes('practice')) {
      return "Yes, bridal trial sessions are highly recommended! We suggest scheduling your trial 2–3 months before your wedding date. This is booked as part of our Bespoke Bridal Packages.";
    } else if (msg.includes('party') || msg.includes('guest') || msg.includes('bridesmaid') || msg.includes('group') || msg.includes('size') || msg.includes('people')) {
      return "Aura Makeup coordinates bookings for bridal parties of up to 8 people. For larger groups, Priya coordinates with senior associate artists to ensure everyone is ready on schedule.";
    } else if (msg.includes('priya') || msg.includes('elena') || msg.includes('artist') || msg.includes('founder') || msg.includes('lead')) {
      return "Priya is the Lead Makeup Artist and Founder of Aura Makeup. She is celebrated for her signature 'luminous from within' editorial skin finishes, serving brides worldwide from Milan and New York.";
    } else if (msg.includes('book') || msg.includes('reserve') || msg.includes('calendar') || msg.includes('available') || msg.includes('date')) {
      return "To check availability and secure your date, please head to the 'Book Consultation' section. Select an open date on our luxury interactive calendar, fill out your details, and click submit. You will receive an instant WhatsApp confirmation!";
    } else if (msg.includes('location') || msg.includes('studio') || msg.includes('where') || msg.includes('travel') || msg.includes('destination')) {
      return "Aura Makeup is available worldwide for destination weddings. Priya is based out of Milan and New York, and frequently travels to destinations like Lake Como, Paris, and the Amalfi Coast.";
    } else {
      return "Thank you for contacting Aura Makeup. We would love to be part of your special day. For specific booking questions or availability inquiries, please select your target date on our calendar above and submit your reservation request. Priya or her concierge team will connect with you via WhatsApp shortly!";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      
      {/* Floating Greeting Speech Bubble (Popup) */}
      <AnimatePresence>
        {showPopup && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute bottom-1.5 right-14 sm:right-16 mr-2 sm:mr-3 w-[calc(100vw-100px)] sm:w-[270px] max-w-[280px] bg-[#0c0c0c] border border-gold-400/25 p-4 shadow-2xl rounded-none cursor-pointer flex flex-col gap-2 group/popup select-text"
            onClick={() => {
              setIsOpen(true);
              setShowPopup(false);
            }}
          >
            {/* Arrow Pointer */}
            <div className="absolute right-[-6px] bottom-5 w-2.5 h-2.5 bg-[#0c0c0c] border-t border-r border-gold-400/25 rotate-45 pointer-events-none" />
            
            {/* Dismiss Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPopup(false);
              }}
              className="absolute top-2.5 right-2.5 text-gold-400/40 hover:text-gold-400 transition-colors cursor-pointer p-0.5"
            >
              <X size={12} />
            </button>

            {/* Content */}
            <div className="flex items-center gap-1.5 text-[9px] font-sans tracking-widest text-gold-400/60 uppercase font-medium">
              <Bot size={11} className="text-gold-400" />
              <span>Aura Concierge</span>
            </div>
            
            <p className="text-[11px] font-sans font-light leading-relaxed text-gold-100/90 pr-3 select-none">
              Welcome to Aura Makeup. I am Priya's AI Concierge. How may I assist you with your luxury wedding beauty reservation today?
            </p>
            
            <span className="text-[9px] font-sans tracking-wider text-gold-400 font-medium group-hover/popup:underline self-start mt-1">
              Start Chatting &rarr;
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowPopup(false);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#251e12] border border-gold-400/30 hover:border-gold-400 text-gold-400 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover-luxury relative group"
        aria-label="Toggle AI Concierge"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <MessageSquare size={20} />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-400"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Slide-up Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-20 right-0 w-[calc(100vw-48px)] sm:w-[380px] h-[70vh] sm:h-[500px] max-h-[550px] bg-black/95 border border-gold-400/20 shadow-2xl flex flex-col z-50 rounded-none overflow-hidden"
          >
            
            {/* Header */}
            <div className="bg-[#0c0c0c] border-b border-gold-400/10 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#251e12] border border-gold-400/20 flex items-center justify-center text-gold-400">
                  <Bot size={16} />
                </div>
                <div>
                  <h4 className="font-serif text-sm text-gold-50 tracking-wider font-light uppercase">
                    Aura Concierge
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                    <span className="text-[9px] font-sans tracking-widest text-gold-400/60 uppercase">
                      AI Assistant Active
                    </span>
                  </div>
                </div>
              </div>
              <Sparkles size={14} className="text-gold-400 animate-pulse" />
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 select-text">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-none p-3.5 text-xs font-sans font-light leading-relaxed whitespace-pre-line border ${
                      msg.sender === 'user'
                        ? 'bg-[#251e12] border-gold-400/20 text-gold-200'
                        : 'bg-[#0c0c0c] border-gold-400/5 text-gold-50/90'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing Bubble */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#0c0c0c] border border-gold-400/5 rounded-none px-4 py-3 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input form */}
            <form
              onSubmit={handleSend}
              className="bg-[#0c0c0c] border-t border-gold-400/10 p-4 flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about trials, pricing, products..."
                className="flex-1 bg-[#050505] border border-gold-400/15 focus:border-gold-400/40 px-4 py-2.5 text-xs font-sans tracking-wide text-gold-50 outline-none transition-colors rounded-none placeholder-gold-200/25"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-[#251e12] border border-gold-400/15 hover:border-gold-400 text-gold-400 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40 disabled:pointer-events-none rounded-none"
              >
                <Send size={14} />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
