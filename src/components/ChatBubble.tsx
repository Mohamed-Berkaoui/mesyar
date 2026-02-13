import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, MessageSquare, Mail } from 'lucide-react';
import './ChatBubble.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function getRateLimitState(): { timestamps: number[] } {
  try {
    const raw = localStorage.getItem('mesayir_chat_rl');
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { timestamps: [] };
}

function saveRateLimitState(timestamps: number[]) {
  localStorage.setItem('mesayir_chat_rl', JSON.stringify({ timestamps }));
}

function checkRateLimit(): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const state = getRateLimitState();
  const valid = state.timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  saveRateLimitState(valid);
  const remaining = RATE_LIMIT - valid.length;
  const resetIn = valid.length > 0 ? Math.ceil((RATE_WINDOW_MS - (now - valid[0])) / 1000) : 0;
  return { allowed: remaining > 0, remaining: Math.max(0, remaining), resetIn };
}

function recordRequest() {
  const now = Date.now();
  const state = getRateLimitState();
  const valid = state.timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  valid.push(now);
  saveRateLimitState(valid);
}

const WELCOME_MESSAGE = 'أهلاً بك في المساير! 👋\n\nكيف أقدر أساعدك اليوم؟ يمكنني مساعدتك في:\n• حساب تكلفة النقل\n• معرفة تفاصيل الخدمة\n• الإجابة على أسئلتك\n\nأو تواصل معنا مباشرة عبر الزري أدناه 👇';

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState(() => checkRateLimit());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Refresh rate limit info every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRateLimitInfo(checkRateLimit());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    // Check rate limit
    const rl = checkRateLimit();
    setRateLimitInfo(rl);
    if (!rl.allowed) {
      const mins = Math.ceil(rl.resetIn / 60);
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: trimmed },
        {
          role: 'assistant',
          content: `عذراً، لقد تجاوزت الحد الأقصى للرسائل (${RATE_LIMIT} رسائل كل 10 دقائق). يرجى المحاولة بعد ${mins} دقيقة.`,
        },
      ]);
      setInput('');
      return;
    }

    const userMessage: Message = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      recordRequest();
      setRateLimitInfo(checkRateLimit());

      const apiMessages = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (response.status === 429) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.error || 'لقد تجاوزت الحد الأقصى للرسائل. يرجى المحاولة لاحقاً.',
          },
        ]);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', response.status, errorData);
        throw new Error(errorData.error || `Failed: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      console.error('Chat error:', errorMsg);
      
      let displayMsg = 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.';
      if (errorMsg.includes('404')) {
        displayMsg = 'عذراً، لم يتم العثور على خدمة الـ API. يرجى نشر التطبيق على Vercel أولاً.';
      }
      
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: displayMsg },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'chat-window-open' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-header-avatar">
              <Bot size={20} />
            </div>
            <div>
              <div className="chat-header-title-row">
                <h3 className="chat-header-title">مساعد المساير</h3>
                <span className="chat-ai-badge"><Sparkles size={10} /> AI</span>
              </div>
              <span className="chat-header-status">مساعد ذكاء اصطناعي • متصل</span>
            </div>
          </div>
          <button
            className="chat-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="إغلاق المحادثة"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx}>
              <div
                className={`chat-msg ${msg.role === 'user' ? 'chat-msg-user' : 'chat-msg-assistant'}`}
              >
                <div className="chat-msg-icon">
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className="chat-msg-bubble">
                  {msg.content.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < msg.content.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
              {/* Quick contact buttons after welcome message */}
              {idx === 0 && msg.role === 'assistant' && messages.length === 1 && (
                <div className="chat-quick-actions">
                  <a
                    href="https://wa.me/966509155916"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chat-action-btn chat-action-whatsapp"
                  >
                    <MessageSquare size={16} />
                    واتساب
                  </a>
                  <a
                    href="mailto:Almsayr.inc@gmail.com"
                    className="chat-action-btn chat-action-email"
                  >
                    <Mail size={16} />
                    البريد الإلكتروني
                  </a>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="chat-msg chat-msg-assistant">
              <div className="chat-msg-icon">
                <Bot size={16} />
              </div>
              <div className="chat-msg-bubble chat-typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* AI Disclaimer */}
        <div className="chat-ai-disclaimer">
          <Sparkles size={12} />
          <span>مدعوم بالذكاء الاصطناعي — الردود قد لا تكون دقيقة دائماً</span>
          {rateLimitInfo.remaining <= 3 && (
            <span className="chat-rate-warn">
              {rateLimitInfo.remaining > 0
                ? `متبقي ${rateLimitInfo.remaining} رسائل`
                : `الحد الأقصى — انتظر ${Math.ceil(rateLimitInfo.resetIn / 60)} د`}
            </span>
          )}
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اكتب رسالتك هنا..."
            rows={1}
            dir="rtl"
            disabled={!rateLimitInfo.allowed}
          />
          <button
            className="chat-send-btn"
            onClick={sendMessage}
            disabled={isLoading || !input.trim() || !rateLimitInfo.allowed}
            aria-label="إرسال"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Floating Bubble */}
      {/* Floating Bubble */}
      <button
        className={`chat-bubble-btn ${isOpen ? 'chat-bubble-hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="فتح المحادثة"
      >
        <MessageCircle size={28} />
        <span className="chat-bubble-label">AI</span>
        <span className="chat-bubble-pulse"></span>
      </button>
    </>
  );
}
