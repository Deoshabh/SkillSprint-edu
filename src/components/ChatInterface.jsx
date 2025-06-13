
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  Sparkles
} from 'lucide-react';

const ChatInterface = ({ isOpen, onToggle, user }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi there! 👋 I'm your AI learning assistant powered by Meta Llama-4. I'm here to help you with any questions about your courses, explain concepts, or even generate practice problems. What would you like to learn about today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call Together AI API with Llama 4
      const response = await callTogetherAI(inputMessage, messages);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Together AI Error:', error);
      toast({
        title: "AI Assistant Unavailable",
        description: "Using fallback responses. Check your Together AI configuration.",
        variant: "destructive"
      });
      
      // Fallback to simulated response
      const fallbackResponse = await simulateAIResponse(inputMessage);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: fallbackResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const callTogetherAI = async (message, conversationHistory) => {
    const TOGETHER_API_KEY = import.meta.env.VITE_TOGETHER_API_KEY;
    
    if (!TOGETHER_API_KEY) {
      throw new Error('Together AI API key not configured');
    }

    // Prepare conversation context
    const systemPrompt = `You are an AI learning assistant for SkillSprint, an educational platform. You help students with:
- Programming (JavaScript, React, Node.js, Python, etc.)
- Data Structures & Algorithms
- English Communication
- Design & AI Tools
- Aptitude & Reasoning

Be helpful, encouraging, and provide practical examples. Keep responses concise but informative.`;

    const conversationMessages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-10).map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOGETHER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo',
        messages: conversationMessages,
        max_tokens: 1024,
        temperature: 0.7,
        top_p: 0.9,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Together AI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
  };

  const simulateAIResponse = async (message) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock responses based on message content
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
      return "Great question about JavaScript! 🚀 JavaScript is a versatile programming language that's essential for web development. Here are some key concepts:\n\n• **Variables**: Use `let` and `const` for block-scoped variables\n• **Functions**: Can be declared or expressed as arrow functions\n• **Promises**: Handle asynchronous operations\n• **DOM Manipulation**: Interact with web page elements\n\nWould you like me to explain any of these concepts in more detail or create a practice exercise for you?";
    }
    
    if (lowerMessage.includes('react')) {
      return "React is an amazing library for building user interfaces! ⚛️ Here's what makes it special:\n\n• **Components**: Reusable UI building blocks\n• **JSX**: Write HTML-like syntax in JavaScript\n• **State Management**: Handle dynamic data with hooks\n• **Virtual DOM**: Efficient rendering and updates\n\nI can help you with specific React concepts, create coding challenges, or explain best practices. What aspect of React interests you most?";
    }
    
    if (lowerMessage.includes('quiz') || lowerMessage.includes('test')) {
      return "I'd love to create a personalized quiz for you! 🧠 I can generate questions on:\n\n• Programming concepts (JavaScript, React, Python, etc.)\n• Data Structures & Algorithms\n• English Communication\n• Design principles\n• Aptitude and reasoning\n\nJust tell me which topic you'd like to practice, and I'll create custom questions tailored to your learning level. What subject should we focus on?";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
      return "I'm here to help! 💪 Here's how I can assist you:\n\n• **Explain concepts**: Break down complex topics into simple terms\n• **Code review**: Help debug and improve your code\n• **Practice problems**: Generate custom exercises\n• **Study planning**: Suggest learning paths and schedules\n• **Mock interviews**: Prepare for technical interviews\n\nWhat specific challenge are you facing? Share your question or code, and I'll provide detailed guidance!";
    }
    
    // Default response
    return "That's an interesting question! 🤔 I'm powered by Meta Llama-4 and I'm here to help with all your learning needs. I can:\n\n• Answer technical questions\n• Explain complex concepts\n• Generate practice problems\n• Review your code\n• Create study plans\n• Help with assignments\n\nCould you provide more details about what you'd like to learn or what specific help you need? The more context you give me, the better I can assist you!";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={onToggle}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative"
        >
          <MessageCircle className="w-6 h-6" />
          {user && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          )}
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={`fixed bottom-6 right-6 z-40 bg-white rounded-2xl shadow-2xl border border-gray-200 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-xs opacity-90">Powered by Meta Llama-4</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-white/20"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[480px] scrollbar-hide">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
                        : 'bg-gray-100'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                      )}
                    </div>
                    
                    <div className={`chat-bubble ${message.type}`}>
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      <div className={`text-xs mt-1 opacity-70 ${
                        message.type === 'user' ? 'text-white' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="chat-bubble ai">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={user ? "Ask me anything about your courses..." : "Sign in to chat with AI assistant"}
                  disabled={!user || isLoading}
                  className="w-full p-3 pr-12 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  rows="1"
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
              </div>
              
              <Button
                onClick={handleSendMessage}
                disabled={!user || !inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {!user && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                Sign in to start chatting with your AI assistant
              </p>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}

export default ChatInterface;
