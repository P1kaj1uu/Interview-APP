import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, borderRadius, fontSize } from '../utils/theme';
import { useApp } from '../context/AppContext';
import { Question } from '../types';

type RootStackParamList = {
  Main: any;
  QuestionDetail: { questionId: string };
};

export default function FavoritesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { getFavoriteQuestions, toggleFavorite, isSolved } = useApp();

  const favoriteQuestions = getFavoriteQuestions();

  const renderItem = ({ item }: { item: Question }) => {
    const solved = isSolved(item.id);

    return (
      <TouchableOpacity
        style={styles.questionCard}
        onPress={() => navigation.navigate('QuestionDetail', { questionId: item.id })}
      >
        <View style={styles.questionHeader}>
          <View style={styles.questionInfo}>
            <Text style={styles.questionLanguage}>{item.language}</Text>
            {solved && <Text style={styles.solvedTag}>已解决</Text>}
          </View>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
            <Text style={styles.favoriteButton}>⭐</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.questionTitle}>{item.title}</Text>
        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.cardFooter}>
          <View
            style={[
              styles.difficultyBadge,
              {
                backgroundColor:
                  item.difficulty === 'easy'
                    ? colors.difficultyEasy
                    : item.difficulty === 'medium'
                    ? colors.difficultyMedium
                    : colors.difficultyHard,
              },
            ]}
          >
            <Text style={styles.difficultyText}>
              {item.difficulty === 'easy'
                ? '简单'
                : item.difficulty === 'medium'
                ? '中等'
                : '困难'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.practiceButton}
            onPress={() =>
              navigation.navigate('QuestionDetail', { questionId: item.id })
            }
          >
            <Text style={styles.practiceButtonText}>开始练习</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {favoriteQuestions.length > 0 && (
        <View style={styles.header}>
          <Text style={styles.headerText}>
            共收藏 {favoriteQuestions.length} 道题目
          </Text>
        </View>
      )}

      <FlatList
        data={favoriteQuestions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>⭐</Text>
            <Text style={styles.emptyTitle}>收藏夹为空</Text>
            <Text style={styles.emptyText}>
              遇到有价值的题目可以收藏起来哦
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl * 2,
  },
  questionCard: {
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
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  questionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  questionLanguage: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: '500',
  },
  solvedTag: {
    fontSize: fontSize.xs,
    color: colors.success,
    fontWeight: '500',
  },
  favoriteButton: {
    fontSize: fontSize.lg,
  },
  questionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  tag: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  tagText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  difficultyText: {
    color: '#fff',
    fontSize: fontSize.xs,
    fontWeight: '500',
  },
  practiceButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  practiceButtonText: {
    color: '#fff',
    fontSize: fontSize.sm,
    fontWeight: '500',
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
