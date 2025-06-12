import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Brain } from 'lucide-react';
import QuizTopicSelection from '@/components/quiz/QuizTopicSelection';
import ActiveQuiz from '@/components/quiz/ActiveQuiz';
import QuizResults from '@/components/quiz/QuizResults';

const quizTopics = [
  { id: 'javascript', title: 'JavaScript Fundamentals', description: 'Test your knowledge of JavaScript basics', icon: '💻', difficulty: 'Beginner', questions: 5, timeLimit: 300 },
  { id: 'react', title: 'React Concepts', description: 'Components, hooks, and state management', icon: '⚛️', difficulty: 'Intermediate', questions: 5, timeLimit: 300 },
  { id: 'dsa', title: 'Data Structures', description: 'Arrays, linked lists, and algorithms', icon: '🔗', difficulty: 'Intermediate', questions: 5, timeLimit: 300 },
  { id: 'english', title: 'English Grammar', description: 'Grammar rules and communication', icon: '📝', difficulty: 'Beginner', questions: 5, timeLimit: 300 }
];

const mockQuizzes = {
  javascript: { title: 'JavaScript Fundamentals', questions: [{ id: 1, question: 'What is the correct way to declare a variable in JavaScript?', options: ['var x = 5;', 'variable x = 5;', 'v x = 5;', 'declare x = 5;'], correct: 0, explanation: 'In JavaScript, variables are declared using var, let, or const keywords.' }, { id: 2, question: 'Which method is used to add an element to the end of an array?', options: ['append()', 'push()', 'add()', 'insert()'], correct: 1, explanation: 'The push() method adds one or more elements to the end of an array.' }, { id: 3, question: 'What does "=== " operator do in JavaScript?', options: ['Assignment', 'Equality check', 'Strict equality check', 'Not equal'], correct: 2, explanation: 'The === operator checks for strict equality, comparing both value and type.' }, { id: 4, question: 'Which of the following is NOT a JavaScript data type?', options: ['String', 'Boolean', 'Integer', 'Undefined'], correct: 2, explanation: 'JavaScript has Number type, not specifically Integer. All numbers are of type Number.' }, { id: 5, question: 'What is the output of: console.log(typeof null)?', options: ['null', 'undefined', 'object', 'boolean'], correct: 2, explanation: 'This is a known quirk in JavaScript. typeof null returns "object" due to a legacy bug.' }] },
  react: { title: 'React Concepts', questions: [{ id: 1, question: 'What is JSX in React?', options: ['A JavaScript library', 'A syntax extension', 'A database', 'A CSS framework'], correct: 1, explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in React.' }, { id: 2, question: 'Which hook is used to manage state in functional components?', options: ['useEffect', 'useState', 'useContext', 'useReducer'], correct: 1, explanation: 'useState is the primary hook for managing state in functional components.' }, { id: 3, question: 'What is the purpose of useEffect hook?', options: ['State management', 'Side effects', 'Context creation', 'Component styling'], correct: 1, explanation: 'useEffect is used to perform side effects in functional components, like API calls or subscriptions.' }, { id: 4, question: 'How do you pass data from parent to child component?', options: ['State', 'Props', 'Context', 'Refs'], correct: 1, explanation: 'Props are used to pass data from parent components to child components.' }, { id: 5, question: 'What is the virtual DOM?', options: ['Real DOM copy', 'JavaScript representation of DOM', 'CSS framework', 'Database'], correct: 1, explanation: 'Virtual DOM is a JavaScript representation of the real DOM that React uses for efficient updates.' }] }
};

const QuizInterface = ({ user, onBack }) => {
  const [quizState, setQuizState] = useState('selection'); // selection, active, results
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  useEffect(() => {
    let timer;
    if (quizState === 'active' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && quizState === 'active') {
      handleQuizComplete();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizState]);

  const startQuiz = async (topic) => {
    setIsLoading(true);
    setTimeout(() => {
      const quiz = mockQuizzes[topic.id] || mockQuizzes.javascript;
      setCurrentQuiz(quiz);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setAnswers([]);
      setTimeLeft(topic.timeLimit);
      setIsLoading(false);
      setQuizState('active');
      toast({ title: "Quiz started! 🧠", description: `Good luck with ${quiz.title}!` });
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast({ title: "Please select an answer", description: "Choose an option before proceeding." });
      return;
    }
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizComplete(newAnswers);
    }
  };

  const handleQuizComplete = (finalAnswers = answers) => {
    let correct = 0;
    const detailedResults = currentQuiz.questions.map((q, i) => {
      const isCorrect = finalAnswers[i] === q.correct;
      if (isCorrect) correct++;
      return { question: q.question, userAnswer: q.options[finalAnswers[i]], correctAnswer: q.options[q.correct], isCorrect, explanation: q.explanation };
    });
    setQuizResults({ score: correct, total: currentQuiz.questions.length, percentage: Math.round((correct / currentQuiz.questions.length) * 100), details: detailedResults });
    setQuizState('results');
    toast({ title: "Quiz completed! 🎉", description: `You scored ${correct}/${currentQuiz.questions.length} and earned ${correct * 10} points!` });
  };

  const resetQuiz = () => {
    setQuizState('selection');
    setCurrentQuiz(null);
    setQuizResults(null);
  };

  if (!user) {
    return (<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center"><Brain className="w-16 h-16 text-indigo-500 mx-auto mb-4" /><h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to take quizzes</h2><p className="text-gray-600 mb-6">Access AI-generated quizzes tailored to your learning progress</p><Button onClick={onBack}>Back to Dashboard</Button></div>);
  }
  if (isLoading) {
    return (<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center"><div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" /><h2 className="text-2xl font-bold text-gray-900 mb-2">Generating Quiz...</h2><p className="text-gray-600">AI is creating personalized questions for you</p></div>);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={quizState === 'selection' ? onBack : resetQuiz} className="flex items-center space-x-2 mb-8">
        <ArrowLeft className="w-4 h-4" />
        <span>{quizState === 'selection' ? 'Back to Dashboard' : 'Back to Quizzes'}</span>
      </Button>
      {quizState === 'selection' && <QuizTopicSelection quizTopics={quizTopics} onStartQuiz={startQuiz} />}
      {quizState === 'active' && <ActiveQuiz quiz={currentQuiz} currentQuestionIndex={currentQuestion} onNext={handleNextQuestion} selectedAnswer={selectedAnswer} onAnswerSelect={setSelectedAnswer} timeLeft={timeLeft} />}
      {quizState === 'results' && <QuizResults quiz={currentQuiz} results={quizResults} onReset={resetQuiz} onBack={onBack} />}
    </div>
  );
};

export default QuizInterface;