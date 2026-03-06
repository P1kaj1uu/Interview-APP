import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from '../components/LinearGradient';
import { colors, spacing, borderRadius, fontSize } from '../utils/theme';
import { useApp } from '../context/AppContext';
import { questions } from '../data/questions';

type RootStackParamList = {
  Main: any;
  QuestionDetail: { questionId: string };
  InterviewChat: { type: 'technical' | 'behavioral' };
  Interview: undefined;
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { progress, getSolvedQuestions } = useApp();

  const solvedQuestions = getSolvedQuestions();
  const wrongCount = progress.wrongQuestions.length;
  const favoriteCount = progress.favoriteQuestions.length;
  const totalQuestions = questions.length;

  // 每日推荐 - 随机一道未完成的题目
  const recommendedQuestion = questions.find(
    q => !progress.solvedQuestions.includes(q.id)
  ) || questions[0];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 顶部区域 */}
        <View style={styles.header}>
          <Text style={styles.greeting}>你好，面试者 👋</Text>
          <Text style={styles.subtitle}>准备今天的面试了吗？</Text>
        </View>

        {/* Banner区域 */}
        <LinearGradient style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>AI 模拟面试</Text>
            <Text style={styles.bannerSubtitle}>与 AI 面试官实时互动</Text>
            <TouchableOpacity
              style={styles.bannerButton}
              onPress={() => navigation.navigate('Interview')}
            >
              <Text style={styles.bannerButtonText}>立即开始</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bannerEmoji}>🎯</Text>
        </LinearGradient>

        {/* Stats区域 */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{solvedQuestions.length}</Text>
            <Text style={styles.statLabel}>已刷题</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{wrongCount}</Text>
            <Text style={styles.statLabel}>错题数</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{favoriteCount}</Text>
            <Text style={styles.statLabel}>收藏</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalQuestions}</Text>
            <Text style={styles.statLabel}>总题数</Text>
          </View>
        </View>

        {/* Progress区域 */}
        <View style={styles.progressCard}>
          <Text style={styles.cardTitle}>学习进度</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(solvedQuestions.length / totalQuestions) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            已完成 {Math.round((solvedQuestions.length / totalQuestions) * 100)}%
          </Text>
        </View>

        {/* Recommended区域 */}
        {recommendedQuestion && (
          <View style={styles.recommendedCard}>
            <View style={styles.recommendedHeader}>
              <Text style={styles.cardTitle}>今日推荐</Text>
              <View
                style={[
                  styles.difficultyBadge,
                  {
                    backgroundColor:
                      recommendedQuestion.difficulty === 'easy'
                        ? colors.difficultyEasy
                        : recommendedQuestion.difficulty === 'medium'
                        ? colors.difficultyMedium
                        : colors.difficultyHard,
                  },
                ]}
              >
                <Text style={styles.difficultyText}>
                  {recommendedQuestion.difficulty === 'easy'
                    ? '简单'
                    : recommendedQuestion.difficulty === 'medium'
                    ? '中等'
                    : '困难'}
                </Text>
              </View>
            </View>
            <Text style={styles.recommendedTitle}>{recommendedQuestion.title}</Text>
            <Text style={styles.recommendedLanguage}>
              {recommendedQuestion.language}
            </Text>
            <TouchableOpacity
              style={styles.recommendedButton}
              onPress={() =>
                navigation.navigate('QuestionDetail', { questionId: recommendedQuestion.id })
              }
            >
              <Text style={styles.recommendedButtonText}>开始练习</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 快速行动 */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate('Interview')}
          >
            <Text style={styles.actionIcon}>🎥</Text>
            <Text style={styles.actionText}>模拟面试</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() =>
              navigation.navigate('QuestionDetail', { questionId: recommendedQuestion?.id || 'js-001' })
            }
          >
            <Text style={styles.actionIcon}>📝</Text>
            <Text style={styles.actionText}>随机刷题</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionText}>能力测评</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xl * 2,
  },
  header: {
    marginBottom: spacing.lg,
  },
  greeting: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  banner: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: '#fff',
  },
  bannerSubtitle: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: spacing.xs,
  },
  bannerButton: {
    backgroundColor: '#fff',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: fontSize.sm,
  },
  bannerEmoji: {
    fontSize: 48,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  progressCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: borderRadius.round,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
  },
  progressText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'right',
  },
  recommendedCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  difficultyText: {
    color: '#fff',
    fontSize: fontSize.xs,
    fontWeight: '500',
  },
  recommendedTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.sm,
  },
  recommendedLanguage: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  recommendedButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  recommendedButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: fontSize.md,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  actionText: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: '500',
  },
});
