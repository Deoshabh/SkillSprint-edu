import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, BookOpen, Plus } from 'lucide-react';
import { getSessionsForDate } from '@/components/calendar/utils';

const TodaySessionCard = ({ session }) => (
    <div className={`p-3 rounded-lg border ${
        session.completed ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
    }`}>
        <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-gray-900 text-sm">{session.title}</h4>
            <span className={`text-xs px-2 py-1 rounded ${
                session.completed ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
            }`}>
                {session.completed ? 'Completed' : 'Pending'}
            </span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-600">
            <Clock className="w-3 h-3" />
            <span>{session.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span>•</span>
            <span>{session.duration} min</span>
        </div>
    </div>
);

const SelectedDateSessionCard = ({ session }) => (
    <div className={`p-3 rounded-lg border ${
        session.completed ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
    }`}>
        <h4 className="font-medium text-gray-900 mb-1">{session.title}</h4>
        <p className="text-xs text-gray-600 mb-2">{session.track}</p>
        <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-3 h-3" />
                <span>{session.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span>•</span>
                <span>{session.duration} min</span>
            </div>
            <span className={`px-2 py-1 rounded ${
                session.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
            }`}>
                {session.type}
            </span>
        </div>
    </div>
);

const CalendarSidebar = ({ selectedDate, sessions, onAddSessionClick }) => {
    const todaySessions = getSessionsForDate(new Date(), sessions);
    const selectedDateSessions = getSessionsForDate(selectedDate, sessions);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Today's Sessions</h3>
                {todaySessions.length > 0 ? (
                    <div className="space-y-3">
                        {todaySessions.map(session => <TodaySessionCard key={session.id} session={session} />)}
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <CalendarIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">No sessions scheduled for today</p>
                        <Button size="sm" onClick={onAddSessionClick} className="mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                            <Plus className="w-3 h-3 mr-1" />
                            Add Session
                        </Button>
                    </div>
                )}
            </div>

            {selectedDate && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        {selectedDate.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                    {selectedDateSessions.length > 0 ? (
                        <div className="space-y-3">
                            {selectedDateSessions.map(session => <SelectedDateSessionCard key={session.id} session={session} />)}
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-3">No sessions on this date</p>
                            <Button size="sm" onClick={onAddSessionClick} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                                <Plus className="w-3 h-3 mr-1" />
                                Add Session
                            </Button>
                        </div>
                    )}
                </div>
            )}

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">This Week</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Sessions completed</span>
                        <span className="font-semibold text-green-600">{sessions.filter(s => s.completed).length}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Sessions pending</span>
                        <span className="font-semibold text-yellow-600">{sessions.filter(s => !s.completed).length}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Study time</span>
                        <span className="font-semibold text-indigo-600">{sessions.reduce((total, s) => total + (s.completed ? s.duration : 0), 0)} min</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarSidebar;