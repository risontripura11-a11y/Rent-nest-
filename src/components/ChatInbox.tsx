import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Send, MessageSquare, Phone, MapPin, 
  Clock, Sparkles, Check, Bot, ChevronLeft, Building2 
} from 'lucide-react';
import { Conversation, Message, Listing } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ChatInboxProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  onSendMessage: (conversationId: string, text: string) => void;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
}

export default function ChatInbox({
  isOpen,
  onClose,
  conversations,
  onSendMessage,
  activeConversationId,
  setActiveConversationId
}: ChatInboxProps) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = conversations.find(c => c.id === activeConversationId) || null;

  // Scroll to bottom on updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversationId) return;

    onSendMessage(activeConversationId, inputText.trim());
    setInputText('');

    // Simulate landlord typing and replying
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Trigger automated simulated reply
      triggerSimulatedReply(activeConversationId, inputText.trim());
    }, 1500);
  };

  const triggerSimulatedReply = (convId: string, userMsg: string) => {
    const text = userMsg.toLowerCase();
    let reply = '';

    if (text.includes('available') || text.includes('rent') || text.includes('bachelor')) {
      reply = "Yes, it is currently available and open for tours! Would you like to schedule a physical visit or lock the reservation layout?";
    } else if (text.includes('visit') || text.includes('visit') || text.includes('tour') || text.includes('meet') || text.includes('visit')) {
      reply = "That works perfectly. I am generally free in the afternoon/evening from 4:00 PM to 8:00 PM. Please copy my verified phone and let me know when you arrive!";
    } else if (text.includes('advance') || text.includes('bkash') || text.includes('booking') || text.includes('money')) {
      reply = "To reserve, you can make a flat holding advance of ৳1,500 using the 'Secure Advance Payment' tab right inside our RentNest post detail page. It instantly flags the listing as booked!";
    } else if (text.includes('discount') || text.includes('less') || text.includes('reduce')) {
      reply = "The current rent is fixed according to the Dhaka board rules, but we can negotiate utilities and gas bills during the direct physical tour!";
    } else {
      reply = "Thanks for your query! Let me coordinate with the other roommates and get back to you shortly. Feel free to ring my phone dialer directly.";
    }

    const landlord = conversations.find(c => c.id === convId);
    if (!landlord) return;

    const autoReplyMessage: Message = {
      id: `m-reply-${Date.now()}`,
      senderName: landlord.landlordName,
      senderAvatar: landlord.landlordAvatar,
      senderEmail: 'landholder@verified.bd',
      text: reply,
      timestamp: 'Just now'
    };

    // Append reply to state
    const saved = localStorage.getItem('rentnest:conversations');
    if (saved) {
      try {
        const list: Conversation[] = JSON.parse(saved);
        const index = list.findIndex(c => c.id === convId);
        if (index !== -1) {
          list[index].messages.push(autoReplyMessage);
          list[index].unread = true;
          localStorage.setItem('rentnest:conversations', JSON.stringify(list));
          // Refresh page state via window dispatch event to trigger refresh or wait for state lift
          window.dispatchEvent(new Event('rentnest:chats_updated'));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const sendQuickTemplate = (text: string) => {
    if (!activeConversationId) return;
    onSendMessage(activeConversationId, text);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      triggerSimulatedReply(activeConversationId, text);
    }, 1500);
  };

  const quickTemplates = [
    "Is this stay still available for rent?",
    "Can I schedule a quick tour tomorrow?",
    "Does the flat rent include utilities and Wi-Fi?",
    "What's the advance booking amount?"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
      />

      {/* Drawer Panel Workspace */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 24, stiffness: 210 }}
        className="relative w-full max-w-3xl bg-white h-full shadow-2xl flex flex-col z-10"
      >
        {/* Workspace Sticky Header */}
        <div className="p-4 border-b border-slate-150 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-display font-black text-sm text-slate-800">RentNest In-App Inbox</h3>
              <p className="text-[10px] text-slate-450 uppercase font-bold tracking-wider font-mono">Verified Landlord Conversations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-500 hover:text-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workspace core grid */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT PANEL: Conversation listings */}
          <div className={`w-full md:w-80 border-r border-slate-100 flex flex-col bg-slate-50/30 ${
            activeConversationId && 'hidden md:flex'
          }`}>
            <div className="p-3 bg-slate-50 border-b border-slate-100">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Active Negotations ({conversations.length})</span>
            </div>
            
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {conversations.length === 0 ? (
                <div className="text-center py-16 px-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700">No active conversations</h4>
                    <p className="text-[10.5px] text-slate-400/90 leading-relaxed mt-1">
                      Choose any properties from Mirpur-2, Dhanmondi, or Banani and click <b>"Message Landlord"</b> to start negotiable chats!
                    </p>
                  </div>
                </div>
              ) : (
                conversations.map((conv) => {
                  const isActive = conv.id === activeConversationId;
                  const lastMsg = conv.messages[conv.messages.length - 1];
                  return (
                    <button
                      key={conv.id}
                      onClick={() => {
                        setActiveConversationId(conv.id);
                        // Reset unread flag locally
                        conv.unread = false;
                      }}
                      className={`w-full text-left p-4 flex gap-3 transition-all cursor-pointer items-start select-none relative ${
                        isActive 
                          ? 'bg-indigo-50/40 border-l-4 border-indigo-650' 
                          : 'hover:bg-slate-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img 
                          src={conv.landlordAvatar} 
                          alt={conv.landlordName} 
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex justify-between items-baseline gap-1">
                          <span className="font-bold text-xs text-slate-800 truncate">{conv.landlordName}</span>
                          <span className="text-[9px] text-slate-400 shrink-0 font-mono">{lastMsg?.timestamp || 'Now'}</span>
                        </div>
                        {/* Stay tag context */}
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="text-[10px] font-semibold text-slate-500 truncate">{conv.listingTitle}</span>
                        </div>
                        <p className={`text-[11px] truncate mt-0.5 leading-snug ${conv.unread ? 'font-bold text-indigo-700' : 'text-slate-400'}`}>
                          {lastMsg ? lastMsg.text : 'No messages yet.'}
                        </p>
                      </div>

                      {conv.unread && (
                        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Active chat screen */}
          <div className={`flex-1 flex flex-col bg-white ${
            !activeConversationId && 'hidden md:flex items-center justify-center'
          }`}>
            {activeChat ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* Chat Partner Header bar */}
                <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveConversationId(null)}
                      className="md:hidden p-1.5 hover:bg-slate-200/60 rounded-lg text-slate-600 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="relative">
                      <img 
                        src={activeChat.landlordAvatar} 
                        alt={activeChat.landlordName} 
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white animate-pulse" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                        <span>{activeChat.landlordName}</span>
                        <span className="text-[8px] bg-emerald-100 text-emerald-800 uppercase px-1.5 py-0.5 rounded-full font-black tracking-wider">verified landlord</span>
                      </div>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-500" />
                        <span>Active Now • Sim Network </span>
                      </span>
                    </div>
                  </div>

                  <a 
                    href={`tel:${activeChat.landlordContact}`}
                    className="p-2 hover:bg-slate-200/50 rounded-xl text-indigo-600 font-bold text-xs flex items-center gap-1 cursor-pointer transition border border-slate-200/40 bg-white shadow-2xs whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Call {activeChat.landlordContact}</span>
                  </a>
                </div>

                {/* Context Property Header Panel */}
                <div className="bg-slate-100/50 p-3.5 border-b border-indigo-50/40 flex items-center gap-3">
                  <img 
                    src={activeChat.listingPhoto} 
                    alt={activeChat.listingTitle} 
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase font-bold text-slate-450 tracking-wider font-mono">Negotiation Stay Attachment</span>
                    <h4 className="text-xs font-bold text-slate-850 truncate">{activeChat.listingTitle}</h4>
                    <span className="text-[10.5px] font-semibold text-indigo-600 font-mono">Token Advance holds stay option • Flat ৳1,500 advance deposit</span>
                  </div>
                </div>

                {/* Messages Feed View */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/20">
                  {activeChat.messages.map((msg) => {
                    const isMe = msg.senderEmail === 'risontripura11@gmail.com';
                    return (
                      <div 
                        key={msg.id} 
                        className={`flex gap-2.5 items-start max-w-[85%] ${
                          isMe ? 'ml-auto flex-row-reverse' : 'mr-auto'
                        }`}
                      >
                        {!isMe && (
                          <img 
                            src={msg.senderAvatar} 
                            alt={msg.senderName} 
                            className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200 mt-0.5"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="space-y-0.5">
                          <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                            isMe 
                              ? 'bg-indigo-600 text-white rounded-tr-xs' 
                              : 'bg-white text-slate-705 border border-slate-150 rounded-tl-xs shadow-3xs'
                          }`}>
                            {msg.text}
                          </div>
                          <span className={`text-[9px] text-slate-400 block font-mono ${
                            isMe ? 'text-right' : 'text-left'
                          }`}>
                            {msg.senderName} • {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Automated agent status */}
                  {isTyping && (
                    <div className="flex gap-2.5 items-center mr-auto">
                      <img 
                        src={activeChat.landlordAvatar} 
                        alt={activeChat.landlordName} 
                        className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="bg-slate-100/70 py-2.5 px-4 rounded-full flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.1s]" />
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.3s]" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Templates chips panel */}
                <div className="px-3.5 pt-2 pb-1 bg-white border-t border-slate-100">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Quick negotiated questions (BD customized presets)</span>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 select-none scrollbar-none">
                    {quickTemplates.map((tp, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => sendQuickTemplate(tp)}
                        className="py-1 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-bold shrink-0 transition-colors cursor-pointer border border-indigo-100/30 whitespace-nowrap"
                      >
                        {tp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Core message textform input */}
                <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2">
                  <input
                    type="text"
                    placeholder="Describe your queries, scheduling dates or offer rent..."
                    className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-xs outline-hidden focus:border-indigo-500 focus:bg-white transition"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>
            ) : (
              /* No selection panel fallback state */
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50/20">
                <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 animate-bounce">
                  <Bot className="w-7 h-7" />
                </div>
                <h3 className="font-display font-black text-slate-800 text-base">Verified Landlord Negotiations</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4 leading-relaxed">
                  Select a live active landlord negotiation from the left panel sidebar. Ask coordinate features, verify service charge rules, or ask for the Metro station route!
                </p>
                <div className="flex items-center gap-1 text-[10px] text-indigo-500 font-mono font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Real-time Response Simulator Active</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </motion.div>
    </div>
  );
}
