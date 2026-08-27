import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader } from "lucide-react";
import ChatbotService, { ChatMessage as IChatMessage } from "../services/ChatbotService";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../locales/translations";

export const Chatbot: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatbotService, setChatbotService] = useState<ChatbotService | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize chatbot service
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    if (apiKey) {
      setChatbotService(new ChatbotService(apiKey));
    }
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || !chatbotService || isLoading) return;

    const userMessage: IChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: inputValue,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const assistantMessage = await chatbotService.sendMessage(
        inputValue,
        language
      );
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorText = (translations[language as keyof typeof translations]?.chatbot || translations.en.chatbot).error;
      const errorMessage: IChatMessage = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: errorText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([]);
    if (chatbotService) {
      chatbotService.clearHistory();
    }
  };

  const t = translations[language as keyof typeof translations]?.chatbot || translations.en.chatbot;
  const welcomeMessage = t.welcome;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && messages.length === 0) {
            // Add welcome message on first open
            setMessages([
              {
                id: "welcome",
                role: "assistant",
                content: welcomeMessage,
                timestamp: Date.now(),
              },
            ]);
          }
        }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#121316] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Open chatbot"
      >
        <MessageCircle
          className={`w-6 h-6 transition-all duration-300 ${
            isOpen ? "scale-0" : "scale-100"
          }`}
        />
        <X
          className={`w-6 h-6 absolute transition-all duration-300 ${
            isOpen ? "scale-100" : "scale-0"
          }`}
        />
        <div className="absolute bottom-16 right-0 bg-white text-[#121316] px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {t.title}
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[80vh] rounded-2xl bg-white shadow-2xl flex flex-col border border-neutral-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#121316] to-[#2a2a2f] text-white px-6 py-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">
                {t.title}
              </h3>
              <p className="text-sm text-neutral-300">
                {t.subtitle}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-2 rounded-lg transition-colors"
              aria-label="Close chatbot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center px-4">
                <div>
                  <MessageCircle className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                  <p className="text-neutral-500 text-sm">
                    {t.startConversation}
                  </p>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  } animate-in fade-in duration-300`}
                >
                  <div
                    className={`max-w-xs lg:max-w-sm xl:max-w-md px-4 py-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-[#121316] text-white rounded-br-none"
                        : "bg-white border border-neutral-200 text-[#121316] rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                    {msg.relatedLinks && msg.relatedLinks.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-current border-opacity-20 space-y-2">
                        {msg.relatedLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            className={`block text-xs font-medium transition-colors ${
                              msg.role === "user"
                                ? "text-blue-300 hover:text-blue-100"
                                : "text-blue-600 hover:text-blue-800"
                            }`}
                          >
                            → {link.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex justify-start animate-in fade-in">
                <div className="bg-white border border-neutral-200 px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                  <Loader className="w-4 h-4 text-[#121316] animate-spin" />
                  <span className="text-sm text-neutral-500">
                    {t.thinking}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-neutral-200 bg-white p-4 space-y-2">
            {messages.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                {t.clearHistory}
              </button>
            )}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.placeholder}
                disabled={isLoading || !chatbotService}
                className="flex-1 px-4 py-2 bg-neutral-100 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#121316] transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim() || !chatbotService}
                className="bg-[#121316] text-white p-2 rounded-lg hover:bg-[#2a2a2f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-xs text-neutral-400">
              {t.poweredBy}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
