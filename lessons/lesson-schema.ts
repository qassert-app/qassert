export interface Exercise {
    id: string;
    type: 'guided' | 'challenge';
    title: string;
    description: string;
    starterCode: string;
    solution: string;
    hints: string[];
    testCases: TestCase[];
  }
  
  export interface TestCase {
    name: string;
    input?: any;
    expectedOutput?: any;
    assertion?: string; // JavaScript code to assert
  }
  
  export interface CTFLQuizQuestion {
    id: string;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }
  
  export interface Lesson {
    id: string;
    title: string;
    language: 'python' | 'javascript';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    orderIndex: number;
    estimatedTime: number; // minutes
    ctflObjectives: string[];
    content: {
      introduction: string;
      whyItMatters: string;
      realWorldScenario: string;
      keyTakeaways: string[];
    };
    exercises: Exercise[];
    ctflQuiz: CTFLQuizQuestion[];
  }