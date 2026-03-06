import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, borderRadius, fontSize } from '../utils/theme';
import { useApp } from '../context/AppContext';
import { questions } from '../data/questions';

type RootStackParamList = {
  Main: any;
  Favorites: undefined;
  InterviewHistory: undefined;
};

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    progress,
    getSolvedQuestions,
    getWrongQuestions,
    getFavoriteQuestions,
    getInterviewHistory,
  } = useApp();

  const solvedQuestions = getSolvedQuestions();
  const wrongQuestions = getWrongQuestions();
  const favoriteQuestions = getFavoriteQuestions();
  const interviews = getInterviewHistory();

  const languages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'C++', 'Rust'];

  // 计算统计数据
  const languageStats = languages.reduce((acc, lang) => {
    const count = solvedQuestions.filter(q => q.language === lang).length;
    if (count > 0) {
      acc[lang] = count;
    }
    return acc;
  }, {} as Record<string, number>);

  const menuItems = [
    {
      icon: '⭐',
      title: '我的收藏',
      subtitle: `${favoriteQuestions.length} 道题目`,
      onPress: () => navigation.navigate('Favorites'),
    },
    {
      icon: '📋',
      title: '面试记录',
      subtitle: `${interviews.length} 次面试`,
      onPress: () => navigation.navigate('InterviewHistory'),
    },
    {
      icon: '❌',
      title: '错题本',
      subtitle: `${wrongQuestions.length} 道错题`,
      onPress: () => {},
    },
  ];

  const settingsItems = [
    {
      icon: '⚙️',
      title: '设置',
      onPress: () => {},
    },
    {
      icon: '🔔',
      title: '通知管理',
      onPress: () => {},
    },
    {
      icon: '🌙',
      title: '深色模式',
      onPress: () => {},
    },
    {
      icon: '📖',
      title: '使用帮助',
      onPress: () => {},
    },
    {
      icon: 'ℹ️',
      title: '关于我们',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>👤</Text>
          </View>
          <Text style={styles.nickname}>面试者</Text>
          <Text style={styles.level}>加油！坚持刷题</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{solvedQuestions.length}</Text>
            <Text style={styles.statLabel}>已刷题</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{wrongQuestions.length}</Text>
            <Text style={styles.statLabel}>错题</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{favoriteQuestions.length}</Text>
            <Text style={styles.statLabel}>收藏</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{interviews.length}</Text>
            <Text style={styles.statLabel}>面试</Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressCard}>
          <Text style={styles.sectionTitle}>学习进度</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(solvedQuestions.length / questions.length) * 100}%` },
              ]}
            />
          </View>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              已完成 {Math.round((solvedQuestions.length / questions.length) * 100)}%
            </Text>
            <Text style={styles.progressText}>
              {solvedQuestions.length} / {questions.length} 题
            </Text>
          </View>

          {/* Language Stats */}
          {Object.keys(languageStats).length > 0 && (
            <View style={styles.languageStats}>
              <Text style={styles.languageStatsTitle}>各语言进度</Text>
              <View style={styles.languageGrid}>
                {Object.entries(languageStats).map(([lang, count]) => (
                  <View key={lang} style={styles.languageItem}>
                    <Text style={styles.languageName}>{lang}</Text>
                    <Text style={styles.languageCount}>{count}题</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>功能</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <View style={styles.menuInfo}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>设置</Text>
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>InterviewMaster v1.0.0</Text>
        </View>

        <View style={styles.bottomPadding} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    fontSize: 40,
  },
  nickname: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  level: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
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
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
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
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  progressText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  languageStats: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  languageStatsTitle: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  languageItem: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  languageName: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  languageCount: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.primary,
  },
  menuSection: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: fontSize.md,
    color: colors.text,
  },
  menuSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: fontSize.lg,
    color: colors.textTertiary,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  versionText: {
    fontSize: fontSize.sm,
    color: colors.textTertiary,
  },
  bottomPadding: {
    height: 40,
  },
});
