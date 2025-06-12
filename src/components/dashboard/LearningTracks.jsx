import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const TrackCard = ({ track, onCourseSelect, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.8 + index * 0.1 }}
    className="track-card p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl cursor-pointer hover:shadow-lg transition-all"
    onClick={() => onCourseSelect(track)}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="text-2xl">{track.icon}</div>
      <div className="text-right">
        <p className="text-sm text-gray-600">{track.completed}/{track.modules}</p>
        <p className="text-xs text-gray-500">modules</p>
      </div>
    </div>
    <h3 className="font-bold text-gray-900 mb-2">{track.title}</h3>
    <p className="text-sm text-gray-600 mb-4">{track.description}</p>
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">Progress</span>
        <span className="font-semibold">{track.progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full bg-gradient-to-r ${track.color}`}
          style={{ width: `${track.progress}%` }}
        />
      </div>
    </div>
    <Button 
      size="sm" 
      className="w-full"
      onClick={(e) => {
        e.stopPropagation();
        onCourseSelect(track);
      }}
    >
      Continue Learning
    </Button>
  </motion.div>
);

const LearningTracks = ({ tracks, onCourseSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
    className="bg-white rounded-xl shadow-lg p-6"
  >
    <h2 className="text-xl font-bold text-gray-900 mb-6">Your Learning Tracks</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {tracks.map((track, index) => (
        <TrackCard key={track.id} track={track} onCourseSelect={onCourseSelect} index={index} />
      ))}
    </div>
  </motion.div>
);

export default LearningTracks;