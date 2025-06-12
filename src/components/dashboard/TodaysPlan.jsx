import React from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Brain, ChevronRight, Calendar } from 'lucide-react';

const PlanItem = ({ item, index, onClick }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'video': return <Play className="w-5 h-5 text-white" />;
      case 'practice': return <BookOpen className="w-5 h-5 text-white" />;
      case 'quiz': return <Brain className="w-5 h-5 text-white" />;
      default: return null;
    }
  };

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + index * 0.1 }}
      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          {getIcon(item.type)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          <p className="text-sm text-gray-600">{item.track} • {item.duration}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </motion.div>
  );
};

const TodaysPlan = ({ plan, onQuickAction }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="bg-white rounded-xl shadow-lg p-6"
  >
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-900">Today's Plan</h2>
      <Calendar className="w-5 h-5 text-gray-500" />
    </div>
    <div className="space-y-4">
      {plan.map((item, index) => (
        <PlanItem key={item.id} item={item} index={index} onClick={() => onQuickAction('start-module')} />
      ))}
    </div>
  </motion.div>
);

export default TodaysPlan;