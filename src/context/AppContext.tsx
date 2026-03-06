import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, Interview, Question } from '../types';
import { questions } from '../data/questions';

const STORAGE_KEY = '@interview_app_progress';

interface AppContextType {
  progress: UserProgress;
  isLoading: boolean;
  addWrongQuestion: (questionId: string) => void;
  removeWrongQuestion: (questionId: string) => void;
  addSolvedQuestion: (questionId: string) => void;
  toggleFavorite: (questionId: string) => void;
  isFavorite: (questionId: string) => boolean;
  isSolved: (questionId: string) => boolean;
  isWrong: (questionId: string) => boolean;
  addInterview: (interview: Interview) => void;
  clearWrongQuestions: () => void;
  getFavoriteQuestions: () => Question[];
  getWrongQuestions: () => Question[];
  getSolvedQuestions: () => Question[];
  getInterviewHistory: () => Interview[];
}

const defaultProgress: UserProgress = {
  solvedQuestions: [],
  wrongQuestions: [],
  favoriteQuestions: [],
  interviews: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async (newProgress: UserProgress) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const addWrongQuestion = (questionId: string) => {
    const newProgress = {
      ...progress,
      wrongQuestions: progress.wrongQuestions.includes(questionId)
        ? progress.wrongQuestions
        : [...progress.wrongQuestions, questionId],
    };
    saveProgress(newProgress);
  };

  const removeWrongQuestion = (questionId: string) => {
    const newProgress = {
      ...progress,
      wrongQuestions: progress.wrongQuestions.filter(id => id !== questionId),
    };
    saveProgress(newProgress);
  };

  const addSolvedQuestion = (questionId: string) => {
    const newProgress = {
      ...progress,
      solvedQuestions: progress.solvedQuestions.includes(questionId)
        ? progress.solvedQuestions
        : [...progress.solvedQuestions, questionId],
    };
    saveProgress(newProgress);
  };

  const toggleFavorite = (questionId: string) => {
    const isFav = progress.favoriteQuestions.includes(questionId);
    const newProgress = {
      ...progress,
      favoriteQuestions: isFav
        ? progress.favoriteQuestions.filter(id => id !== questionId)
        : [...progress.favoriteQuestions, questionId],
    };
    saveProgress(newProgress);
  };

  const isFavorite = (questionId: string) => progress.favoriteQuestions.includes(questionId);
  const isSolved = (questionId: string) => progress.solvedQuestions.includes(questionId);
  const isWrong = (questionId: string) => progress.wrongQuestions.includes(questionId);

  const addInterview = (interview: Interview) => {
    const newProgress = {
      ...progress,
      interviews: [interview, ...progress.interviews],
    };
    saveProgress(newProgress);
  };

  const clearWrongQuestions = () => {
    const newProgress = {
      ...progress,
      wrongQuestions: [],
    };
    saveProgress(newProgress);
  };

  const getFavoriteQuestions = () => {
    return questions.filter(q => progress.favoriteQuestions.includes(q.id));
  };

  const getWrongQuestions = () => {
    return questions.filter(q => progress.wrongQuestions.includes(q.id));
  };

  const getSolvedQuestions = () => {
    return questions.filter(q => progress.solvedQuestions.includes(q.id));
  };

  const getInterviewHistory = () => {
    return progress.interviews;
  };

  return (
    <AppContext.Provider
      value={{
        progress,
        isLoading,
        addWrongQuestion,
        removeWrongQuestion,
        addSolvedQuestion,
        toggleFavorite,
        isFavorite,
        isSolved,
        isWrong,
        addInterview,
        clearWrongQuestions,
        getFavoriteQuestions,
        getWrongQuestions,
        getSolvedQuestions,
        getInterviewHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
