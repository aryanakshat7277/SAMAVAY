import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  ShieldCheck,
  Volume2,
  VolumeX,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { NationalEmblem } from './NationalEmblem';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  action?: {
    label: string;
    path: string;
  };
  timestamp: string;
}

export const CitizenAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: Message[] = [
    {
      id: '1',
      sender: 'bot',
      text: 'नमस्ते! मैं समवाय साथी (SAMAVAY Saathi) हूँ — आपका डिजिटल सरकारी सेवा सहायक। आप किसी भी सेवा, डेटा सुरक्षा या आवेदन की स्थिति के बारे में पूछ सकते हैं।',
      timestamp: '11:00 AM'
    },
    {
      id: '2',
      sender: 'bot',
      text: 'Hello! I am SAMAVAY Saathi, your sovereign government assistant. How can I assist you today? You can choose a quick question below or ask anything:',
      timestamp: '11:00 AM'
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const quickQuestions = [
    {
      question: 'How is 62% of my form filled automatically?',
      answer: 'SAMAVAY queries authoritative sovereign databases (Bhoomi LRS, VAHAN, Aadhaar e-KYC, DigiLocker) with your permission. Because the government already verifies this information, you don’t need to upload photocopies or retype it!',
      action: { label: 'Try 62% Auto-Reuse Form', path: '/services' }
    },
    {
      question: 'How do I revoke my DPDP Consent?',
      answer: 'Under the Digital Personal Data Protection (DPDP) Act 2023, you have the sovereign right to revoke data permissions anytime. Go to My Data Permissions to instantly toggle off department access.',
      action: { label: 'Open Data Permissions', path: '/dashboard/permissions' }
    },
    {
      question: 'Where can I track my Land Mutation application?',
      answer: 'Your active and past applications are monitored in real time on the Citizen Dashboard with mTLS verification timestamps and clear 5-stage progress tracking.',
      action: { label: 'View My Applications', path: '/applications' }
    },
    {
      question: 'Which government platforms are connected?',
      answer: 'SAMAVAY connects 8 sovereign platforms: Bhoomi Land Records (Revenue), SARATHI 4.0 & VAHAN (Transport), e-NagarPalika (Municipal), DigiLocker, PFMS, and UIDAI e-KYC with sub-50ms latency.',
      action: { label: 'Check Connected Platforms', path: '/admin/platform-status' }
    }
  ];

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Dynamic smart response
    setTimeout(() => {
      let botResponse = "I understand you are asking about government services on SAMAVAY. You can search our directory of 12+ connected services or visit the citizen dashboard for personalized tracking.";
      let actionObj: { label: string; path: string } | undefined = { label: 'Explore Services', path: '/services' };

      const lower = text.toLowerCase();
      if (lower.includes('reuse') || lower.includes('62%') || lower.includes('auto') || lower.includes('fill')) {
        botResponse = "SAMAVAY automatically matches your verified identity with Bhoomi LRS, VAHAN, and DigiLocker to auto-fill up to 62% of required fields. This eliminates 100% of physical photocopies!";
        actionObj = { label: 'Apply For Service', path: '/services' };
      } else if (lower.includes('dpdp') || lower.includes('consent') || lower.includes('privacy') || lower.includes('revoke')) {
        botResponse = "All data exchanges are governed by the DPDP Act 2023. We issue cryptographically signed, purpose-bound tokens. You can inspect or revoke any active consent in 1 click.";
        actionObj = { label: 'Manage Permissions', path: '/dashboard/permissions' };
      } else if (lower.includes('track') || lower.includes('status') || lower.includes('application')) {
        botResponse = "You can track your service applications in real time with our 5-stage sovereign transparency tracker.";
        actionObj = { label: 'Open Tracker', path: '/applications' };
      } else if (lower.includes('demo') || lower.includes('sih') || lower.includes('evaluat') || lower.includes('scenario')) {
        botResponse = "For Smart India Hackathon evaluators, we have built a dedicated Mission Control Sandbox with 5 live evaluation scenarios!";
        actionObj = { label: 'SIH Evaluator Sandbox', path: '/admin/demo' };
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        action: actionObj,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      if (speechEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(botResponse);
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    }, 650);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Assistant Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-gov-900 hover:bg-gov-950 text-white pl-3 pr-4 py-2.5 rounded-full shadow-xl hover:shadow-2xl border border-gov-700/80 transition-all duration-200 cursor-pointer"
          title="Open SAMAVAY Saathi (AI Citizen Assistant)"
        >
          {/* Emblem Icon / Bot Avatar */}
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-saffron-500/20 border border-saffron-400/40 flex items-center justify-center">
              <NationalEmblem size="sm" variant="gold" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-2 border-gov-950 animate-pulse" />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-tight font-serif text-white">
                समवाय साथी
              </span>
              <span className="text-[9px] bg-saffron-500/30 text-saffron-300 px-1.5 py-0.2 rounded font-mono font-bold">
                AI GUIDE
              </span>
            </div>
            <p className="text-[10px] text-stone-300 font-medium">
              Citizen Digital Assistant
            </p>
          </div>

          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-saffron-500 group-hover:text-gov-950 transition-colors ml-0.5">
            <Sparkles className="w-3.5 h-3.5 text-saffron-400 group-hover:text-gov-950" />
          </div>
        </button>
      )}

      {/* Expanded Chat Drawer / Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[410px] h-[550px] bg-white rounded-3xl shadow-modal border border-stone-300/80 flex flex-col overflow-hidden animate-fade-in-scale">
          {/* Top Government Header */}
          <div className="bg-gradient-to-r from-gov-950 via-gov-900 to-gov-800 text-white p-4 flex items-center justify-between border-b border-gov-800 relative">
            {/* Top tricolor micro bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20]" />

            <div className="flex items-center gap-3">
              <NationalEmblem size="sm" variant="gold" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-black text-sm text-white">समवाय साथी</h3>
                  <span className="text-[9px] bg-saffron-500/30 text-saffron-300 px-1.5 py-0.2 rounded font-mono font-bold">
                    Gov-AI 2.0
                  </span>
                </div>
                <p className="text-[10px] text-stone-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  National DPI Service Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  speechEnabled ? 'text-saffron-400 bg-white/10' : 'text-stone-400 hover:text-white'
                }`}
                title={speechEnabled ? 'Disable Voice Speech' : 'Enable Voice Speech'}
              >
                {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-sandstone-50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-lg bg-gov-800 text-white flex-shrink-0 flex items-center justify-center font-bold text-[10px]">
                    🏛️
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-gov-800 text-white rounded-tr-none'
                      : 'bg-white border border-stone-200 text-stone-800 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed text-[11px] whitespace-pre-line">{msg.text}</p>

                  {/* Contextual Action Button */}
                  {msg.action && (
                    <button
                      onClick={() => {
                        navigate(msg.action!.path);
                        setIsOpen(false);
                      }}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gov-50 hover:bg-gov-100 text-gov-800 font-bold text-[10px] border border-gov-200 transition-all cursor-pointer shadow-2xs"
                    >
                      <span>{msg.action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}

                  <span className="block text-[8px] text-stone-400 text-right mt-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-saffron-600 text-white flex-shrink-0 flex items-center justify-center font-bold text-[10px]">
                    👤
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-stone-400 text-[10px] italic">
                <span className="w-2 h-2 rounded-full bg-gov-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-gov-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-gov-600 animate-bounce [animation-delay:0.4s]" />
                <span>SAMAVAY Saathi is checking sovereign records...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick FAQ Suggestion Chips */}
          <div className="p-2.5 bg-stone-100 border-t border-stone-200 overflow-x-auto">
            <span className="text-[9px] uppercase tracking-wider text-stone-500 font-bold block mb-1">
              Suggested Questions:
            </span>
            <div className="flex gap-1.5 no-scrollbar overflow-x-auto pb-0.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.question)}
                  className="px-2.5 py-1 bg-white hover:bg-gov-50 border border-stone-300 hover:border-gov-400 rounded-full text-[10px] text-stone-700 whitespace-nowrap transition cursor-pointer flex-shrink-0"
                >
                  {q.question}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about government services..."
              className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-gov-700 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 rounded-xl bg-gov-700 hover:bg-gov-800 disabled:opacity-40 text-white transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
