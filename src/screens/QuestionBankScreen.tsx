import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, borderRadius, fontSize } from '../utils/theme';
import { questions, languages, difficulties } from '../data/questions';
import { useApp } from '../context/AppContext';
import { Question, QuestionLanguage, Difficulty } from '../types';

type RootStackParamList = {
  Main: any;
  QuestionDetail: { questionId: string };
};

export default function QuestionBankScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isSolved, isFavorite } = useApp();

  const [selectedLanguage, setSelectedLanguage] = useState<QuestionLanguage | '全部'>('全部');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | '全部'>('全部');
  const [searchText, setSearchText] = useState('');

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchLanguage = selectedLanguage === '全部' || q.language === selectedLanguage;
      const matchDifficulty = selectedDifficulty === '全部' || q.difficulty === selectedDifficulty;
      const matchSearch = q.title.toLowerCase().includes(searchText.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
      return matchLanguage && matchDifficulty && matchSearch;
    });
  }, [selectedLanguage, selectedDifficulty, searchText]);

  const renderQuestionItem = ({ item }: { item: Question }) => {
    const solved = isSolved(item.id);
    const favorite = isFavorite(item.id);

    return (
      <TouchableOpacity
        style={styles.questionCard}
        onPress={() => navigation.navigate('QuestionDetail', { questionId: item.id })}
      >
        <View style={styles.questionHeader}>
          <View style={styles.questionInfo}>
            <Text style={styles.questionLanguage}>{item.language}</Text>
            {solved && <Text style={styles.solvedTag}>已做</Text>}
            {favorite && <Text style={styles.favoriteTag}>⭐</Text>}
          </View>
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
              {item.difficulty === 'easy' ? '简单' : item.difficulty === 'medium' ? '中等' : '困难'}
            </Text>
          </View>
        </View>
        <Text style={styles.questionTitle}>{item.title}</Text>
        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="搜索题目..."
          placeholderTextColor={colors.textTertiary}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Language Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        <TouchableOpacity
          style={[styles.filterChip, selectedLanguage === '全部' && styles.filterChipActive]}
          onPress={() => setSelectedLanguage('全部')}
        >
          <Text style={[styles.filterText, selectedLanguage === '全部' && styles.filterTextActive]}>
            全部
          </Text>
        </TouchableOpacity>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang}
            style={[styles.filterChip, selectedLanguage === lang && styles.filterChipActive]}
            onPress={() => setSelectedLanguage(lang)}
          >
            <Text style={[styles.filterText, selectedLanguage === lang && styles.filterTextActive]}>
              {lang}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Difficulty Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        <TouchableOpacity
          style={[styles.filterChip, selectedDifficulty === '全部' && styles.filterChipActive]}
          onPress={() => setSelectedDifficulty('全部')}
        >
          <Text style={[styles.filterText, selectedDifficulty === '全部' && styles.filterTextActive]}>
            全部难度
          </Text>
        </TouchableOpacity>
        {difficulties.map(diff => (
          <TouchableOpacity
            key={diff}
            style={[
              styles.filterChip,
              selectedDifficulty === diff && styles.filterChipActive,
              {
                borderColor:
                  diff === 'easy'
                    ? colors.difficultyEasy
                    : diff === 'medium'
                    ? colors.difficultyMedium
                    : colors.difficultyHard,
              },
            ]}
            onPress={() => setSelectedDifficulty(diff)}
          >
            <Text
              style={[
                styles.filterText,
                selectedDifficulty === diff && styles.filterTextActive,
                { color: diff === 'easy' ? colors.difficultyEasy : diff === 'medium' ? colors.difficultyMedium : colors.difficultyHard },
              ]}
            >
              {diff === 'easy' ? '简单' : diff === 'medium' ? '中等' : '困难'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          共 {filteredQuestions.length} 道题目
        </Text>
      </View>

      {/* Question List */}
      <FlatList
        data={filteredQuestions}
        renderItem={renderQuestionItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>暂无匹配的题目</Text>
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
  searchContainer: {
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  searchInput: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterScroll: {
    maxHeight: 44,
  },
  filterContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: borderRadius.round,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  statsContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  statsText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  listContent: {
    padding: spacing.md,
    paddingTop: spacing.sm,
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
  favoriteTag: {
    fontSize: fontSize.xs,
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textTertiary,
  },
});
