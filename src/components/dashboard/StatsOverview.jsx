import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, Award, Target } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    className="bg-white p-6 rounded-xl shadow-lg"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className={`text-2xl font-bold text-${color}-500`}>{value}</p>
      </div>
      <Icon className={`w-8 h-8 text-${color}-500`} />
    </div>
  </motion.div>
);

const StatsOverview = ({ user, streakData }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    <StatCard icon={Flame} value={streakData.current} label="Current Streak" color="orange" delay={0.1} />
    <StatCard icon={Zap} value={user.totalPoints || 0} label="Total Points" color="indigo" delay={0.2} />
    <StatCard icon={Award} value={user.level || 1} label="Level" color="purple" delay={0.3} />
    <StatCard icon={Target} value={user.completedModules?.length || 0} label="Completed" color="green" delay={0.4} />
  </div>
);

export default StatsOverview;