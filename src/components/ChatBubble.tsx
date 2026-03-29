import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../lib/utils';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hi! I can answer questions about Collect It delivery times, prohibited items, and pricing. How can I help?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Create a chat session with system instructions
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: 'You are a helpful customer support agent for "Collect It", an on-demand delivery service. You answer questions about delivery times (under 60 mins), prohibited items (hazardous materials, illegal goods, live animals), and pricing (base $15, surge 1.5x from 5-8pm). Keep answers short and friendly.',
        }
      });

      // Send the history (simplified for this demo by just sending the latest message, 
      // but ideally we'd pass history if needed. The SDK chat object handles history internally if we keep the instance, 
      // but here we recreate it. For a simple FAQ bot, single-turn is often enough, or we can just use generateContent).
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: 'You are a helpful customer support agent for "Collect It", an on-demand delivery service. You answer questions about delivery times (under 60 mins), prohibited items (hazardous materials, illegal goods, live animals), and pricing (base $15, surge 1.5x from 5-8pm). Keep answers short and friendly.',
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Sorry, I could not process that.' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I am having trouble connecting right now.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95',
          isOpen ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'
        )}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right',
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            <span className="font-semibold">Collect It Support</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-blue-100 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 h-[300px] overflow-y-auto flex flex-col gap-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-2 text-sm',
                msg.role === 'user'
                  ? 'bg-blue-600 text-white self-end rounded-tr-sm'
                  : 'bg-white text-gray-800 border border-gray-100 self-start rounded-tl-sm shadow-sm'
              )}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="bg-white text-gray-500 border border-gray-100 self-start rounded-2xl rounded-tl-sm shadow-sm px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-xs font-medium">Typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about delivery..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white p-2 rounded-full transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
