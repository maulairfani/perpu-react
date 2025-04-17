
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, User, ArrowLeft } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full bg-white border-b border-border/10 shadow-sm py-3 px-6 z-10 relative">
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Left section: Logo, sidebar toggle and back button */}
          <div className="flex items-center gap-4">
            {/* Sidebar toggle button */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-primary/10 text-primary transition-colors duration-200"
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Menu size={16} />
            </button>
            
            {/* Logo */}
            <div className="font-bold text-xl text-primary">Govnetic</div>
          </div>
          
          {/* Right section: Profile icon */}
          <div>
            <button className="p-2 rounded-full hover:bg-muted/20 transition-colors duration-200">
              <User size={20} className="text-primary" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen border-r border-border/10 bg-background transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-[240px]'}`} style={{ marginTop: '61px' }}>
        <div className="flex flex-col gap-0.5 py-2">
          <div className={`px-3 py-2 ${isSidebarCollapsed ? 'hidden' : ''}`}>
            <span className="text-xs font-medium text-muted-foreground">MENU</span>
          </div>
          <nav className="px-2">
            <Link
              to="/"
              className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm transition-colors ${
                location.pathname === '/' ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <FileText size={16} />
              {!isSidebarCollapsed && <span>Dokumen</span>}
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'pl-16' : 'pl-[240px]'}`} style={{ marginTop: '61px' }}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
