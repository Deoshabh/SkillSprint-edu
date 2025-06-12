import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain, Gamepad2, Target, Trophy, Zap } from 'lucide-react';

const GameCard = ({ game, onStartGame, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    className="mini-game-card p-6 rounded-xl cursor-pointer"
    onClick={() => onStartGame(game)}
  >
    <div className="text-center mb-4">
      <div className="text-4xl mb-3">{game.icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{game.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{game.description}</p>
      <div className="flex justify-between text-xs text-gray-500 mb-4">
        <span className="bg-gray-100 px-2 py-1 rounded">{game.category}</span>
        <span className={`px-2 py-1 rounded ${
          game.difficulty === 'Beginner' ? 'bg-green-100 text-green-600' :
          game.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
          'bg-red-100 text-red-600'
        }`}>{game.difficulty}</span>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-1 text-sm text-indigo-600">
        <Trophy className="w-4 h-4" />
        <span>{game.points} pts</span>
      </div>
      <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        Play Now
      </Button>
    </div>
  </motion.div>
);

const GameSelection = ({ games, onStartGame }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
    <div className="text-center">
      <Gamepad2 className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Mini-Games</h1>
      <p className="text-gray-600">Interactive games powered by AI to make learning fun and engaging</p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game, index) => (
        <GameCard key={game.id} game={game} onStartGame={onStartGame} index={index} />
      ))}
    </div>
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Game Features</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center"><Brain className="w-8 h-8 text-indigo-500 mx-auto mb-3" /><h3 className="font-semibold text-gray-900 mb-2">AI-Generated</h3><p className="text-sm text-gray-600">Puzzles and challenges created by Meta Llama-4</p></div>
        <div className="text-center"><Target className="w-8 h-8 text-purple-500 mx-auto mb-3" /><h3 className="font-semibold text-gray-900 mb-2">Skill-Based</h3><p className="text-sm text-gray-600">Games tailored to your learning tracks</p></div>
        <div className="text-center"><Zap className="w-8 h-8 text-yellow-500 mx-auto mb-3" /><h3 className="font-semibold text-gray-900 mb-2">Earn Rewards</h3><p className="text-sm text-gray-600">Get points, badges, and achievements</p></div>
      </div>
    </div>
  </motion.div>
);

export default GameSelection;