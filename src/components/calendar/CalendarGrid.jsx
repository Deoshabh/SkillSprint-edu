import React from 'react';
import { motion } from 'framer-motion';
import { getSessionsForDate } from '@/components/calendar/utils';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid = ({ days, currentDate, selectedDate, sessions, onDateClick }) => {
  return (
    <div className="grid grid-cols-7 gap-1">
      {dayNames.map(day => (
        <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
          {day}
        </div>
      ))}
      
      {days.map((date, index) => {
        const isToday = date && date.toDateString() === new Date().toDateString();
        const isSelected = date && selectedDate && date.toDateString() === selectedDate.toDateString();
        const dateSessions = date ? getSessionsForDate(date, sessions) : [];
        const hasCompletedSessions = dateSessions.some(session => session.completed);
        const hasPendingSessions = dateSessions.some(session => !session.completed);
        
        return (
          <motion.div
            key={index}
            whileHover={{ scale: date ? 1.05 : 1 }}
            whileTap={{ scale: date ? 0.95 : 1 }}
            className={`calendar-day aspect-square p-2 text-center text-sm cursor-pointer relative ${
              !date ? 'invisible' : ''
            } ${
              isToday ? 'bg-indigo-100 text-indigo-600 font-bold' : ''
            } ${
              isSelected ? 'bg-indigo-500 text-white' : ''
            } ${
              hasCompletedSessions && !isSelected ? 'bg-green-100 text-green-600' : ''
            } ${
              hasPendingSessions && !hasCompletedSessions && !isSelected ? 'bg-yellow-100 text-yellow-600' : ''
            }`}
            onClick={() => date && onDateClick(date)}
          >
            {date && date.getDate()}
            
            {dateSessions.length > 0 && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {dateSessions.slice(0, 3).map((session, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      session.completed ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  />
                ))}
                {dateSessions.length > 3 && (
                  <div className="text-xs">+{dateSessions.length - 3}</div>
                )}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;