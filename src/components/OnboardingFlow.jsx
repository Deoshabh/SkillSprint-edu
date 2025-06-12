
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ChevronLeft, ChevronRight, Clock, Globe } from 'lucide-react';

const OnboardingFlow = ({ isOpen, onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    selectedTracks: [],
    studyTime: '',
    timezone: '',
    dailyGoal: 30
  });

  const tracks = [
    {
      id: 'fullstack-dsa',
      title: 'Full-Stack & DSA',
      description: 'Web development and data structures',
      icon: '💻',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'english-communication',
      title: 'English Communication',
      description: 'Professional communication skills',
      icon: '🗣️',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'design-ai',
      title: 'Design & AI Tools',
      description: 'Creative design with AI',
      icon: '🎨',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'aptitude-prep',
      title: 'Aptitude Prep',
      description: 'Quantitative and logical reasoning',
      icon: '🧮',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const studyTimes = [
    { value: 'morning', label: 'Morning (6 AM - 12 PM)', icon: '🌅' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 6 PM)', icon: '☀️' },
    { value: 'evening', label: 'Evening (6 PM - 12 AM)', icon: '🌆' },
    { value: 'night', label: 'Night (12 AM - 6 AM)', icon: '🌙' }
  ];

  const steps = [
    {
      title: 'Choose Your Learning Tracks',
      description: 'Select the skills you want to master',
      component: 'tracks'
    },
    {
      title: 'Set Your Study Schedule',
      description: 'When do you prefer to learn?',
      component: 'schedule'
    },
    {
      title: 'Set Your Daily Goal',
      description: 'How many minutes per day?',
      component: 'goal'
    }
  ];

  const handleTrackToggle = (trackId) => {
    setPreferences(prev => ({
      ...prev,
      selectedTracks: prev.selectedTracks.includes(trackId)
        ? prev.selectedTracks.filter(id => id !== trackId)
        : [...prev.selectedTracks, trackId]
    }));
  };

  const handleNext = () => {
    if (currentStep === 0 && preferences.selectedTracks.length === 0) {
      toast({
        title: "Please select at least one track",
        description: "Choose the skills you want to learn.",
      });
      return;
    }

    if (currentStep === 1 && !preferences.studyTime) {
      toast({
        title: "Please select your preferred study time",
        description: "This helps us send you reminders.",
      });
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Generate diagnostic quiz for selected tracks
    const diagnosticQuizzes = preferences.selectedTracks.map(trackId => ({
      trackId,
      completed: false,
      questions: generateDiagnosticQuestions(trackId)
    }));

    onComplete({
      ...preferences,
      diagnosticQuizzes,
      setupDate: new Date().toISOString()
    });
  };

  const generateDiagnosticQuestions = (trackId) => {
    // Mock diagnostic questions - in real app, this would use Llama-4
    const questionSets = {
      'fullstack-dsa': [
        'What is the time complexity of binary search?',
        'Which HTTP method is used to update a resource?',
        'What is the difference between let and var in JavaScript?'
      ],
      'english-communication': [
        'Choose the correct sentence structure',
        'Identify the appropriate tone for business emails',
        'Select the best way to present ideas clearly'
      ],
      'design-ai': [
        'What are the principles of good UI design?',
        'How do you create effective color schemes?',
        'What is the purpose of user personas?'
      ],
      'aptitude-prep': [
        'Solve: If 5x + 3 = 18, what is x?',
        'Complete the pattern: 2, 4, 8, 16, ?',
        'A train travels 60 km in 45 minutes. What is its speed?'
      ]
    };

    return questionSets[trackId] || [];
  };

  const renderTracksStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tracks.map((track) => (
          <motion.div
            key={track.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
              preferences.selectedTracks.includes(track.id)
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleTrackToggle(track.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{track.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{track.title}</h3>
                <p className="text-sm text-gray-600">{track.description}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                preferences.selectedTracks.includes(track.id)
                  ? 'border-indigo-500 bg-indigo-500'
                  : 'border-gray-300'
              }`}>
                {preferences.selectedTracks.includes(track.id) && (
                  <div className="w-3 h-3 bg-white rounded-full" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderScheduleStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {studyTimes.map((time) => (
          <motion.div
            key={time.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              preferences.studyTime === time.value
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setPreferences(prev => ({ ...prev, studyTime: time.value }))}
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{time.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{time.label}</h3>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                preferences.studyTime === time.value
                  ? 'border-indigo-500 bg-indigo-500'
                  : 'border-gray-300'
              }`}>
                {preferences.studyTime === time.value && (
                  <div className="w-3 h-3 bg-white rounded-full" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Globe className="w-4 h-4 inline mr-2" />
          Timezone
        </label>
        <select
          value={preferences.timezone}
          onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">Select your timezone</option>
          <option value="UTC-8">Pacific Time (UTC-8)</option>
          <option value="UTC-5">Eastern Time (UTC-5)</option>
          <option value="UTC+0">GMT (UTC+0)</option>
          <option value="UTC+5:30">India Standard Time (UTC+5:30)</option>
          <option value="UTC+8">China Standard Time (UTC+8)</option>
        </select>
      </div>
    </div>
  );

  const renderGoalStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Clock className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {preferences.dailyGoal} minutes per day
        </h3>
        <p className="text-gray-600">Adjust your daily learning goal</p>
      </div>

      <div className="space-y-4">
        <input
          type="range"
          min="15"
          max="120"
          step="15"
          value={preferences.dailyGoal}
          onChange={(e) => setPreferences(prev => ({ ...prev, dailyGoal: parseInt(e.target.value) }))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>15 min</span>
          <span>60 min</span>
          <span>120 min</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[15, 30, 60].map((minutes) => (
          <Button
            key={minutes}
            variant={preferences.dailyGoal === minutes ? "default" : "outline"}
            onClick={() => setPreferences(prev => ({ ...prev, dailyGoal: minutes }))}
            className="py-3"
          >
            {minutes} min
          </Button>
        ))}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (steps[currentStep].component) {
      case 'tracks':
        return renderTracksStep();
      case 'schedule':
        return renderScheduleStep();
      case 'goal':
        return renderGoalStep();
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8"
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600 mb-6">
              {steps[currentStep].description}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderCurrentStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : onClose()}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{currentStep > 0 ? 'Back' : 'Cancel'}</span>
            </Button>

            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 flex items-center space-x-2"
            >
              <span>{currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OnboardingFlow;
