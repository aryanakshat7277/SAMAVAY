import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HelpCircle,
  X,
  Send,
  User,
  ArrowRight,
  ShieldCheck,
  Volume2,
  VolumeX,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  PhoneCall,
  FileText,
  Clock,
  Landmark,
  Compass
} from 'lucide-react';
import { NationalEmblem } from './NationalEmblem';

interface HelpdeskMessage {
  id: string;
  sender: 'helpdesk' | 'citizen';
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

  const initialMessages: HelpdeskMessage[] = [
    {
      id: '1',
      sender: 'helpdesk',
      text: 'नमस्ते! समवाय नागरिक सेवा सहायता केंद्र में आपका स्वागत है।\n\nआप किसी भी सरकारी सेवा, पात्रता, दस्तावेज़ सत्यापन, या आवेदन की स्थिति के बारे में जानकारी प्राप्त कर सकते हैं।',
      timestamp: '10:00 AM'
    },
    {
      id: '2',
      sender: 'helpdesk',
      text: 'Welcome to the SAMAVAY Citizen Helpdesk. How may we assist your public service request today? You can choose a common topic below or type your inquiry:',
      timestamp: '10:00 AM'
    }
  ];

  const [messages, setMessages] = useState<HelpdeskMessage[]>(initialMessages);

  const quickQuestions = [
    {
      question: 'How does 1-click verification auto-fill my form?',
      answer: 'With your explicit DPDP consent, SAMAVAY securely queries official government registries (Bhoomi Land Records, VAHAN, Aadhaar e-KYC, DigiLocker). Because these records are already verified by the sovereign government, up to 62% of duplicate paperwork is eliminated with zero physical photocopies.',
      action: { label: 'Explore Verified Services', path: '/services' }
    },
    {
      question: 'Where can I track my submitted applications?',
      answer: 'You can monitor the live, multi-stage progress of your applications in real time from your Citizen Dashboard. Each step reflects authoritative timestamps from the handling department.',
      action: { label: 'Open Application Tracker', path: '/applications' }
    },
    {
      question: 'How do I manage or revoke my DPDP Privacy Consent?',
      answer: 'Under Section 7 of the Digital Personal Data Protection (DPDP) Act 2023, you retain complete sovereignty over your records. You can review, limit, or revoke consent granted to any department at any time.',
      action: { label: 'Manage Data Permissions', path: '/dashboard/permissions' }
    },
    {
      question: 'Which departments and platforms are connected?',
      answer: 'SAMAVAY unifies 8 official public platforms: Bhoomi Land Records (Revenue), SARATHI 4.0 & VAHAN (Transport), e-NagarPalika (Municipal), DigiLocker, PFMS Direct Benefit, and UIDAI Identity Gateway.',
      action: { label: 'View Connected Platforms', path: '/admin/platform-status' }
    },
    {
      question: 'What is the official National Citizen Helpline?',
      answer: 'For toll-free telephone assistance, dial 1800-11-7262 (SAMAVAY) or 1947 (UIDAI). Helpdesk officers are available Monday to Saturday, 8:00 AM to 8:00 PM IST.',
      action: { label: 'Visit Help & FAQs', path: '/help' }
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

    const citizenMsg: HelpdeskMessage = {
      id: Date.now().toString(),
      sender: 'citizen',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, citizenMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "Thank you for reaching out to the Citizen Helpdesk. You can explore all connected government services directly in our directory or review your dashboard for application tracking.";
      let actionObj: { label: string; path: string } | undefined = { label: 'Explore Services', path: '/services' };

      const lower = text.toLowerCase();
      if (lower.includes('reuse') || lower.includes('62%') || lower.includes('auto') || lower.includes('fill') || lower.includes('document')) {
        responseText = "SAMAVAY links with official state registries (Bhoomi, SARATHI, DigiLocker) to pre-fill verified details. You only need to verify and submit the missing fields with zero physical paperwork.";
        actionObj = { label: 'View Available Services', path: '/services' };
      } else if (lower.includes('dpdp') || lower.includes('consent') || lower.includes('privacy') || lower.includes('revoke')) {
        responseText = "All inter-departmental data exchange strictly conforms to the Digital Personal Data Protection (DPDP) Act 2023. You can review or revoke any department authorization at any time.";
        actionObj = { label: 'Review Permissions', path: '/dashboard/permissions' };
      } else if (lower.includes('track') || lower.includes('status') || lower.includes('application') || lower.includes('reference')) {
        responseText = "You can track the live departmental review status and download digitally signed completion certificates from your Applications page.";
        actionObj = { label: 'Go to Applications', path: '/applications' };
      } else if (lower.includes('tax') || lower.includes('property') || lower.includes('bhoomi') || lower.includes('land')) {
        responseText = "Property Tax Assessment and Khata Mutation are integrated with Bhoomi Land Records. Survey numbers, land dimensions, and title records are fetched automatically.";
        actionObj = { label: 'Apply for Property Tax', path: '/services' };
      } else if (lower.includes('licence') || lower.includes('license') || lower.includes('dl') || lower.includes('vehicle') || lower.includes('vahan')) {
        responseText = "Transport services are linked with SARATHI 4.0 and VAHAN. Driving licence renewals and vehicle NOCs are processed with valid digital pollution and insurance tokens.";
        actionObj = { label: 'Transport Services', path: '/services' };
      } else if (lower.includes('farmer') || lower.includes('kisan') || lower.includes('subsidy') || lower.includes('pm-kisan')) {
        responseText = "Farmer welfare and PM-KISAN schemes verify land holdings directly via Bhoomi and bank accounts via PFMS/NPCI for seamless direct benefit transfers.";
        actionObj = { label: 'Farmer Welfare Schemes', path: '/services' };
      } else if (lower.includes('helpline') || lower.includes('phone') || lower.includes('contact') || lower.includes('call')) {
        responseText = "The National SAMAVAY Toll-Free Citizen Helpline is 1800-11-7262. You can also reach state-specific municipal helpdesks via our directory.";
        actionObj = { label: 'Citizen Help Center', path: '/help' };
      }

      const deskMsg: HelpdeskMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'helpdesk',
        text: responseText,
        action: actionObj,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, deskMsg]);
      setIsTyping(false);

      if (speechEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(responseText);
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    }, 600);
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 font-sans">
      {/* Helpdesk Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 sm:gap-2.5 bg-gov-900 hover:bg-gov-950 text-white pl-2.5 pr-3 sm:pl-3.5 sm:pr-4 py-2 sm:py-2.5 rounded-full shadow-xl hover:shadow-2xl border border-gov-700/80 transition-all duration-200 cursor-pointer"
          title="Open Citizen Helpdesk & Service Navigator"
        >
          {/* Emblem Icon */}
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-saffron-500/20 border border-saffron-400/40 flex items-center justify-center">
              <NationalEmblem size="sm" variant="gold" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-2 border-gov-950 animate-pulse" />
          </div>

