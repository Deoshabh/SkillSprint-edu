
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, 
  Trophy, 
  Medal, 
  Crown, 
  Zap, 
  TrendingUp,
  Users,
  Target,
  Calendar
} from 'lucide-react';

const Leaderboard = ({ user, onBack }) => {
  const [timeframe, setTimeframe] = useState('week');
  const [category, setCategory] = useState('points');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    if (user) {
      loadLeaderboardData();
    }
  }, [user, timeframe, category]);

  const loadLeaderboardData = () => {
    // Mock leaderboard data - in real app, this would come from your database
    const mockUsers = [
      {
        id: 1,
        name: 'Alex Chen',
        avatar: '👨‍💻',
        points: 2850,
        studyTime: 420,
        streak: 15,
        modulesCompleted: 28,
        level: 8,
        badges: ['🔥', '⚡', '🎯']
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        avatar: '👩‍🎓',
        points: 2720,
        studyTime: 380,
        streak: 12,
        modulesCompleted: 25,
        level: 7,
        badges: ['🌟', '📚', '🎨']
      },
      {
        id: 3,
        name: 'Mike Rodriguez',
        avatar: '👨‍🚀',
        points: 2650,
        studyTime: 360,
        streak: 18,
        modulesCompleted: 24,
        level: 7,
        badges: ['🚀', '💡', '🏆']
      },
      {
        id: user?.id || 4,
        name: user?.name || 'You',
        avatar: '👤',
        points: user?.totalPoints || 2400,
        studyTime: 340,
        streak: user?.streak || 8,
        modulesCompleted: user?.completedModules?.length || 22,
        level: user?.level || 6,
        badges: ['⭐', '📖', '🎯'],
        isCurrentUser: true
      },
      {
        id: 5,
        name: 'Emma Wilson',
        avatar: '👩‍💼',
        points: 2350,
        studyTime: 320,
        streak: 10,
        modulesCompleted: 21,
        level: 6,
        badges: ['💼', '📊', '🎪']
      },
      {
        id: 6,
        name: 'David Kim',
        avatar: '👨‍🔬',
        points: 2200,
        studyTime: 300,
        streak: 14,
        modulesCompleted: 20,
        level: 6,
        badges: ['🔬', '🧪', '⚗️']
      },
      {
        id: 7,
        name: 'Lisa Zhang',
        avatar: '👩‍🎨',
        points: 2100,
        studyTime: 280,
        streak: 7,
        modulesCompleted: 19,
        level: 5,
        badges: ['🎨', '🖌️', '🌈']
      },
      {
        id: 8,
        name: 'James Brown',
        avatar: '👨‍🏫',
        points: 1950,
        studyTime: 260,
        streak: 9,
        modulesCompleted: 18,
        level: 5,
        badges: ['📚', '🎓', '📝']
      }
    ];

    // Sort by selected category
    const sortedUsers = [...mockUsers].sort((a, b) => {
      switch (category) {
        case 'points':
          return b.points - a.points;
        case 'studyTime':
          return b.studyTime - a.studyTime;
        case 'streak':
          return b.streak - a.streak;
        case 'modules':
          return b.modulesCompleted - a.modulesCompleted;
        default:
          return b.points - a.points;
      }
    });

    setLeaderboardData(sortedUsers);
    
    // Find user's rank
    const currentUserIndex = sortedUsers.findIndex(u => u.isCurrentUser);
    setUserRank(currentUserIndex + 1);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getCategoryValue = (user, cat) => {
    switch (cat) {
      case 'points':
        return user.points.toLocaleString();
      case 'studyTime':
        return `${user.studyTime}m`;
      case 'streak':
        return `${user.streak} days`;
      case 'modules':
        return user.modulesCompleted;
      default:
        return user.points.toLocaleString();
    }
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'points':
        return 'Points';
      case 'studyTime':
        return 'Study Time';
      case 'streak':
        return 'Streak';
      case 'modules':
        return 'Modules';
      default:
        return 'Points';
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to view leaderboard</h2>
          <p className="text-gray-600 mb-6">Compete with other learners and track your ranking</p>
          <Button onClick={onBack}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Button>

        {/* Header */}
        <div className="text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-gray-600">See how you rank against other learners</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['week', 'month', 'all-time'].map((time) => (
              <Button
                key={time}
                variant={timeframe === time ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeframe(time)}
                className={timeframe === time ? "bg-white shadow-sm" : ""}
              >
                {time === 'all-time' ? 'All Time' : time.charAt(0).toUpperCase() + time.slice(1)}
              </Button>
            ))}
          </div>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { id: 'points', label: 'Points', icon: Zap },
              { id: 'studyTime', label: 'Time', icon: Calendar },
              { id: 'streak', label: 'Streak', icon: TrendingUp },
              { id: 'modules', label: 'Modules', icon: Target }
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.id}
                  variant={category === cat.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center space-x-1 ${category === cat.id ? "bg-white shadow-sm" : ""}`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{cat.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* User's Rank Card */}
        {userRank && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{user.avatar || '👤'}</div>
                <div>
                  <h3 className="text-xl font-bold">Your Rank: #{userRank}</h3>
                  <p className="opacity-90">
                    {getCategoryValue(leaderboardData.find(u => u.isCurrentUser), category)} {getCategoryLabel(category).toLowerCase()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">Level {user.level || 1}</div>
                <div className="flex space-x-1 mt-1">
                  {(user.badges || ['⭐']).map((badge, index) => (
                    <span key={index} className="text-lg">{badge}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Top Learners - {getCategoryLabel(category)}
              </h2>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  user.isCurrentUser ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(index + 1)}
                    </div>
                    
                    <div className="text-3xl">{user.avatar}</div>
                    
                    <div>
                      <h3 className={`font-bold ${user.isCurrentUser ? 'text-indigo-900' : 'text-gray-900'}`}>
                        {user.name} {user.isCurrentUser && '(You)'}
                      </h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <span>Level {user.level}</span>
                        <span>•</span>
                        <div className="flex space-x-1">
                          {user.badges.map((badge, i) => (
                            <span key={i}>{badge}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      index === 0 ? 'text-yellow-600' :
                      index === 1 ? 'text-gray-500' :
                      index === 2 ? 'text-amber-600' :
                      user.isCurrentUser ? 'text-indigo-600' : 'text-gray-900'
                    }`}>
                      {getCategoryValue(user, category)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {getCategoryLabel(category)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Achievement Badges</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { badge: '🔥', name: 'Fire Streak', desc: '7+ day streak' },
              { badge: '⚡', name: 'Speed Learner', desc: '5+ modules/week' },
              { badge: '🎯', name: 'Perfectionist', desc: '90%+ quiz average' },
              { badge: '🚀', name: 'Rising Star', desc: 'Top 10 this month' },
              { badge: '📚', name: 'Bookworm', desc: '50+ modules completed' },
              { badge: '🏆', name: 'Champion', desc: '#1 in any category' },
              { badge: '💎', name: 'Consistent', desc: '30+ day streak' },
              { badge: '🌟', name: 'All-Rounder', desc: 'Active in all tracks' }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 text-center"
              >
                <div className="text-3xl mb-2">{achievement.badge}</div>
                <h3 className="font-semibold text-gray-900 text-sm">{achievement.name}</h3>
                <p className="text-xs text-gray-600">{achievement.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
