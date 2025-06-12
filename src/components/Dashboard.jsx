import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Brain, Target, Gamepad2 } from 'lucide-react';
import Welcome from '@/components/dashboard/Welcome';
import StatsOverview from '@/components/dashboard/StatsOverview';
import TodaysPlan from '@/components/dashboard/TodaysPlan';
import LearningTracks from '@/components/dashboard/LearningTracks';
import Sidebar from '@/components/dashboard/Sidebar';

const Dashboard = ({ user, onCourseSelect }) => {
  const [todaysPlan, setTodaysPlan] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [streakData, setStreakData] = useState({ current: 0, best: 0 });

  const tracks = [
    { id: 'fullstack-dsa', title: 'Full-Stack & DSA', description: 'Master web development and data structures', progress: 35, modules: 24, completed: 8, color: 'from-blue-500 to-cyan-500', icon: '💻' },
    { id: 'english-communication', title: 'English Communication', description: 'Improve your professional communication skills', progress: 60, modules: 18, completed: 11, color: 'from-green-500 to-emerald-500', icon: '🗣️' },
    { id: 'design-ai', title: 'Design & AI Tools', description: 'Creative design with AI-powered tools', progress: 20, modules: 20, completed: 4, color: 'from-purple-500 to-pink-500', icon: '🎨' },
    { id: 'aptitude-prep', title: 'Aptitude Prep', description: 'Quantitative and logical reasoning', progress: 45, modules: 16, completed: 7, color: 'from-orange-500 to-red-500', icon: '🧮' }
  ];

  useEffect(() => {
    if (user) {
      setTodaysPlan([
        { id: 1, title: 'React Hooks Deep Dive', type: 'video', duration: '25 min', track: 'Full-Stack & DSA' },
        { id: 2, title: 'Binary Search Trees', type: 'practice', duration: '30 min', track: 'Full-Stack & DSA' },
        { id: 3, title: 'Professional Email Writing', type: 'quiz', duration: '15 min', track: 'English Communication' },
      ]);
      setRecentActivity([
        { id: 1, action: 'Completed', item: 'JavaScript Promises', time: '2 hours ago', points: 50 },
        { id: 2, action: 'Started', item: 'CSS Grid Layout', time: '1 day ago', points: 0 },
        { id: 3, action: 'Quiz passed', item: 'Grammar Fundamentals', time: '2 days ago', points: 75 }
      ]);
      setStreakData({ current: user?.streak || 0, best: user?.bestStreak || 0 });
    }
  }, [user]);

  const handleQuickAction = (action) => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to access this feature." });
      return;
    }
    toast({ title: "🚧 Feature coming soon!", description: "This awesome feature is on its way! 🚀" });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <img  className="w-32 h-32 mx-auto mb-6 rounded-full" alt="AI-powered learning illustration" src="https://images.unsplash.com/photo-1677442135131-4d7c123aef1c" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Welcome to SkillSprint
          </h1>
          <p className="text-xl text-gray-600 mb-8">AI-powered learning platform with personalized tracks, interactive quizzes, and gamified progress tracking.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white rounded-xl shadow-lg"><Brain className="w-8 h-8 text-indigo-500 mb-4 mx-auto" /><h3 className="font-semibold mb-2">AI-Powered Chat</h3><p className="text-sm text-gray-600">Get instant help with Meta Llama-4</p></div>
            <div className="p-6 bg-white rounded-xl shadow-lg"><Target className="w-8 h-8 text-purple-500 mb-4 mx-auto" /><h3 className="font-semibold mb-2">Personalized Tracks</h3><p className="text-sm text-gray-600">Customized learning paths</p></div>
            <div className="p-6 bg-white rounded-xl shadow-lg"><Gamepad2 className="w-8 h-8 text-pink-500 mb-4 mx-auto" /><h3 className="font-semibold mb-2">Gamified Learning</h3><p className="text-sm text-gray-600">Earn points and achievements</p></div>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700" onClick={() => toast({ title: "🚧 Authentication coming soon!", description: "Sign-in will be ready soon! 🚀" })}>
            Get Started Free
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Welcome user={user} />
      <StatsOverview user={user} streakData={streakData} />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <TodaysPlan plan={todaysPlan} onQuickAction={handleQuickAction} />
          <LearningTracks tracks={tracks} onCourseSelect={onCourseSelect} />
        </div>
        <Sidebar activity={recentActivity} onQuickAction={handleQuickAction} />
      </div>
    </div>
  );
};

export default Dashboard;