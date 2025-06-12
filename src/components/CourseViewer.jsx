
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { courseData } from '@/data/courses.js';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Circle, 
  Clock, 
  BookOpen, 
  Award,
  ChevronRight,
  Languages,
  PenSquare
} from 'lucide-react';

const CourseViewer = ({ courseId, module, user, onBack, onModuleComplete }) => {
  const [selectedModule, setSelectedModule] = useState(module || null);
  const [completedModules, setCompletedModules] = useState(user?.completedModules || []);
  const [isHinglish, setIsHinglish] = useState(false);

  const course = courseData[courseId];

  useEffect(() => {
    if (module) {
      setSelectedModule(module);
    } else if (course?.modules.length > 0) {
      setSelectedModule(course.modules[0]);
    }
  }, [courseId, module, course]);

  const handleModuleSelect = (moduleData) => {
    setSelectedModule(moduleData);
  };

  const handleMarkComplete = () => {
    if (!selectedModule) return;

    const moduleId = selectedModule.id;
    if (!completedModules.includes(moduleId)) {
      const updatedCompleted = [...completedModules, moduleId];
      setCompletedModules(updatedCompleted);
      onModuleComplete(moduleId);
      
      toast({
        title: "Module completed! 🎉",
        description: `Great job completing "${selectedModule.title}"!`,
      });
    }
  };

  const getYouTubeEmbedUrl = (videoUrl) => {
    if (!videoUrl) return null;
    try {
      const url = new URL(videoUrl);
      const playlistId = url.searchParams.get("list");
      const videoId = url.searchParams.get("v");

      if (playlistId) {
        return `https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1`;
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
      }
      return null;
    } catch (e) {
      console.error("Invalid YouTube URL:", videoUrl, e);
      return null;
    }
  };

  const calculateProgress = () => {
    if (!course) return 0;
    const totalModules = course.modules.length;
    const completedCount = course.modules.filter(m => completedModules.includes(m.id)).length;
    return totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
  };
  
  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Button onClick={onBack}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const currentVideoUrl = isHinglish ? selectedModule?.hinglishLink : selectedModule?.englishLink;
  const embedUrl = getYouTubeEmbedUrl(currentVideoUrl);

  const creator = selectedModule 
    ? (isHinglish ? selectedModule.hinglishCreator || selectedModule.creator : selectedModule.englishCreator || selectedModule.creator) 
    : '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4 flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
            <p className="text-gray-600">{course.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl mb-2">{course.icon}</div>
            <div className="text-sm text-gray-600">Progress: {calculateProgress()}%</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div 
            className={`h-3 rounded-full bg-gradient-to-r ${course.color} transition-all duration-500`}
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Course Modules</h2>
            <div className="space-y-3">
              {course.modules.map((moduleData) => {
                const isCompleted = completedModules.includes(moduleData.id);
                const isSelected = selectedModule?.id === moduleData.id;
                return (
                  <motion.div
                    key={moduleData.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: course.modules.indexOf(moduleData) * 0.1 }}
                    className={`module-card p-4 rounded-lg border-2 cursor-pointer transition-all ${isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => handleModuleSelect(moduleData)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {isCompleted ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-gray-400" />}
                        <span className="text-sm font-medium text-gray-600">Week {moduleData.week}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{moduleData.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1"><Clock className="w-3 h-3" /><span>{moduleData.duration}</span></div>
                      <div className="flex items-center space-x-1"><BookOpen className="w-3 h-3" /><span>{moduleData.subtopics.length} subtopics</span></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2">
          {selectedModule ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedModule.title}</h2>
                  <Button variant="outline" size="sm" onClick={() => setIsHinglish(!isHinglish)} className="flex items-center space-x-2">
                    <Languages className="w-4 h-4" />
                    <span>{isHinglish ? 'English' : 'Hinglish'}</span>
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1"><Clock className="w-4 h-4" /><span>{selectedModule.duration}</span></div>
                  <div className="flex items-center space-x-1"><BookOpen className="w-4 h-4" /><span>{selectedModule.subtopics.length} subtopics</span></div>
                  <div className="flex items-center space-x-1"><span>by {creator}</span></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                {embedUrl ? (
                  <div className="video-container mb-4">
                    <iframe src={embedUrl} title={selectedModule.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">Video link is not available or invalid.</div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2"><Play className="w-5 h-5 text-indigo-500" /><span className="font-medium text-gray-900">{isHinglish ? 'Hinglish Audio' : 'English Audio'}</span></div>
                  <Button onClick={handleMarkComplete} disabled={completedModules.includes(selectedModule.id)} className={`flex items-center space-x-2 ${completedModules.includes(selectedModule.id) ? 'bg-green-500 hover:bg-green-600' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'}`}>
                    {completedModules.includes(selectedModule.id) ? (<><CheckCircle className="w-4 h-4" /><span>Completed</span></>) : (<><Circle className="w-4 h-4" /><span>Mark Complete</span></>)}
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Subtopics</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedModule.subtopics.map((topic, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">{index + 1}</div>
                      <span className="text-gray-900">{topic}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Practice Task</h3>
                  <div className="bg-indigo-50 p-4 rounded-lg flex items-center justify-between">
                    <p className="text-indigo-800">{selectedModule.practiceTask}</p>
                    <Button variant="outline" size="sm" onClick={() => toast({ title: "🚧 Task feature coming soon!" })}><PenSquare className="w-4 h-4 mr-2" />Start Task</Button>
                  </div>
              </div>

              {completedModules.includes(selectedModule?.id) && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-3"><Award className="w-8 h-8" /><div><h3 className="text-lg font-bold">Module Completed!</h3><p className="opacity-90">Great job! You've earned 50 points.</p></div></div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Select a Module</h3>
              <p className="text-gray-600">Choose a module from the list to start learning</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;
