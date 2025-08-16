import React, { useState } from 'react';
import './CodeInput.css';

const CodeInput = ({ onSubmit, disabled }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'sql', label: 'SQL' },
    { value: 'other', label: '其他' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim() && !disabled) {
      onSubmit(code, language);
      setCode('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  const handlePaste = (e) => {
    // 自动检测语言（简单实现）
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.includes('function') || pastedText.includes('const') || pastedText.includes('=>')) {
      setLanguage('javascript');
    } else if (pastedText.includes('def ') || pastedText.includes('import ')) {
      setLanguage('python');
    } else if (pastedText.includes('public class') || pastedText.includes('import java')) {
      setLanguage('java');
    } else if (pastedText.includes('#include') || pastedText.includes('std::')) {
      setLanguage('cpp');
    }
  };

  return (
    <div className="code-input-container">
      <form onSubmit={handleSubmit} className="code-input-form">
        <div className="input-header">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
            disabled={disabled}
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <div className="input-hint">
            💡 Ctrl+Enter 发送
          </div>
        </div>
        
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder="在这里粘贴您的代码，我将为您提供详细的代码审查建议..."
          className="code-textarea"
          disabled={disabled}
          rows={8}
        />
        
        <div className="input-actions">
          <div className="input-info">
            <span className="char-count">
              {code.length} 个字符
            </span>
          </div>
          <button
            type="submit"
            disabled={!code.trim() || disabled}
            className="submit-button"
          >
            {disabled ? '审查中...' : '开始审查'}
            <span className="submit-icon">🚀</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CodeInput;