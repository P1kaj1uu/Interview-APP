import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors, spacing, borderRadius, fontSize } from '../utils/theme';
import { questions } from '../data/questions';
import { useApp } from '../context/AppContext';

type ParamList = {
  QuestionDetail: { questionId: string };
};

export default function QuestionDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'QuestionDetail'>>();
  const { questionId } = route.params;

  const {
    toggleFavorite,
    isFavorite,
    isSolved,
    addSolvedQuestion,
    addWrongQuestion,
  } = useApp();

  const question = questions.find(q => q.id === questionId);
  const [code, setCode] = useState(question?.starterCode || '');
  const [showSolution, setShowSolution] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (question) {
      setCode(question.starterCode);
    }
  }, [question]);

  if (!question) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>题目不存在</Text>
      </View>
    );
  }

  const favorite = isFavorite(question.id);
  const solved = isSolved(question.id);

  const handleFavorite = () => {
    toggleFavorite(question.id);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    Alert.alert(
      '提交答案',
      '请确认你的答案是否正确？',
      [
        {
          text: '不确定',
          style: 'cancel',
        },
        {
          text: '回答错误',
          style: 'destructive',
          onPress: () => {
            addWrongQuestion(question.id);
          },
        },
        {
          text: '回答正确',
          onPress: () => {
            addSolvedQuestion(question.id);
            setShowSolution(true);
          },
        },
      ]
    );
  };

  const handleShowSolution = () => {
    setShowSolution(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 标题区域 */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View
              style={[
                styles.difficultyBadge,
                {
                  backgroundColor:
                    question.difficulty === 'easy'
                      ? colors.difficultyEasy
                      : question.difficulty === 'medium'
                      ? colors.difficultyMedium
                      : colors.difficultyHard,
                },
              ]}
            >
              <Text style={styles.difficultyText}>
                {question.difficulty === 'easy'
                  ? '简单'
                  : question.difficulty === 'medium'
                  ? '中等'
                  : '困难'}
              </Text>
            </View>
            <Text style={styles.languageText}>{question.language}</Text>
            {solved && <Text style={styles.solvedText}>已解决</Text>}
          </View>
          <Text style={styles.title}>{question.title}</Text>
          <View style={styles.tagsContainer}>
            {question.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 题目描述区域   */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>题目描述</Text>
          <Text style={styles.description}>{question.description}</Text>
        </View>

        {/* 代码编辑区域 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>代码编辑</Text>
            <TouchableOpacity onPress={handleFavorite}>
              <Text style={styles.favoriteButton}>{favorite ? '⭐ 已收藏' : '☆ 收藏'}</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.codeInput}
            value={code}
            onChangeText={setCode}
            multiline
            textAlignVertical="top"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="在这里编写代码..."
            placeholderTextColor={colors.textTertiary}
          />
        </View>

        {/* 操作区域 */}
        <View style={styles.actions}>
          {!showSolution ? (
            <>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>提交答案</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.hintButton}
                onPress={handleShowSolution}
              >
                <Text style={styles.hintButtonText}>查看答案</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.solutionContainer}>
              <Text style={styles.sectionTitle}>参考答案</Text>
              <TextInput
                style={styles.solutionCode}
                value={question.solution}
                editable={false}
                multiline
                textAlignVertical="top"
              />

              <Text style={styles.sectionTitle}>解题思路</Text>
              <Text style={styles.explanation}>{question.explanation}</Text>

              {submitted && !solved && (
                <TouchableOpacity
                  style={styles.markSolvedButton}
                  onPress={() => addSolvedQuestion(question.id)}
                >
                  <Text style={styles.markSolvedButtonText}>标记为已解决</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        <View style={styles.bottomPadding} />
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
  header: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  difficultyText: {
    color: '#fff',
    fontSize: fontSize.xs,
    fontWeight: '500',
  },
  languageText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '500',
    marginRight: spacing.sm,
  },
  solvedText: {
    fontSize: fontSize.sm,
    color: colors.success,
    fontWeight: '500',
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tag: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  tagText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  section: {
    backgroundColor: colors.card,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 24,
  },
  favoriteButton: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '500',
  },
  codeInput: {
    backgroundColor: '#1E1E1E',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSize.sm,
    color: '#D4D4D4',
    minHeight: 200,
    fontFamily: 'Courier',
  },
  actions: {
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  hintButton: {
    backgroundColor: colors.card,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  hintButtonText: {
    color: colors.primary,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  solutionContainer: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  solutionCode: {
    backgroundColor: '#1E1E1E',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSize.sm,
    color: '#D4D4D4',
    minHeight: 150,
    fontFamily: 'Courier',
    marginBottom: spacing.md,
  },
  explanation: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 24,
  },
  markSolvedButton: {
    backgroundColor: colors.success,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  markSolvedButtonText: {
    color: '#fff',
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  errorText: {
    fontSize: fontSize.lg,
    color: colors.error,
    textAlign: 'center',
    marginTop: 100,
  },
  bottomPadding: {
    height: 40,
  },
});
