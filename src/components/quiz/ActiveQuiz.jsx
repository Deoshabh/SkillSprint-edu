import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

const QuestionOption = ({ option, index, selectedAnswer, onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`quiz-option p-4 rounded-lg border-2 ${
      selectedAnswer === index
        ? 'border-indigo-500 bg-indigo-50'
        : 'border-gray-200 hover:border-gray-300'
    }`}
    onClick={() => onSelect(index)}
  >
    <div className="flex items-center space-x-3">
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
        selectedAnswer === index
          ? 'border-indigo-500 bg-indigo-500'
          : 'border-gray-300'
      }`}>
        {selectedAnswer === index && <div className="w-3 h-3 bg-white rounded-full" />}
      </div>
      <span className="text-gray-900">{option}</span>
    </div>
  </motion.div>
);

const ActiveQuiz = ({ quiz, currentQuestionIndex, onNext, selectedAnswer, onAnswerSelect, timeLeft }) => {
  const question = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600"><Clock className="w-4 h-4" /><span>{formatTime(timeLeft)}</span></div>
            <div className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {quiz.questions.length}</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h2>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <QuestionOption key={index} option={option} index={index} selectedAnswer={selectedAnswer} onSelect={onAnswerSelect} />
            ))}
          </div>
          <div className="flex justify-end mt-8">
            <Button onClick={onNext} disabled={selectedAnswer === null} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
              {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ActiveQuiz;