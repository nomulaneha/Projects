import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { getChatGPTResponse, ChatMessage } from "../../services/api";
import { toast } from "react-hot-toast";

interface Message {
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "assistant",
      content: "Hello! I'm your AI Health Assistant. I can help you with:",
      timestamp: new Date(),
    },
    {
      type: "assistant",
      content:
        "• Understanding your heart health metrics\n• Providing lifestyle recommendations\n• Explaining medical terms\n• Emergency guidance\n• Diet and exercise advice",
      timestamp: new Date(),
    },
    {
      type: "assistant",
      content: "Feel free to ask me anything about your heart health!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      console.log("Preparing to send message to AI...");

      // Convert messages to ChatGPT format
      const chatMessages: ChatMessage[] = messages.map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
      }));

      // Add the latest user message
      chatMessages.push({
        role: "user",
        content: input,
      });

      console.log("Sending messages to backend:", chatMessages);

      // Get response from ChatGPT
      const response = await getChatGPTResponse(chatMessages);
      console.log("Received response from backend:", response);

      const aiMessage: Message = {
        type: "assistant",
        content: response.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error("Error getting AI response:", error);
      console.error("Error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      if (error.response?.status === 401) {
        toast.error("Please log in to continue using the AI assistant.");
      } else {
        toast.error(
          `Failed to get AI response: ${
            error.response?.data?.detail || error.message
          }`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-[500px] flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <Bot className="h-5 w-5 text-primary-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          AI Health Assistant
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`
                max-w-[80%] rounded-lg p-3 shadow-sm
                ${
                  message.type === "user"
                    ? "bg-primary-600 text-white ml-4"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white mr-4"
                }
              `}
            >
              <div className="flex items-start">
                {message.type === "assistant" && (
                  <Bot className="h-5 w-5 text-primary-600 mr-2 mt-1 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm whitespace-pre-line">
                    {message.content}
                  </p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                {message.type === "user" && (
                  <User className="h-5 w-5 text-white ml-2 mt-1 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex items-center space-x-2 max-w-[80%] shadow-sm">
              <Bot className="h-5 w-5 text-primary-600" />
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your heart health..."
            className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </Card>
  );
};
