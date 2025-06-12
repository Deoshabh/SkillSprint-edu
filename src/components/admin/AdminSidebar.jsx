
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart,
  Flag,
  Settings,
  Zap,
} from 'lucide-react';

const AdminSidebar = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: BarChart },
    { id: 'flags', label: 'Content Flags', icon: Flag },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-card p-4 flex flex-col">
      <div className="flex items-center gap-2 p-4 mb-4">
        <Zap className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold">SkillSprint Admin</span>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? 'secondary' : 'ghost'}
            onClick={() => setActiveView(item.id)}
            className="justify-start gap-3"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Button>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
