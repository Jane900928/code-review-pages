// 代码审查Agent示例
// 这是一个简单的代码审查逻辑示例，您可以根据需要扩展

class CodeReviewAgent {
  constructor() {
    this.rules = {
      // 通用代码规则
      general: [
        {
          name: '函数长度检查',
          pattern: /function\s+\w+\([^)]*\)\s*{[^}]{200,}/g,
          message: '函数过长，建议拆分为更小的函数',
          severity: 'warning'
        },
        {
          name: '变量命名检查',
          pattern: /\b[a-z][a-z0-9]*[A-Z]/g,
          message: '建议使用驼峰命名法',
          severity: 'info'
        }
      ],
      
      // JavaScript特定规则
      javascript: [
        {
          name: 'console.log检查',
          pattern: /console\.log\(/g,
          message: '生产环境中应移除console.log语句',
          severity: 'warning'
        },
        {
          name: 'var使用检查',
          pattern: /\bvar\s+/g,
          message: '建议使用let或const替代var',
          severity: 'info'
        },
        {
          name: '相等比较检查',
          pattern: /[^=!]==|!=[^=]/g,
          message: '建议使用===或!==进行严格比较',
          severity: 'warning'
        }
      ],
      
      // Python特定规则
      python: [
        {
          name: 'print语句检查',
          pattern: /print\(/g,
          message: '生产代码中应使用logging替代print',
          severity: 'info'
        },
        {
          name: '导入顺序检查',
          pattern: /from\s+\w+\s+import.*\nimport/g,
          message: '建议先写import语句，再写from...import语句',
          severity: 'info'
        }
      ]
    };
    
    this.qualityMetrics = {
      complexity: 0,
      maintainability: 0,
      readability: 0,
      security: 0
    };
  }

  // 主要的代码审查方法
  async reviewCode(code, language) {
    const analysis = {
      issues: [],
      suggestions: [],
      metrics: { ...this.qualityMetrics },
      summary: ''
    };

    try {
      // 1. 基础代码分析
      this.analyzeBasics(code, analysis);
      
      // 2. 语言特定分析
      this.analyzeLanguageSpecific(code, language, analysis);
      
      // 3. 代码质量评估
      this.calculateMetrics(code, analysis);
      
      // 4. 生成建议
      this.generateSuggestions(code, language, analysis);
      
      // 5. 创建总结
      analysis.summary = this.createSummary(analysis);
      
      return this.formatReviewResult(analysis);
      
    } catch (error) {
      console.error('代码审查失败:', error);
      return this.createErrorResponse(error);
    }
  }

  // 基础代码分析
  analyzeBasics(code, analysis) {
    const lines = code.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim()).length;
    
    // 检查代码长度
    if (nonEmptyLines > 100) {
      analysis.issues.push({
        type: 'complexity',
        message: '代码文件较长，建议拆分为多个模块',
        line: 0,
        severity: 'info'
      });
    }
    
    // 检查通用规则
    this.rules.general.forEach(rule => {
      const matches = code.match(rule.pattern);
      if (matches) {
        analysis.issues.push({
          type: 'style',
          message: rule.message,
          count: matches.length,
          severity: rule.severity
        });
      }
    });
  }

  // 语言特定分析
  analyzeLanguageSpecific(code, language, analysis) {
    const languageRules = this.rules[language];
    if (!languageRules) return;
    
    languageRules.forEach(rule => {
      const matches = code.match(rule.pattern);
      if (matches) {
        analysis.issues.push({
          type: 'language-specific',
          message: rule.message,
          count: matches.length,
          severity: rule.severity,
          rule: rule.name
        });
      }
    });
  }

