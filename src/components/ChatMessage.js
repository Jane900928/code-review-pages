import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const { type, content, timestamp, language } = message;

  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderContent = () => {
    if (type === 'user' && language) {
      return (
        <div className="code-block">
          <div className="code-header">
            <span className="language-tag">{language}</span>
          </div>
          <pre className="code-content">
            <code>{content}</code>
          </pre>
        </div>
      );
    }

    if (type === 'assistant') {
      return (
        <div className="review-content">
          <div className="review-header">
            <span className="review-icon">🔍</span>
            <span className="review-title">代码审查结果</span>
          </div>
          <div className="review-body">
            {content.split('\n').map((line, index) => (
              <p key={index} className="review-line">
                {line}
              </p>
            ))}
          </div>
        </div>
      );
    }

    return <p className="message-text">{content}</p>;
  };

  return (
    <div className={`message message-${type}`}>
      <div className="message-avatar">
        {type === 'user' && '👤'}
        {type === 'assistant' && '🤖'}
        {type === 'system' && 'ℹ️'}
        {type === 'error' && '❌'}
      </div>
      <div className="message-content">
        <div className="message-body">
          {renderContent()}
        </div>
        <div className="message-time">
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;