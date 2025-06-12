import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, BarChart3, TrendingUp, Target, Clock, Award, Download, Calendar, Zap 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Analytics = ({ user, onBack }) => {
  const [timeRange, setTimeRange] = useState('week');
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    if (user) {
      const mockData = {
        week: { studyTime: [45, 60, 30, 75, 90, 45, 60], pointsEarned: [150, 200, 100, 250, 300, 150, 200], modulesCompleted: [2, 3, 1, 3, 4, 2, 3], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], totalStudyTime: 405, totalPoints: 1350, totalModules: 18, averageScore: 85, streakDays: 5, topTrack: 'Full-Stack & DSA' },
        month: { studyTime: [300, 450, 380, 520], pointsEarned: [1200, 1800, 1500, 2100], modulesCompleted: [12, 18, 15, 21], labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], totalStudyTime: 1650, totalPoints: 6600, totalModules: 66, averageScore: 87, streakDays: 23, topTrack: 'Full-Stack & DSA' },
        year: { studyTime: [1200, 1400, 1600, 1800, 2000, 1900, 2100, 2300, 2200, 2400, 2600, 2500], pointsEarned: [4800, 5600, 6400, 7200, 8000, 7600, 8400, 9200, 8800, 9600, 10400, 10000], modulesCompleted: [48, 56, 64, 72, 80, 76, 84, 92, 88, 96, 104, 100], labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], totalStudyTime: 22000, totalPoints: 96000, totalModules: 960, averageScore: 89, streakDays: 156, topTrack: 'Full-Stack & DSA' }
      };
      setAnalyticsData(mockData[timeRange]);
    }
  }, [user, timeRange]);

  const exportReport = () => {
    toast({ title: "🚧 PDF export coming soon!", description: "Progress report export is on its way! 🚀" });
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "indigo" }) => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}><Icon className={`w-6 h-6 text-${color}-600`} /></div>
        <div className="text-right"><div className={`text-2xl font-bold text-${color}-600`}>{value}</div><div className="text-sm text-gray-600">{subtitle}</div></div>
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
    </motion.div>
  );

  const Chart = ({ data, title, barKey, barColor }) => {
    const chartData = analyticsData.labels.map((label, index) => ({ name: label, [barKey]: data[index] }));
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip cursor={{ fill: 'rgba(102, 126, 234, 0.1)' }} contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
            <Bar dataKey={barKey} fill={barColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  if (!user) return (<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center"><BarChart3 className="w-16 h-16 text-indigo-500 mx-auto mb-4" /><h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to view analytics</h2><p className="text-gray-600 mb-6">Track your learning progress and performance metrics</p><Button onClick={onBack}>Back to Dashboard</Button></div>);
  if (!analyticsData) return (<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center"><div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" /></div>);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2"><ArrowLeft className="w-4 h-4" /><span>Back to Dashboard</span></Button>
        <div className="flex items-center justify-between">
          <div><h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Analytics</h1><p className="text-gray-600">Track your progress and performance insights</p></div>
          <div className="flex items-center space-x-3">
            <div className="flex bg-gray-100 rounded-lg p-1">{['week', 'month', 'year'].map((range) => (<Button key={range} variant={timeRange === range ? "default" : "ghost"} size="sm" onClick={() => setTimeRange(range)} className={timeRange === range ? "bg-white shadow-sm" : ""}>{range.charAt(0).toUpperCase() + range.slice(1)}</Button>))}</div>
            <Button onClick={exportReport} variant="outline" size="sm" className="flex items-center space-x-2"><Download className="w-4 h-4" /><span>Export PDF</span></Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard icon={Clock} title="Study Time" value={`${analyticsData.totalStudyTime}m`} subtitle={`${timeRange} total`} color="blue" />
          <StatCard icon={Zap} title="Points Earned" value={analyticsData.totalPoints.toLocaleString()} subtitle={`${timeRange} total`} color="yellow" />
          <StatCard icon={Target} title="Modules Completed" value={analyticsData.totalModules} subtitle={`${timeRange} total`} color="green" />
          <StatCard icon={Award} title="Average Score" value={`${analyticsData.averageScore}%`} subtitle="quiz performance" color="purple" />
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <Chart data={analyticsData.studyTime} title="Study Time (minutes)" barKey="minutes" barColor="#3b82f6" />
          <Chart data={analyticsData.pointsEarned} title="Points Earned" barKey="points" barColor="#10b981" />
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <Chart data={analyticsData.modulesCompleted} title="Modules Completed" barKey="modules" barColor="#8b5cf6" />
          <div className="bg-white rounded-xl shadow-lg p-6"><h3 className="text-lg font-bold text-gray-900 mb-6">Performance Insights</h3><div className="space-y-4"><div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg"><div><h4 className="font-semibold text-green-800">Current Streak</h4><p className="text-sm text-green-600">Keep up the great work!</p></div><div className="text-2xl font-bold text-green-600">{analyticsData.streakDays} days</div></div><div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"><div><h4 className="font-semibold text-blue-800">Top Learning Track</h4><p className="text-sm text-blue-600">Most active subject</p></div><div className="text-sm font-bold text-blue-600">{analyticsData.topTrack}</div></div><div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg"><div><h4 className="font-semibold text-yellow-800">Daily Average</h4><p className="text-sm text-yellow-600">Study time per day</p></div><div className="text-sm font-bold text-yellow-600">{Math.round(analyticsData.totalStudyTime / analyticsData.labels.length)}m</div></div></div></div>
        </div>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">AI Recommendations</h2><div className="grid md:grid-cols-2 gap-6"><div className="bg-white rounded-lg p-6"><h3 className="font-semibold text-gray-900 mb-3">📈 Performance Trends</h3><ul className="space-y-2 text-sm text-gray-600"><li>• Your study consistency has improved by 25% this month</li><li>• Quiz scores are trending upward (+12% average)</li><li>• Best performance time: {user?.studyTime || 'Morning'} sessions</li></ul></div><div className="bg-white rounded-lg p-6"><h3 className="font-semibold text-gray-900 mb-3">🎯 Suggested Focus Areas</h3><ul className="space-y-2 text-sm text-gray-600"><li>• Increase practice time for Data Structures</li><li>• Try more advanced React concepts</li><li>• Consider adding Design track to your routine</li></ul></div></div></div>
      </motion.div>
    </div>
  );
};

export default Analytics;