
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, User, Settings, Search, Upload } from 'lucide-react';

const DashboardLayout = ({ children, searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen border-r border-border/10 bg-background transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-[240px]'}`}>
        {/* Logo section */}
        <div className="flex h-14 items-center px-4 border-b border-border/10">
          {isSidebarCollapsed ? (
            <span className="text-xl font-semibold text-primary">G</span>
          ) : (
            <span className="text-xl font-semibold text-primary">Govnetic</span>
          )}
        </div>

        {/* Main menu */}
        <div className="flex flex-col gap-1 py-4">
          <Link
            to="/"
            className={`flex items-center gap-3 mx-2 px-3 py-2 rounded-md ${
              location.pathname === '/' ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <FileText size={20} />
            {!isSidebarCollapsed && <span>Documents</span>}
          </Link>
          <Link
            to="/upload"
            className={`flex items-center gap-3 mx-2 px-3 py-2 rounded-md ${
              location.pathname === '/upload' ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <Upload size={20} />
            {!isSidebarCollapsed && <span>Unggah Dokumen</span>}
          </Link>
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
              <button className="p-1.5 rounded-md hover:bg-muted/20">
                <Settings size={18} className="text-muted-foreground" />
              </button>
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
