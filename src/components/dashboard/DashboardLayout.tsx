import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, User, FileText, MessageSquare, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { signOut } from '../../lib/auth';

const sidebarItems = [
  { icon: <User className="w-5 h-5" />, label: 'Profile' },
  { icon: <FileText className="w-5 h-5" />, label: 'Applications' },
  { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages' },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-white border-r border-gray-200 p-4"
      >
        <div className="space-y-6">
          <div className="flex items-center space-x-2 px-2 py-4">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold">Dashboard</h2>
              <p className="text-sm text-gray-500">Welcome back</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onTabChange?.(item.label)}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === item.label
                    ? 'bg-primary-50 text-primary-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-4 mt-6 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-red-500"
              onClick={handleSignOut}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}