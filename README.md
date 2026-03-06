# InterviewMaster - 面试练习 App

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.84.1-blue" alt="React Native">
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/React%20Navigation-7.x-blue" alt="React Navigation">
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-green" alt="Platform">
</p>

一款专为面试者设计的移动端应用，支持 **AI 视频模拟面试** 和 **编程题库练习**，帮助用户高效准备技术面试。

## 功能特性

### 1. AI 视频模拟面试

- 🎥 **实时视频对话**：模拟真实面试场景，与 AI 面试官进行互动
- 💬 **智能追问**：AI 根据回答内容进行深入追问
- 📊 **面试评估**：面试结束后生成详细的评估报告
- 📝 **面试记录**：保存历史面试记录，支持回顾复盘

### 2. 题库练习

- 📚 **多语言支持**：JavaScript, TypeScript, Python, Java, Go, C++, Rust
- 🎯 **难度分级**：简单、中等、困难三个难度等级
- 🔍 **智能筛选**：按语言、难度、标签快速筛选题目
- ✏️ **代码编辑**：内置代码编辑器，支持语法高亮
- 📖 **答案解析**：提交后查看参考答案和解题思路

### 3. 错题本

- ❌ **自动收录**：回答错误的题目自动进入错题本
- 🔄 **重新练习**：针对错题进行针对性训练
- 🗑️ **一键清空**：支持清空错题记录

### 4. 收藏夹

- ⭐ **收藏题目**：收藏有价值的题目便于复习
- 📋 **快速访问**：快速跳转到收藏的题目

### 5. 个人中心

- 📊 **学习统计**：已刷题数、错题数、收藏数、面试次数
- 🌐 **语言进度**：各编程语言刷题进度可视化
- ⚙️ **设置管理**：通知管理、深色模式等设置

## 技术栈

| 技术             | 版本   | 说明                  |
| ---------------- | ------ | --------------------- |
| React Native     | 0.84.1 | 跨平台移动应用框架    |
| TypeScript       | 5.8.3  | 类型安全的 JavaScript |
| React Navigation | 7.x    | 应用导航系统          |
| AsyncStorage     | -      | 本地数据持久化        |
| React Context    | -      | 状态管理              |

## 项目架构

```
Interview-APP/
├── App.tsx                     # 应用入口
├── src/
│   ├── components/             # 公共组件
│   │   └── LinearGradient.tsx # 渐变背景组件
│   ├── context/               # 状态管理
│   │   └── AppContext.tsx    # 全局状态上下文
│   ├── data/                  # 数据层
│   │   └── questions.ts      # 题库数据
│   ├── navigation/            # 导航配置
│   │   └── AppNavigator.tsx  # 导航器
│   ├── screens/              # 页面组件
│   │   ├── HomeScreen.tsx           # 首页
│   │   ├── QuestionBankScreen.tsx   # 题库列表
│   │   ├── QuestionDetailScreen.tsx # 题目详情
│   │   ├── InterviewScreen.tsx      # 面试选择
│   │   ├── InterviewChatScreen.tsx  # AI面试对话
│   │   ├── WrongQuestionsScreen.tsx # 错题本
│   │   ├── FavoritesScreen.tsx      # 收藏夹
│   │   ├── ProfileScreen.tsx        # 个人中心
│   │   └── InterviewHistoryScreen.tsx # 面试记录
│   ├── types/                # 类型定义
│   │   └── index.ts          # TypeScript类型
│   └── utils/                # 工具函数
│       └── theme.ts          # 主题配置
└── package.json               # 依赖配置
```

## 系统架构图

```
┌─────────────────────────────────────────────────────────────┐
│                      App.tsx                               │
│                  (应用入口 + Provider)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Navigation Layer                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Tab Navigator (底部导航)                 │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────┐ │   │
│  │  │  首页   │ │  题库   │ │ 面试   │ │ 错题  │ │我的│ │   │
│  │  └────────┘ └────────┘ └────────┘ └────────┘ └────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Stack Navigator (页面栈)               │   │
│  │   题目详情 │ AI面试 │ 收藏夹 │ 面试记录              │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Business Layer                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              AppContext (状态管理)                   │   │
│  │  • 已解决问题 • 错题 • 收藏 • 面试记录              │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Screens (业务页面)                      │   │
│  │  HomeScreen                                        │   │
│  │  QuestionBankScreen + QuestionDetailScreen          │   │
│  │  InterviewScreen + InterviewChatScreen             │   │
│  │  WrongQuestionsScreen + FavoritesScreen            │   │
│  │  ProfileScreen + InterviewHistoryScreen            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Data Layer                              │
│  ┌─────────────────┐  ┌─────────────────────────────┐    │
│  │  questions.ts   │  │    AsyncStorage              │    │
│  │  (内置题库数据)   │  │    (用户进度持久化)          │    │
│  │  • 17+ 编程题    │  │    • solvedQuestions        │    │
│  │  • AI面试问题    │  │    • wrongQuestions         │    │
│  │  • 多语言支持    │  │    • favoriteQuestions      │    │
│  └─────────────────┘  │    • interviews             │    │
│                        └─────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 数据模型

### Question (题目)

```typescript
interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  language: string;
  starterCode: string;
  solution: string;
  explanation: string;
  tags: string[];
}
```

### Interview (面试记录)

```typescript
interface Interview {
  id: string;
  type: "technical" | "behavioral";
  date: string;
  duration: number;
  questions: string[];
  evaluation: string;
  score: number;
}
```

### UserProgress (用户进度)

```typescript
interface UserProgress {
  solvedQuestions: string[];
  wrongQuestions: string[];
  favoriteQuestions: string[];
  interviews: Interview[];
}
```

## 快速开始

### 环境要求

- Node.js >= 22.11.0
- React Native CLI
- Android Studio / Xcode

### 安装依赖

```bash
# 安装项目依赖
npm install

# iOS 额外步骤
cd ios && pod install && cd ..
```

### 运行应用

```bash
# 启动 Metro bundler
npm start

# 运行 iOS
npm run ios

# 运行 Android
npm run android
```

### 构建 APK

```bash
# Android 调试包
cd android && ./gradlew assembleDebug
```

## 页面预览

| 首页                   | 题库          | 面试              |
| ---------------------- | ------------- | ----------------- |
| 欢迎 banner + 快速入口 | 语言/难度筛选 | 技术面/行为面选择 |
| 学习进度统计           | 题目卡片列表  | AI 面试对话       |

| 题目详情            | 错题本   | 个人中心 |
| ------------------- | -------- | -------- |
| 题目描述 + 代码编辑 | 错题列表 | 统计数据 |
| 提交/查看答案       | 重新练习 | 学习进度 |

## 内置题库

目前已包含 **17+** 道精选编程题目，覆盖以下语言：

- **JavaScript**: 两数之和、有效的括号、反转链表、防抖/节流函数、Promise.all
- **TypeScript**: 泛型查询、Partial/Required 实现
- **Python**: 合并有序数组、LRU 缓存
- **Java**: 反转字符串、单例模式
- **Go**: 并发计数器、Worker Pool
- **C++**: 智能指针
- **Rust**: Ownership、Result 错误处理

## AI 面试问题

- **技术面试**: 10+ 常见技术问题
- **行为面试**: 10+ 常见行为问题

## 贡献

欢迎提交 Issue 和 Pull Request！