          <div className="text-left hidden xs:block">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-tight font-serif text-white">
                नागरिक सहायता
              </span>
              <span className="text-[9px] bg-gov-700 text-gov-100 px-1.5 py-0.2 rounded font-mono font-bold hidden sm:inline-block">
                HELPDESK
              </span>
            </div>
            <p className="text-[10px] text-stone-300 font-medium hidden sm:block">
              Citizen Support & Guide
            </p>
          </div>

          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gov-700 group-hover:text-white transition-colors ml-0.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-300 group-hover:text-white" />
          </div>
        </button>
      )}

      {/* Expanded Helpdesk Drawer / Window */}
      {isOpen && (
        <div className="w-[calc(100vw-1.5rem)] max-w-[420px] h-[min(560px,calc(100vh-4rem))] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fade-in-scale">
          {/* Top Government Header */}
          <div className="bg-gov-900 text-white p-4 flex items-center justify-between border-b border-gov-800 relative">
            {/* Top tricolor micro bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20]" />

            <div className="flex items-center gap-3">
              <NationalEmblem size="sm" variant="gold" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-sm text-white">नागरिक सेवा केंद्र</h3>
                  <span className="text-[9px] bg-white/15 text-slate-200 px-1.5 py-0.2 rounded font-mono font-bold">
                    OFFICIAL
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  National Citizen Guidance & Navigator
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  speechEnabled ? 'text-saffron-400 bg-white/10' : 'text-slate-400 hover:text-white'
                }`}
                title={speechEnabled ? 'Disable Voice Speech' : 'Enable Voice Speech'}
              >
                {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Close Helpdesk"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Official Notice Micro-Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-1.5 flex items-center justify-between text-[10px] text-slate-600">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              DPDP Act 2023 Compliant Citizen Desk
            </span>
            <span className="font-mono text-gov-800 font-bold">Toll-Free: 1800-11-7262</span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'citizen' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'helpdesk' && (
                  <div className="w-7 h-7 rounded-xl bg-gov-800 text-white flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-xs">
                    <Landmark className="w-3.5 h-3.5 text-saffron-400" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs shadow-2xs ${
                    msg.sender === 'citizen'
                      ? 'bg-gov-800 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none'
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

                  <span className="block text-[8px] text-slate-400 text-right mt-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'citizen' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-700 text-white flex-shrink-0 flex items-center justify-center font-bold text-[10px]">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 text-[10px] italic">
                <span className="w-2 h-2 rounded-full bg-gov-700 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-gov-700 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-gov-700 animate-bounce [animation-delay:0.4s]" />
                <span>Checking official public registries...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick FAQ Suggestion Chips */}
          <div className="p-2.5 bg-slate-100 border-t border-slate-200 overflow-x-auto">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">
              Common Questions:
            </span>
            <div className="flex gap-1.5 no-scrollbar overflow-x-auto pb-0.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.question)}
                  className="px-2.5 py-1 bg-white hover:bg-gov-50 border border-slate-300 hover:border-gov-400 rounded-full text-[10px] text-slate-700 whitespace-nowrap transition cursor-pointer flex-shrink-0"
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
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about public services, tracking, or documents..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gov-700 focus:bg-white"
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
