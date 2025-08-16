# 🔍 代码审查聊天助手

一个基于React构建的智能代码审查聊天界面，通过AI驱动的代码分析为开发者提供专业的代码审查建议。

## ✨ 功能特性

- 🤖 **智能代码分析**: 基于AI的代码质量评估和建议
- 💬 **聊天式交互**: 直观友好的对话界面
- 🌍 **多语言支持**: 支持JavaScript、Python、Java、C++等主流编程语言
- 📱 **响应式设计**: 完美适配桌面端和移动端
- ⚡ **实时反馈**: 快速获得代码审查结果
- 🎨 **现代UI**: 精美的渐变设计和流畅动画

## 🚀 在线体验

访问：[https://jane900928.github.io/code-review-pages](https://jane900928.github.io/code-review-pages)

## 📦 本地运行

### 环境要求

- Node.js 16.0+
- npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/Jane900928/code-review-pages.git
cd code-review-pages
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
```

3. **启动开发服务器**
```bash
npm start
# 或
yarn start
```

4. **构建生产版本**
```bash
npm run build
# 或
yarn build
```

## 🔧 配置说明

### 环境变量

创建 `.env` 文件来配置API端点：

```env
REACT_APP_API_URL=http://localhost:3001/api
```

### API集成

要集成真实的代码审查服务，请修改 `src/services/api.js` 文件中的API配置：

```javascript
// 替换为您的代码审查API端点
this.baseURL = process.env.REACT_APP_API_URL || 'your-api-endpoint';
```

## 🏗️ 项目结构

```
src/
├── components/           # React组件
│   ├── ChatMessage.js   # 聊天消息组件
│   ├── CodeInput.js     # 代码输入组件
│   └── LoadingIndicator.js # 加载指示器
├── services/            # 服务层
│   └── api.js          # API服务
├── App.js              # 主应用组件
└── index.js            # 应用入口
```

## 🔌 API接口

### 代码审查接口

**POST** `/api/code-review`

**请求参数:**
```json
{
  "code": "string",      // 代码内容
  "language": "string",  // 编程语言
  "timestamp": "string"  // 时间戳
}
```

**响应格式:**
```json
{
  "review": "string",    // 审查结果
  "status": "success"    // 状态
}
```

## 🎯 使用方法

1. **选择编程语言**: 在下拉菜单中选择代码对应的编程语言
2. **粘贴代码**: 在文本框中输入或粘贴需要审查的代码
3. **提交审查**: 点击"开始审查"按钮或使用快捷键 `Ctrl+Enter`
4. **查看结果**: AI将分析代码并提供详细的审查建议

## 🌟 特色功能

### 智能语言检测
系统会根据粘贴的代码内容自动检测编程语言，提高使用效率。

### 多维度分析
- 代码质量评估
- 性能优化建议
- 安全性检查
- 可维护性分析
- 最佳实践推荐

### 实时交互
采用现代化的聊天界面设计，提供流畅的用户体验。

## 🛠️ 技术栈

- **前端框架**: React 18.2+
- **样式方案**: CSS3 + 渐变设计
- **HTTP客户端**: Axios
- **构建工具**: Create React App
- **部署平台**: GitHub Pages

## 📱 响应式设计

应用采用移动优先的响应式设计理念：

- **桌面端**: 完整功能体验
- **平板端**: 优化的布局适配
- **手机端**: 触摸友好的界面

## 🚀 部署

### GitHub Pages自动部署

项目配置了GitHub Actions自动部署：

1. 推送代码到main分支
2. 自动触发构建流程
3. 部署到GitHub Pages

### 手动部署

```bash
npm run build
npm run deploy
```

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- **项目地址**: [https://github.com/Jane900928/code-review-pages](https://github.com/Jane900928/code-review-pages)
- **问题反馈**: [Issues](https://github.com/Jane900928/code-review-pages/issues)

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

---

⭐ 如果这个项目对您有帮助，请给我们一个Star！