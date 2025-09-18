import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MessageCircle, X, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function generateSessionId() {
  return Math.random().toString(36).substr(2, 9);
}

export default function TravelAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your Travel Assistant. How can I help you plan your trip today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // On first load, generate or get sessionId from localStorage
  useEffect(() => {
    let storedId = localStorage.getItem("travelAssistantSessionId");
    if (!storedId) {
      storedId = generateSessionId();
      localStorage.setItem("travelAssistantSessionId", storedId);
    }
    setSessionId(storedId);
  }, []);

  // Scroll to bottom when new message added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleOpen = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim() || !sessionId || isLoading) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      console.log('Sending message to backend...', { sessionId, message: input });
      const response = await axios.post("http://localhost:5001/chatbot", {
        sessionId,
        message: input,
      }, {
        timeout: 10000, // 10 second timeout
      });

      console.log('Received response from backend:', response.data);
      
      if (response.data && response.data.reply) {
        const botMsg = { role: "assistant", content: response.data.reply };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error in sendMessage:', error);
      let errorMessage = "Sorry, I'm having trouble connecting to the server. Please try again later.";
      
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error status:', error.response.status);
        errorMessage = `Error: ${error.response.status} - ${error.response.data?.error || 'Server error'}`;
      } else if (error.request) {
        console.error('No response received:', error.request);
        errorMessage = "Unable to connect to the server. Please check your connection and try again.";
      } else {
        console.error('Error:', error.message);
        errorMessage = `Error: ${error.message}`;
      }
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: errorMessage 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle pressing Enter to send
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-16 right-0 w-80 h-[450px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Travel Assistant Chatbot"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-blue-600 rounded-t-xl text-white font-semibold">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span>Travel Assistant</span>
              </div>
              <button
                onClick={toggleOpen}
                aria-label="Close chat"
                className="p-1 hover:bg-blue-700 rounded-full transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm" aria-live="polite">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] rounded-lg px-3 py-2 ${
                    msg.role === "user"
                      ? "ml-auto bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-200"
                      : "mr-auto bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                  }`}
                  aria-label={msg.role === "user" ? "You: " : "Assistant: "}
                >
                  {msg.content}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input box */}
            <div className="px-4 py-3 border-t border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="relative">
                <textarea
                  rows={1}
                  className="w-full resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ask me about your trip..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 bottom-2 text-blue-500 hover:text-blue-600 disabled:opacity-40"
                  aria-label="Send message"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={isLoading ? "animate-pulse" : ""}
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating chat button */}
      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all"
        aria-label={open ? "Close chat" : "Chat with our travel assistant"}
        title={open ? "Close chat" : "Chat with our travel assistant"}
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
          </div>
        )}
      </motion.button>
    </div>
  );
}
