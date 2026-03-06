import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../utils/theme';
import { useApp } from '../context/AppContext';
import { Interview } from '../types';

export default function InterviewHistoryScreen() {
  const { getInterviewHistory } = useApp();
  const interviews = getInterviewHistory();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item }: { item: Interview }) => {
    return (
      <View style={styles.interviewCard}>
        <View style={styles.cardHeader}>
          <View style={styles.typeContainer}>
            <Text style={styles.typeEmoji}>
              {item.type === 'technical' ? '💻' : '👔'}
            </Text>
            <Text style={styles.typeText}>
              {item.type === 'technical' ? '技术面试' : '行为面试'}
            </Text>
          </View>
          <View
            style={[
              styles.scoreBadge,
              {
                backgroundColor:
                  item.score >= 80
                    ? colors.success
                    : item.score >= 60
                    ? colors.warning
                    : colors.error,
              },
            ]}
          >
            <Text style={styles.scoreText}>{item.score}分</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>日期</Text>
          <Text style={styles.infoValue}>{formatDate(item.date)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>时长</Text>
          <Text style={styles.infoValue}>{item.duration}分钟</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>回答问题</Text>
          <Text style={styles.infoValue}>{item.questions.length}个</Text>
        </View>

        <View style={styles.evaluationSection}>
          <Text style={styles.evaluationLabel}>面试评估</Text>
          <Text style={styles.evaluationText}>{item.evaluation}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={interviews}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📋</Text>
            <Text style={styles.emptyTitle}>暂无面试记录</Text>
            <Text style={styles.emptyText}>
              开始一次 AI 模拟面试吧！
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl * 2,
  },
  interviewCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeEmoji: {
    fontSize: 20,
    marginRight: spacing.xs,
  },
  typeText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
  },
  scoreBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  },
  scoreText: {
    color: '#fff',
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  infoLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: '500',
  },
  evaluationSection: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  evaluationLabel: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  evaluationText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
});
