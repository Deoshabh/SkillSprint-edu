
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const AuthModal = ({ isOpen, onClose, onLogin, onSignup }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLoginMode) {
        // Login with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          console.error('Supabase login error:', error);
          toast({
            title: "Login failed",
            description: `${error.message} (Code: ${error.status || 'unknown'})`,
            variant: "destructive",
          });
        } else {
          console.log('✅ Login successful:', data.user.email);
          // Let App.jsx handle the profile fetching
          onClose();
          toast({
            title: "Welcome back!",
            description: "You've successfully logged in.",
          });
        }
      } else {
        // Signup with Supabase
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
            },
          },
        });

        if (error) {
          console.error('Supabase signup error:', error);
          toast({
            title: "Signup failed",
            description: `${error.message} (Code: ${error.status || 'unknown'})`,
            variant: "destructive",
          });
        } else {
          console.log('✅ Signup successful:', data.user?.email);
          // Profile will be created automatically by database trigger
          onClose();
          toast({
            title: "Welcome to SkillSprint!",
            description: data.user?.email_confirmed_at ? "Account created successfully!" : "Please check your email for verification.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Authentication error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
      setFormData({ name: '', email: '', password: '' });
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        toast({
          title: "Google OAuth Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Google OAuth Error",
        description: "Failed to initialize Google authentication. Please try email signup.",
        variant: "destructive",
      });
      console.error('Google OAuth error:', error);
    } finally {
      setIsLoading(false);
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
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-card text-card-foreground rounded-2xl shadow-2xl p-8"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {isLoginMode ? 'Welcome Back!' : 'Join SkillSprint'}
            </h2>
            <p className="text-muted-foreground">
              {isLoginMode 
                ? 'Sign in to continue your learning journey' 
                : 'Start your AI-powered learning adventure'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  <span>Please wait...</span>
                </div>
              ) : (
                isLoginMode ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleAuth}
              className="w-full mt-4 flex items-center justify-center space-x-2"
            >
              <img  className="w-5 h-5" alt="Google logo" src="https://images.unsplash.com/photo-1678483789111-3a04c4628bd6" />
              <span>Google</span>
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLoginMode ? "Don't have an account?" : "Already have an account?"}
              <Button
                type="button"
                variant="link"
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="ml-1 p-0 h-auto font-semibold text-primary"
              >
                {isLoginMode ? 'Sign up' : 'Sign in'}
              </Button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
