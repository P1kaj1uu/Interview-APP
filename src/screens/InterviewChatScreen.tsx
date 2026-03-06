import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors, spacing, borderRadius, fontSize } from '../utils/theme';
import { aiTechnicalQuestions, aiBehavioralQuestions } from '../data/questions';
import { useApp } from '../context/AppContext';
import { Interview, AIQuestion } from '../types';

type ParamList = {
  InterviewChat: { type: 'technical' | 'behavioral' };
};

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
}

export default function InterviewChatScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'InterviewChat'>>();
  const { type } = route.params;

  const { addInterview } = useApp();
  const scrollViewRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isInterviewing, setIsInterviewing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [startTime] = useState(Date.now());
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);

  const questions = type === 'technical' ? aiTechnicalQuestions : aiBehavioralQuestions;

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isTyping]);

  const startInterview = () => {
    setIsInterviewing(true);
    const firstQuestion = questions[0];
    setAskedQuestions([firstQuestion.id]);
    setMessages([
      {
        id: '1',
        role: 'ai',
        content: getWelcomeMessage(),
      },
      {
        id: '2',
        role: 'ai',
        content: firstQuestion.question,
      },
    ]);
    setCurrentQuestionIndex(0);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const getWelcomeMessage = () => {
    if (type === 'technical') {
      return '你好！我是你的 AI 面试官，现在开始技术面试。我会问你一些技术相关的问题，请尽量详细地回答。准备好了吗？';
    } else {
      return '你好！我是你的 AI 面试官，现在开始行为面试。我会问你一些关于职业规划、团队协作等方面的问题。请放松，真实回答即可。准备好了吗？';
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      handleAIResponse();
    }, 1500);
  };

  const handleAIResponse = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const tips = currentQuestion?.tips || '';

    const responses = [
      `感谢你的回答。${tips}\n\n让我们继续下一个问题。`,
      `明白了。${tips}\n\n接下来我想了解一下更多细节。`,
      `很好。${tips}\n\n我们继续吧。`,
    ];

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= questions.length) {
      // 面试结束
      const endMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: '非常感谢你的参与！面试到此结束。让我为你生成一份面试评估报告。',
      };
      setMessages(prev => [...prev, endMessage]);

      setTimeout(() => {
        finishInterview();
      }, 2000);
    } else {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: responses[Math.floor(Math.random() * responses.length)] + '\n\n' + questions[nextIndex].question,
      };
      setMessages(prev => [...prev, aiMessage]);
      setCurrentQuestionIndex(nextIndex);
      setAskedQuestions(prev => [...prev, questions[nextIndex].id]);
    }

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const finishInterview = () => {
    const duration = Math.round((Date.now() - startTime) / 60000);
    const score = Math.floor(Math.random() * 30) + 70;

    const evaluations = [
      '整体表现不错，对技术概念有较好的理解。建议加强系统设计方面的知识。',
      '回答思路清晰，展现了良好的问题分析能力。可以更深入地探讨技术细节。',
      '表现良好，展现了扎实的技术基础。建议多关注最新的技术发展趋势。',
      '回答较为全面，展现了较强的学习能力。可以进一步提升编码实践经验。',
    ];

    const evaluation = evaluations[Math.floor(Math.random() * evaluations.length)];

    const interview: Interview = {
      id: Date.now().toString(),
      type,
      date: new Date().toISOString(),
      duration,
      questions: askedQuestions,
      evaluation,
      score,
    };

    addInterview(interview);

    Alert.alert(
      '面试评估报告',
      `面试时长：${duration}分钟\n综合得分：${score}分\n\n${evaluation}`,
      [
        {
          text: '查看详情',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const endInterview = () => {
    Alert.alert(
      '结束面试',
      '确定要结束当前面试吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          style: 'destructive',
          onPress: () => {
            setIsInterviewing(false);
            setMessages([]);
            setCurrentQuestionIndex(0);
          },
        },
      ]
    );
  };

  if (!isInterviewing) {
    return (
      <View style={styles.startContainer}>
        <Text style={styles.startEmoji}>
          {type === 'technical' ? '💻' : '👔'}
        </Text>
        <Text style={styles.startTitle}>
          {type === 'technical' ? '技术面试' : '行为面试'}
        </Text>
        <Text style={styles.startDesc}>
          {type === 'technical'
            ? '包含算法、设计模式、系统设计等问题'
            : '包含职业规划、团队协作、问题解决等问题'}
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>面试流程</Text>
          <Text style={styles.infoText}>1. AI 面试官提出问题</Text>
          <Text style={styles.infoText}>2. 你通过文字或语音回答</Text>
          <Text style={styles.infoText}>3. AI 面试官进行追问</Text>
          <Text style={styles.infoText}>4. 面试结束后获得评估报告</Text>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={startInterview}>
          <Text style={styles.startButtonText}>开始面试</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Animated.Text
              style={[styles.avatar, { transform: [{ scale: pulseAnim }] }]}
            >
              🤖
            </Animated.Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>AI 面试官</Text>
            <Text style={styles.headerSubtitle}>
              {type === 'technical' ? '技术面试' : '行为面试'}
              {isTyping ? ' · 正在输入...' : ''}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={endInterview}>
          <Text style={styles.endButton}>结束</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(message => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.role === 'ai' ? styles.aiMessage : styles.userMessage,
            ]}
          >
            {message.role === 'ai' && (
              <Text style={styles.messageAvatar}>🤖</Text>
            )}
            <View
              style={[
                styles.messageContent,
                message.role === 'user' && styles.userMessageContent,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.role === 'user' && styles.userMessageText,
                ]}
              >
                {message.content}
              </Text>
            </View>
          </View>
        ))}

        {isTyping && (
          <View style={[styles.messageBubble, styles.aiMessage]}>
            <Text style={styles.messageAvatar}>🤖</Text>
            <View style={[styles.messageContent, styles.typingContent]}>
              <Text style={styles.typingText}>正在思考...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="输入你的回答..."
          placeholderTextColor={colors.textTertiary}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendButtonText}>发送</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  startContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  startEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  startTitle: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  startDesc: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    width: '100%',
    marginBottom: spacing.xl,
  },
  infoTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl * 2,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  startButtonText: {
    color: '#fff',
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avatar: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  endButton: {
    fontSize: fontSize.md,
    color: colors.error,
    fontWeight: '500',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing.md,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  messageContent: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderTopLeftRadius: spacing.xs,
    padding: spacing.md,
    maxWidth: '80%',
  },
  userMessageContent: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: spacing.xs,
  },
  typingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#fff',
  },
  typingText: {
    fontSize: fontSize.sm,
    color: colors.textTertiary,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
    color: colors.text,
    maxHeight: 100,
    marginRight: spacing.sm,
  },
  sendButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  sendButtonDisabled: {
    backgroundColor: colors.border,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});
