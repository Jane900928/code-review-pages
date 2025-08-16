import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = () => {
  return (
    <div className="loading-container">
      <div className="loading-avatar">
        <div className="loading-robot">🤖</div>
      </div>
      <div className="loading-content">
        <div className="loading-message">
          <div className="loading-dots">
            <span className="loading-text">AI正在分析您的代码</span>
            <div className="dots">
              <div className="dot dot1"></div>
              <div className="dot dot2"></div>
              <div className="dot dot3"></div>
            </div>
          </div>
          <div className="loading-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;