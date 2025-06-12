import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

const ResultStatCard = ({ value, label, color }) => (
  <div className={`bg-gradient-to-br from-${color}-50 to-${color}-100 p-6 rounded-xl`}>
    <div className={`text-3xl font-bold text-${color}-600`}>{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

const DetailedResult = ({ result, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`p-4 rounded-lg border-l-4 ${
      result.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
    }`}
  >
    <div className="flex items-start space-x-3">
      {result.isCorrect ? <CheckCircle className="w-5 h-5 text-green-500 mt-1" /> : <XCircle className="w-5 h-5 text-red-500 mt-1" />}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-2">Question {index + 1}: {result.question}</h3>
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Your answer:</span> {result.userAnswer}</p>
          <p><span className="font-medium">Correct answer:</span> {result.correctAnswer}</p>
          <p className="text-gray-600 mt-2">{result.explanation}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const QuizResults = ({ quiz, results, onReset, onBack }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
      <p className="text-gray-600 mb-6">{quiz.title}</p>
      <div className="grid md:grid-cols-3 gap-6">
        <ResultStatCard value={results.score} label="Correct Answers" color="blue" />
        <ResultStatCard value={`${results.percentage}%`} label="Score" color="green" />
        <ResultStatCard value={results.score * 10} label="Points Earned" color="yellow" />
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Detailed Results</h2>
      <div className="space-y-4">
        {results.details.map((result, index) => <DetailedResult key={index} result={result} index={index} />)}
      </div>
    </div>
    <div className="flex justify-center space-x-4">
      <Button onClick={onReset} variant="outline" className="flex items-center space-x-2"><RotateCcw className="w-4 h-4" /><span>Take Another Quiz</span></Button>
      <Button onClick={onBack} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">Back to Dashboard</Button>
    </div>
  </motion.div>
);

export default QuizResults;