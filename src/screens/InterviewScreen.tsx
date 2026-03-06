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
import LinearGradient from '../components/LinearGradient';
import { colors, spacing, borderRadius, fontSize } from '../utils/theme';
import { useApp } from '../context/AppContext';

type RootStackParamList = {
  Main: any;
  InterviewChat: { type: 'technical' | 'behavioral' };
  InterviewHistory: undefined;
};

export default function InterviewScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { getInterviewHistory } = useApp();
  const interviews = getInterviewHistory();

  const technicalCount = interviews.filter(i => i.type === 'technical').length;
  const behavioralCount = interviews.filter(i => i.type === 'behavioral').length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* AI Interview Banner */}
        <LinearGradient style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerEmoji}>🤖</Text>
            <Text style={styles.bannerTitle}>AI 模拟面试</Text>
            <Text style={styles.bannerSubtitle}>
              与 AI 面试官进行实时视频对话，模拟真实面试场景
            </Text>
          </View>
        </LinearGradient>

        {/* Interview Types */}
        <Text style={styles.sectionTitle}>选择面试类型</Text>

        <TouchableOpacity
          style={styles.typeCard}
          onPress={() => navigation.navigate('InterviewChat', { type: 'technical' })}
        >
          <View style={styles.typeHeader}>
            <Text style={styles.typeEmoji}>💻</Text>
            <View style={styles.typeInfo}>
              <Text style={styles.typeTitle}>技术面试</Text>
              <Text style={styles.typeDescription}>
                涵盖算法、前端、后端、设计模式等技术问题
              </Text>
            </View>
          </View>
          <View style={styles.typeFooter}>
            <Text style={styles.typeCount}>已练习 {technicalCount} 次</Text>
            <Text style={styles.typeArrow}>开始 →</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.typeCard}
          onPress={() => navigation.navigate('InterviewChat', { type: 'behavioral' })}
        >
          <View style={styles.typeHeader}>
            <Text style={styles.typeEmoji}>👔</Text>
            <View style={styles.typeInfo}>
              <Text style={styles.typeTitle}>行为面试</Text>
              <Text style={styles.typeDescription}>
                职业规划、团队协作、问题解决等软技能问题
              </Text>
            </View>
          </View>
          <View style={styles.typeFooter}>
            <Text style={styles.typeCount}>已练习 {behavioralCount} 次</Text>
            <Text style={styles.typeArrow}>开始 →</Text>
          </View>
        </TouchableOpacity>

        {/* Features */}
        <Text style={styles.sectionTitle}>功能特点</Text>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🎥</Text>
            <Text style={styles.featureTitle}>实时视频</Text>
            <Text style={styles.featureDesc}>模拟真实视频面试场景</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>💬</Text>
            <Text style={styles.featureTitle}>智能对话</Text>
            <Text style={styles.featureDesc}>AI 面试官进行追问</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>📊</Text>
            <Text style={styles.featureTitle}>面试评估</Text>
            <Text style={styles.featureDesc}>提供详细的面试反馈</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>📝</Text>
            <Text style={styles.featureTitle}>面试记录</Text>
            <Text style={styles.featureDesc}>随时回顾面试内容</Text>
          </View>
        </View>

        {/* History */}
        {interviews.length > 0 && (
          <>
            <TouchableOpacity
              style={styles.historyButton}
              onPress={() => navigation.navigate('InterviewHistory')}
            >
              <Text style={styles.historyButtonText}>查看面试记录 →</Text>
            </TouchableOpacity>
          </>
        )}

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
  banner: {
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  bannerContent: {
    alignItems: 'center',
  },
  bannerEmoji: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  bannerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: spacing.sm,
  },
  bannerSubtitle: {
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  typeCard: {
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
  typeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  typeEmoji: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  typeInfo: {
    flex: 1,
  },
  typeTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  typeDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  typeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  typeCount: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  typeArrow: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: '600',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  featureItem: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featureEmoji: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  featureTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  featureDesc: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  historyButton: {
    backgroundColor: colors.card,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  historyButtonText: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40,
  },
});
