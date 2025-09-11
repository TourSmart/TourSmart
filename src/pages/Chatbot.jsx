import { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I\'m your Jharkhand travel assistant. How can I help you today?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        'I can help you with information about tourist spots, local events, and travel tips in Jharkhand.',
        'Would you like to know about popular destinations in Jharkhand?',
        'I can assist with travel planning, local cuisine recommendations, and cultural insights.',
        'What specific information are you looking for about Jharkhand?',
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: prevMessages.length + 2,
          text: randomResponse,
          sender: 'bot',
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen-main bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">TourSmart Chat Assistant</h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Chat header */}
          <div className="bg-primary-600 text-white p-4 flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
            <div className="font-medium">TourSmart Assistant</div>
            <div className="ml-auto flex space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Ask me about places to visit, things to do, or travel tips in Jharkhand.
            </p>
          </form>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'Best time to visit Jharkhand?',
            'Top attractions in Ranchi',
            'Local festivals this month',
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputValue(suggestion)}
              className="bg-white border border-gray-200 rounded-lg p-3 text-sm hover:bg-gray-50 text-left"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
