import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import ChatMessage from './components/ChatMessage';
import CodeInput from './components/CodeInput';
import LoadingIndicator from './components/LoadingIndicator';
import { codeReviewAPI } from './services/api';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      content: '欢迎使用代码审查助手！请粘贴您的代码，我将为您提供详细的代码审查建议。',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCodeSubmit = async (code, language) => {
    if (!code.trim()) return;

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: code,
      language: language,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 调用代码审查API
      const reviewResult = await codeReviewAPI.reviewCode(code, language);
      
      // 添加助手回复
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: reviewResult,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // 添加错误消息
      const errorMessage = {
        id: Date.now() + 1,
        type: 'error',
        content: '抱歉，代码审查服务暂时不可用。请检查网络连接或稍后再试。',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'system',
        content: '欢迎使用代码审查助手！请粘贴您的代码，我将为您提供详细的代码审查建议。',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔍 代码审查助手</h1>
        <p>AI驱动的智能代码审查工具</p>
        <button onClick={clearChat} className="clear-button">
          清空对话
        </button>
      </header>

      <main className="app-main">
        <div className="chat-container">
          <div className="messages-container">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && <LoadingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <CodeInput onSubmit={handleCodeSubmit} disabled={isLoading} />
        </div>
      </main>

      <footer className="app-footer">
        <p>
          基于GitHub代码审查Agent构建 | 
          <a href="https://github.com/Jane900928/code-review-pages" target="_blank" rel="noopener noreferrer">
            查看源码
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;