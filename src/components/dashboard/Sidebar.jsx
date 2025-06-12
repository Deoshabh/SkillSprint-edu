import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain, Gamepad2, TrendingUp, Zap } from 'lucide-react';

const QuickActions = ({ onQuickAction }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.9 }}
    className="bg-white rounded-xl shadow-lg p-6"
  >
    <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
    <div className="space-y-3">
      <Button variant="outline" className="w-full justify-start" onClick={() => onQuickAction('take-quiz')}>
        <Brain className="w-4 h-4 mr-2" /> Take Quiz
      </Button>
      <Button variant="outline" className="w-full justify-start" onClick={() => onQuickAction('play-game')}>
        <Gamepad2 className="w-4 h-4 mr-2" /> Play Mini-Game
      </Button>
      <Button variant="outline" className="w-full justify-start" onClick={() => onQuickAction('view-progress')}>
        <TrendingUp className="w-4 h-4 mr-2" /> View Progress
      </Button>
    </div>
  </motion.div>
);

const RecentActivity = ({ activity }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 1.0 }}
    className="bg-white rounded-xl shadow-lg p-6"
  >
    <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
    <div className="space-y-3">
      {activity.map((item) => (
        <div key={item.id} className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">{item.action} {item.item}</p>
            <p className="text-xs text-gray-500">{item.time}</p>
          </div>
          {item.points > 0 && (
            <div className="flex items-center text-xs text-green-600">
              <Zap className="w-3 h-3 mr-1" /> +{item.points}
            </div>
          )}
        </div>
      ))}
    </div>
  </motion.div>
);

const Sidebar = ({ activity, onQuickAction }) => (
  <div className="space-y-6">
    <QuickActions onQuickAction={onQuickAction} />
    <RecentActivity activity={activity} />
  </div>
);

export default Sidebar;