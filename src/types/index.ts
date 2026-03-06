// 数据类型定义

export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionLanguage = 'JavaScript' | 'TypeScript' | 'Python' | 'Java' | 'Go' | 'C++' | 'Rust';
export type InterviewType = 'technical' | 'behavioral';

export interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  language: QuestionLanguage;
  starterCode: string;
  solution: string;
  explanation: string;
  tags: string[];
}

export interface Interview {
  id: string;
  type: InterviewType;
  date: string;
  duration: number;
  questions: string[];
  evaluation: string;
  score: number;
}

export interface UserProgress {
  solvedQuestions: string[];
  wrongQuestions: string[];
  favoriteQuestions: string[];
  interviews: Interview[];
}

export interface AIQuestion {
  id: string;
  question: string;
  category: string;
  tips: string;
}
