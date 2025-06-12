import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Brain, 
  Gamepad2, 
  Calendar, 
  BarChart3, 
  Trophy, 
  User, 
  Menu, 
  X,
  Zap,
  Shield
} from 'lucide-react';
import { ThemeToggle } from '@/components/admin/ThemeToggle';

const Navbar = ({ user, currentView, onViewChange, onAuthClick, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, admin: false },
    { id: 'quiz', label: 'Quiz', icon: Brain, admin: false },
    { id: 'games', label: 'Games', icon: Gamepad2, admin: false },
    { id: 'calendar', label: 'Calendar', icon: Calendar, admin: false },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, admin: false },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, admin: false },
    { id: 'admin', label: 'Admin', icon: Shield, admin: true },
  ];

  const handleNavClick = (viewId) => {
    if (!user && viewId !== 'dashboard') {
      onAuthClick();
      return;
    }
    onViewChange(viewId);
    setIsMobileMenuOpen(false);
  };
  
  const availableNavItems = navItems.filter(item => !item.admin || user?.role === 'admin');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavClick('dashboard')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              SkillSprint
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-1">
            {availableNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick('profile')}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="hidden sm:block">{user.full_name || user.email}</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="hidden sm:flex"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={onAuthClick}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Sign In
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-background border-t border-border"
        >
          <div className="px-4 py-2 space-y-1">
            {availableNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => handleNavClick(item.id)}
                  className="w-full justify-start flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
            
            {user && (
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="w-full justify-start mt-4"
              >
                Logout
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;