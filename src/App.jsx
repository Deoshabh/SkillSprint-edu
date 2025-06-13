import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import AuthModal from '@/components/AuthModal';
import OnboardingFlow from '@/components/OnboardingFlow';
import CourseViewer from '@/components/CourseViewer';
import ChatInterface from '@/components/ChatInterface';
import QuizInterface from '@/components/QuizInterface';
import MiniGames from '@/components/MiniGames';
import Calendar from '@/components/Calendar';
import Analytics from '@/components/Analytics';
import Leaderboard from '@/components/Leaderboard';
import Profile from '@/components/Profile';
import AdminLayout from '@/pages/admin/AdminLayout';
import { supabase } from '@/lib/supabaseClient';

function App() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [showAuth, setShowAuth] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchUserProfile();
    } else {
      setUser(null);
    }
  }, [session]);
  
  const fetchUserProfile = async () => {
    if (session?.user) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (error) {
          console.error('Profile fetch error:', error.message);
          // If profile doesn't exist, it should be created by the database trigger
          // But let's wait a moment and try again
          setTimeout(async () => {
            const { data: retryData, error: retryError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (retryError) {
              toast({ 
                title: "Profile Error", 
                description: "Please refresh the page or contact support", 
                variant: "destructive" 
              });
            } else {
              setUser({ ...session.user, ...retryData });
              if (!retryData.name || !retryData.onboarding_completed) {
                setShowOnboarding(true);
              }
            }
          }, 2000);
        } else if (data) {
          console.log('✅ Profile loaded:', data);
          setUser({ ...session.user, ...data });
          if (!data.name || !data.onboarding_completed) {
            setShowOnboarding(true);
          }
        }
      } catch (err) {
        console.error('Profile fetch failed:', err);
        toast({ 
          title: "Error", 
          description: "Failed to load profile", 
          variant: "destructive" 
        });
      }
    }
  };


  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
       toast({ title: "Logout Error", description: error.message, variant: "destructive" });
    } else {
      setUser(null);
      setCurrentView('dashboard');
      toast({
        title: "Logged out successfully",
        description: "See you soon! 👋",
      });
    }
  };
  
  const handleOnboardingComplete = async (preferences) => {
    if (!user?.id) return;
    
    const { error } = await supabase
      .from('profiles')
      .update({ 
        name: preferences.name,
        onboarding_completed: true,
        selected_track: preferences.selectedTrack,
        daily_goal: preferences.dailyGoal
      })
      .eq('id', user.id);

    if (error) {
      console.error('Onboarding update error:', error);
      toast({ title: "Error updating profile", description: error.message, variant: "destructive" });
    } else {
      await fetchUserProfile();
      setShowOnboarding(false);
      toast({
        title: "Setup complete! 🎯",
        description: "Your personalized learning journey starts now!",
      });
    }
  };

  const handleCourseSelect = (course, module = null) => {
    setSelectedCourse(course);
    setSelectedModule(module);
    setCurrentView('course');
  };

  const renderCurrentView = () => {
    if (currentView.startsWith('admin')) {
        return user?.role === 'admin' ? <AdminLayout user={user} /> : <Dashboard user={user} onCourseSelect={handleCourseSelect} />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} onCourseSelect={handleCourseSelect} />;
      case 'course':
        return (
          <CourseViewer 
            courseId={selectedCourse?.id} 
            module={selectedModule}
            user={user}
            onBack={() => setCurrentView('dashboard')}
            onModuleComplete={(moduleId) => {
              // TODO: Save to supabase
              toast({
                title: "Module completed! 🎉",
                description: "+50 points earned!",
              });
            }}
          />
        );
      case 'quiz':
        return <QuizInterface user={user} onBack={() => setCurrentView('dashboard')} />;
      case 'games':
        return <MiniGames user={user} onBack={() => setCurrentView('dashboard')} />;
      case 'calendar':
        return <Calendar user={user} onBack={() => setCurrentView('dashboard')} />;
      case 'analytics':
        return <Analytics user={user} onBack={() => setCurrentView('dashboard')} />;
      case 'leaderboard':
        return <Leaderboard user={user} onBack={() => setCurrentView('dashboard')} />;
      case 'profile':
        return (
          <Profile 
            user={user} 
            onBack={() => setCurrentView('dashboard')}
            onUpdateUser={(updatedUser) => {
              // TODO: Update in supabase
              setUser(updatedUser);
            }}
          />
        );
      default:
        return <Dashboard user={user} onCourseSelect={handleCourseSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar 
        user={user}
        currentView={currentView}
        onViewChange={setCurrentView}
        onAuthClick={() => setShowAuth(true)}
        onLogout={handleLogout}
      />
      
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <ChatInterface 
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        user={user}
      />

      <AuthModal 
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
      />

      <OnboardingFlow
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
        onClose={() => setShowOnboarding(false)}
      />

      <Toaster />
    </div>
  );
}

export default App;