
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, Menu, User, Settings, Search, Upload, LogOut, BookOpen, History, Star, Database, Boxes, Phone, MessageSquare, HelpCircle } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

const DashboardLayout = ({ children, searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen border-r border-border/10 bg-background transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-[240px]'}`}>
        {/* Logo section */}
        <div className="flex h-14 items-center px-4 border-b border-border/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Boxes size={20} className="text-white" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-primary">Govnetic</span>
                <span className="text-xs text-muted-foreground">Admin Dashboard</span>
              </div>
            )}
          </div>
        </div>

        {/* Main menu */}
        <div className="flex flex-col gap-4 py-4">
          {/* Platform section */}
          <div className="px-4">
            <div className="text-xs font-medium text-muted-foreground mb-2">Platform</div>
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  location.pathname === '/' ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <BookOpen size={18} />
                {!isSidebarCollapsed && <span>Dokumen</span>}
              </Link>
              <Link
                to="/upload"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  location.pathname === '/upload' ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <Upload size={18} />
                {!isSidebarCollapsed && <span>Unggah</span>}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User size={20} className="text-primary" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1">
                <div className="text-sm font-medium">Admin User</div>
                <div className="text-xs text-muted-foreground">admin@govnetic.com</div>
              </div>
            )}
            {!isSidebarCollapsed && (
              <div className="relative">
                <button 
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="p-1.5 rounded-md hover:bg-muted/20"
                >
                  <Settings size={18} className="text-muted-foreground" />
                </button>
                
                {isSettingsOpen && (
                  <div className="absolute right-0 bottom-12 w-48 bg-white rounded-lg shadow-lg z-10 py-1 border border-border/10">
                    <div className="px-4 py-2 border-b border-border/10">
                      <div className="text-sm font-medium">Admin User</div>
                      <div className="text-xs text-muted-foreground">admin@govnetic.com</div>
                    </div>
                    <button
                      onClick={() => {
                        signOut(auth);
                        setIsSettingsOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-[240px]'}`}>
        {/* Header */}
        <header className="h-14 border-b border-border/10 bg-background px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-md hover:bg-primary/10 text-primary transition-colors duration-200"
            >
              <Menu size={20} />
            </button>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documents..."
                className="pl-10 pr-4 py-1.5 rounded-md bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
