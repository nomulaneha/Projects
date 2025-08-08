import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const GeminiAIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const prompt = `As a medical AI assistant, provide helpful suggestions and insights for a patient with the following query: ${userMessage}. Focus on heart health and general well-being. Remember to be supportive and informative while noting that this is not a replacement for professional medical advice.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Add assistant message to chat
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('Error getting Gemini response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again later.' 
      }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="p-4 bg-blue-600 text-white rounded-t-lg">
        <h2 className="text-xl font-semibold">HeartGuard AI Assistant</h2>
        <p className="text-sm opacity-90">Get personalized health suggestions</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="animate-pulse">Thinking...</div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask for health suggestions..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}; 