  // 计算代码质量指标
  calculateMetrics(code, analysis) {
    const lines = code.split('\n');
    const codeLines = lines.filter(line => line.trim() && !line.trim().startsWith('//')).length;
    
    // 复杂度评估（简化版）
    const cyclomaticIndicators = (code.match(/if|for|while|switch|catch/g) || []).length;
    analysis.metrics.complexity = Math.max(1, Math.min(10, 10 - Math.floor(cyclomaticIndicators / 5)));
    
    // 可读性评估
    const avgLineLength = codeLines > 0 ? code.length / codeLines : 0;
    analysis.metrics.readability = avgLineLength < 80 ? 8 : Math.max(3, 8 - Math.floor((avgLineLength - 80) / 20));
    
    // 可维护性评估
    const functionCount = (code.match(/function|def |class /g) || []).length;
    analysis.metrics.maintainability = Math.min(10, 5 + Math.floor(functionCount / 2));
    
    // 安全性评估（基础检查）
    const securityIssues = (code.match(/eval\(|innerHTML|document\.write/g) || []).length;
    analysis.metrics.security = Math.max(1, 10 - securityIssues * 2);
  }

  // 生成改进建议
  generateSuggestions(code, language, analysis) {
    // 基于分析结果生成具体建议
    if (analysis.metrics.complexity < 5) {
      analysis.suggestions.push('考虑重构复杂的函数，使用更简洁的逻辑');
    }
    
    if (analysis.metrics.readability < 6) {
      analysis.suggestions.push('改善代码格式，添加适当的注释和空行');
    }
    
    if (analysis.metrics.security < 7) {
      analysis.suggestions.push('注意安全性问题，避免使用危险的函数和方法');
    }
    
    // 语言特定建议
    if (language === 'javascript') {
      if (!code.includes('const') && !code.includes('let')) {
        analysis.suggestions.push('使用现代JavaScript特性，如const和let');
      }
    }
  }

  // 创建审查总结
  createSummary(analysis) {
    const issueCount = analysis.issues.length;
    const avgScore = Object.values(analysis.metrics).reduce((a, b) => a + b, 0) / 4;
    
    let summary = `代码审查完成！发现 ${issueCount} 个问题。\n`;
    summary += `总体质量评分: ${Math.round(avgScore * 10)}/100\n\n`;
    
    if (issueCount === 0) {
      summary += '✅ 代码质量良好，未发现明显问题。';
    } else {
      summary += '📋 主要问题:\n';
      analysis.issues.slice(0, 3).forEach((issue, index) => {
        summary += `${index + 1}. ${issue.message}\n`;
      });
    }
    
    return summary;
  }

  // 格式化审查结果
  formatReviewResult(analysis) {
    const { issues, suggestions, metrics, summary } = analysis;
    
    let result = `🔍 **代码审查报告**\n\n`;
    result += `📊 **质量指标**\n`;
    result += `- 复杂度: ${metrics.complexity}/10\n`;
    result += `- 可读性: ${metrics.readability}/10\n`;
    result += `- 可维护性: ${metrics.maintainability}/10\n`;
    result += `- 安全性: ${metrics.security}/10\n\n`;
    
    if (issues.length > 0) {
      result += `⚠️ **发现的问题** (${issues.length}个)\n`;
      issues.forEach((issue, index) => {
        const emoji = issue.severity === 'error' ? '🚫' : issue.severity === 'warning' ? '⚠️' : '💡';
        result += `${emoji} ${issue.message}\n`;
      });
      result += '\n';
    }
    
    if (suggestions.length > 0) {
      result += `💡 **改进建议**\n`;
      suggestions.forEach(suggestion => {
        result += `- ${suggestion}\n`;
      });
      result += '\n';
    }
    
    result += `📝 **总结**\n${summary}`;
    
    return result;
  }

  // 错误响应
  createErrorResponse(error) {
    return `❌ 代码审查过程中发生错误: ${error.message}\n\n请检查代码格式是否正确，或稍后重试。`;
  }
}

// 导出审查Agent
export { CodeReviewAgent };

// 使用示例:
// const agent = new CodeReviewAgent();
// const result = await agent.reviewCode(code, 'javascript');