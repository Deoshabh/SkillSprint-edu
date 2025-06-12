import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Zap } from 'lucide-react';
import DragDropDsa from '@/components/minigames/games/DragDropDsa';
import { Puzzle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const GamePlayer = ({ game, gameState, onReset, onGameUpdate, onComplete, score }) => {
  
  const renderGame = () => {
    switch (game.id) {
      case 'drag-drop-dsa':
        return <DragDropDsa gameState={gameState} onUpdate={onGameUpdate} onComplete={onComplete} />;
      default:
        return (
          <div className="text-center py-8">
            <Puzzle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{game.title}</h3>
            <p className="text-gray-600 mb-4">{game.description}</p>
            <Button onClick={() => toast({ title: "🚧 Game coming soon!" })} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              Start Playing
            </Button>
          </div>
        );
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onReset} className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{game.title}</h1>
              <p className="text-gray-600">{game.category} • {game.difficulty}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-lg font-bold text-indigo-600">
              <Zap className="w-5 h-5" />
              <span>{score} points</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">{renderGame()}</div>
      <div className="flex justify-center space-x-4">
        <Button onClick={onReset} variant="outline" className="flex items-center space-x-2">
          <RotateCcw className="w-4 h-4" />
          <span>Reset Game</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default GamePlayer;