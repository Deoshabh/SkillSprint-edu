import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Calendar as CalendarIcon, Bell, Download } from 'lucide-react';
import { getDaysInMonth } from '@/components/calendar/utils.js';
import CalendarHeader from '@/components/calendar/CalendarHeader.jsx';
import CalendarGrid from '@/components/calendar/CalendarGrid.jsx';
import CalendarSidebar from '@/components/calendar/CalendarSidebar.jsx';

const Calendar = ({ user, onBack }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (user) {
      loadUserSessions();
    }
  }, [user]);

  const loadUserSessions = () => {
    const mockSessions = [
      { id: 1, title: 'JavaScript Fundamentals', date: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 10, 0), duration: 45, type: 'video', track: 'Full-Stack & DSA', completed: true },
      { id: 2, title: 'React Components Quiz', date: new Date(new Date().getFullYear(), new Date().getMonth(), 16, 14, 30), duration: 30, type: 'quiz', track: 'Full-Stack & DSA', completed: false },
      { id: 3, title: 'English Grammar Practice', date: new Date(new Date().getFullYear(), new Date().getMonth(), 18, 9, 0), duration: 25, type: 'practice', track: 'English Communication', completed: false },
      { id: 4, title: 'Design Principles', date: new Date(new Date().getFullYear(), new Date().getMonth(), 20, 16, 0), duration: 40, type: 'video', track: 'Design & AI Tools', completed: false }
    ];
    const today = new Date();
    const currentMonthSessions = mockSessions.map(session => {
        const newDate = new Date(session.date);
        newDate.setMonth(today.getMonth());
        newDate.setFullYear(today.getFullYear());
        return {...session, date: newDate};
    });
    setSessions(currentMonthSessions);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddSession = () => {
    toast({
      title: "🚧 Session scheduling coming soon!",
      description: "Session scheduling isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const exportToCalendar = () => {
    toast({
      title: "🚧 Calendar export coming soon!",
      description: "ICS export isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const enableNotifications = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          toast({ title: "Notifications enabled! 🔔", description: "You'll receive reminders for your study sessions." });
        } else {
          toast({ title: "Notifications blocked", description: "Please enable notifications in your browser settings." });
        }
      });
    } else {
      toast({ title: "Notifications not supported", description: "Your browser doesn't support notifications." });
    }
  };
  
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <CalendarIcon className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to view calendar</h2>
          <p className="text-gray-600 mb-6">Access your personalized study schedule and reminders</p>
          <Button onClick={onBack}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const daysInMonth = getDaysInMonth(currentDate);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Calendar</h1>
            <p className="text-gray-600">Plan and track your learning sessions</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={enableNotifications} variant="outline" size="sm" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Enable Reminders</span>
            </Button>
            <Button onClick={exportToCalendar} variant="outline" size="sm" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export ICS</span>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <CalendarHeader 
                currentDate={currentDate} 
                onNavigateMonth={navigateMonth} 
                onSetCurrentDate={setCurrentDate} 
              />
              <CalendarGrid 
                days={daysInMonth}
                currentDate={currentDate}
                selectedDate={selectedDate}
                sessions={sessions}
                onDateClick={handleDateClick}
              />
            </div>
          </div>
          
          <CalendarSidebar 
            selectedDate={selectedDate}
            sessions={sessions}
            onAddSessionClick={handleAddSession}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Calendar;