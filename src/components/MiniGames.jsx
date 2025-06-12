import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import GameSelection from '@/components/minigames/GameSelection';
import GamePlayer from '@/components/minigames/GamePlayer';

const games = [
  { id: 'drag-drop-dsa', title: 'Build a Linked List', description: 'Drag and drop nodes to create a linked list', icon: '🔗', category: 'Data Structures', difficulty: 'Beginner', points: 100 },
  { id: 'code-puzzle', title: 'Code Completion', description: 'Complete the missing code snippets', icon: '🧩', category: 'Programming', difficulty: 'Intermediate', points: 150 },
  { id: 'design-challenge', title: 'Color Matching', description: 'Match colors to create harmonious palettes', icon: '🎨', category: 'Design', difficulty: 'Beginner', points: 75 },
  { id: 'word-builder', title: 'Vocabulary Builder', description: 'Build words from given letters', icon: '📝', category: 'English', difficulty: 'Beginner', points: 50 },
  { id: 'math-puzzle', title: 'Number Patterns', description: 'Find the missing numbers in sequences', icon: '🔢', category: 'Aptitude', difficulty: 'Intermediate', points: 125 },
  { id: 'memory-game', title: 'Code Memory', description: 'Remember and match programming concepts', icon: '🧠', category: 'Programming', difficulty: 'Beginner', points: 80 }
];

const MiniGames = ({ user, onBack }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [score, setScore] = useState(0);

  const startGame = (game) => {
    setSelectedGame(game);
    setScore(0);
    initializeGameState(game.id);
    toast({ title: "Game started! 🎮", description: `Good luck with ${game.title}!` });
  };

  const initializeGameState = (gameId) => {
    if (gameId === 'drag-drop-dsa') {
      setGameState({
        nodes: [{ id: 1, value: 'Head', placed: false }, { id: 2, value: 'Node 1', placed: false }, { id: 3, value: 'Node 2', placed: false }, { id: 4, value: 'Tail', placed: false }],
        dropZones: [{ id: 1, filled: false, correctNode: 1 }, { id: 2, filled: false, correctNode: 2 }, { id: 3, filled: false, correctNode: 3 }, { id: 4, filled: false, correctNode: 4 }],
        completed: false
      });
    }
  };

  const handleGameUpdate = (update) => {
    if (selectedGame.id === 'drag-drop-dsa') {
      setGameState(prev => {
        const newState = { ...prev };
        const dropZone = newState.dropZones.find(zone => zone.id === update.dropZoneId);
        const node = newState.nodes.find(n => n.id === update.nodeId);
        if (dropZone && !dropZone.filled && node && !node.placed) {
          dropZone.filled = true;
          dropZone.nodeId = update.nodeId;
          node.placed = true;
          if (dropZone.correctNode === update.nodeId) {
            setScore(s => s + 25);
          }
          if (newState.nodes.every(n => n.placed)) {
            newState.completed = true;
            setTimeout(() => completeGame(25 * newState.nodes.filter(n => n.placed).length), 500);
          }
        }
        return newState;
      });
    }
  };

  const completeGame = (finalScore) => {
    const totalPoints = (selectedGame.points || 0) + finalScore;
    toast({ title: "Game completed! 🎉", description: `You earned ${totalPoints} points!` });
    setSelectedGame(null);
  };

  const resetGame = () => {
    setSelectedGame(null);
    setGameState(null);
    setScore(0);
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <Gamepad2 className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to play mini-games</h2>
        <p className="text-gray-600 mb-6">Access AI-generated learning games and earn points</p>
        <Button onClick={onBack}>Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={selectedGame ? resetGame : onBack} className="flex items-center space-x-2 mb-8">
        <ArrowLeft className="w-4 h-4" />
        <span>{selectedGame ? 'Back to Games' : 'Back to Dashboard'}</span>
      </Button>
      {selectedGame ? (
        <GamePlayer
          game={selectedGame}
          gameState={gameState}
          onReset={resetGame}
          onGameUpdate={handleGameUpdate}
          onComplete={completeGame}
          score={score}
        />
      ) : (
        <GameSelection games={games} onStartGame={startGame} />
      )}
    </div>
  );
};

export default MiniGames;