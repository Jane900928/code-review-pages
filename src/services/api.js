import axios from 'axios';

// 代码审查API服务
class CodeReviewAPI {
  constructor() {
    // 这里可以配置您的代码审查服务端点
    // 目前使用模拟数据，您需要替换为实际的API地址
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // 调用代码审查Agent
  async reviewCode(code, language) {
    try {
      // 首先尝试调用真实的API
      const response = await this.client.post('/code-review', {
        code,
        language,
        timestamp: new Date().toISOString(),
      });

      return response.data.review || response.data;
    } catch (error) {
      console.warn('API调用失败，使用模拟数据:', error.message);
      
      // API调用失败时，返回模拟的代码审查结果
      return this.getMockReview(code, language);
    }
  }

  // 模拟代码审查结果（用于演示）
  getMockReview(code, language) {
    // 模拟延迟
    return new Promise((resolve) => {
      setTimeout(() => {
        const review = this.generateMockReview(code, language);
        resolve(review);
      }, 2000 + Math.random() * 2000); // 2-4秒的随机延迟
    });
  }

  // 生成模拟审查结果
  generateMockReview(code, language) {
    const codeLength = code.length;
    const lineCount = code.split('\n').length;
    
    const reviews = [
      `📋 **代码审查报告**

🔍 **基本信息:**
- 语言: ${this.getLanguageName(language)}
- 代码行数: ${lineCount} 行
- 字符数: ${codeLength} 个

✅ **优点:**
- 代码结构清晰，逻辑合理
- 变量命名规范，具有良好的可读性
- 适当使用了注释说明

⚠️ **建议改进:**
1. **性能优化**: 考虑使用更高效的算法或数据结构
2. **错误处理**: 建议添加更完善的异常处理机制
3. **代码复用**: 部分逻辑可以抽取为公共函数
4. **安全性**: 建议对输入参数进行更严格的验证

🛠️ **具体建议:**
- 添加输入参数校验
- 优化循环结构，减少时间复杂度
- 增加单元测试覆盖
- 考虑使用设计模式提高代码的可维护性

📊 **代码质量评分: 85/100**

总体来说，这是一段质量较高的代码，通过上述改进建议可以进一步提升代码质量。`,

      `🔍 **智能代码分析结果**

📈 **代码质量指标:**
- 可读性: 良好 ⭐⭐⭐⭐
- 性能: 中等 ⭐⭐⭐
- 安全性: 良好 ⭐⭐⭐⭐
- 可维护性: 优秀 ⭐⭐⭐⭐⭐

🎯 **主要发现:**

**✅ 代码亮点:**
- 函数划分合理，职责单一
- 使用了现代${this.getLanguageName(language)}特性
- 代码风格一致，符合编码规范

**🔧 需要改进的地方:**
1. **内存管理**: 注意及时释放不需要的资源
2. **边界条件**: 部分场景下的边界条件处理不够完善
3. **日志记录**: 建议添加适当的日志输出便于调试
4. **配置管理**: 硬编码的值建议提取为配置项

**🚀 优化建议:**
- 使用缓存机制提高重复操作的性能
- 实现优雅的降级处理
- 添加监控和告警机制
- 考虑并发安全性问题

**📝 代码风格建议:**
- 保持一致的缩进和格式
- 函数和变量命名更加语义化
- 添加必要的类型注解（如果语言支持）

这段代码展现了良好的编程基础，继续保持！`,

      `🤖 **AI代码审查助手分析报告**

🔬 **深度分析结果:**

**代码复杂度评估:**
- 循环复杂度: ${Math.floor(Math.random() * 10) + 1}
- 认知复杂度: ${Math.floor(Math.random() * 15) + 5}
- 代码行数: ${lineCount}

**🏆 代码优势:**
- 架构设计合理，模块化程度高
- 错误处理机制相对完善
- 代码注释适当，有助于理解

**⚡ 性能关注点:**
1. **算法效率**: 部分算法可以进一步优化
2. **资源利用**: 内存和CPU使用可以更加高效
3. **I/O操作**: 建议异步处理提高响应速度

**🔒 安全建议:**
- 输入验证: 加强对外部输入的验证和过滤
- 权限控制: 确保操作权限的正确性
- 数据保护: 敏感数据需要适当的加密处理

**🧪 测试建议:**
- 单元测试覆盖率建议达到80%以上
- 集成测试确保模块间协作正常
- 性能测试验证在高负载下的表现

**📚 文档建议:**
- API文档需要更加详细
- 添加使用示例和最佳实践
- 维护更新日志和版本说明

**最终评级: A-**
代码质量整体较高，通过持续改进可以达到更高水准。`
    ];

    return reviews[Math.floor(Math.random() * reviews.length)];
  }

  // 获取语言友好名称
  getLanguageName(language) {
    const languageMap = {
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      python: 'Python',
      java: 'Java',
      cpp: 'C++',
      csharp: 'C#',
      go: 'Go',
      rust: 'Rust',
      php: 'PHP',
      ruby: 'Ruby',
      swift: 'Swift',
      kotlin: 'Kotlin',
      html: 'HTML',
      css: 'CSS',
      sql: 'SQL',
      other: '其他语言'
    };
    return languageMap[language] || language;
  }

  // 健康检查
  async healthCheck() {
    try {
      const response = await this.client.get('/health');
      return response.data;
    } catch (error) {
      console.warn('健康检查失败:', error.message);
      return { status: 'unavailable', message: '服务暂时不可用' };
    }
  }
}

// 导出单例实例
export const codeReviewAPI = new CodeReviewAPI();

// 导出类以便于测试
export { CodeReviewAPI };