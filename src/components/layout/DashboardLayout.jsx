
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border/10 bg-background">
        <div className="flex h-16 items-center border-b border-border/10 px-6">
          <span className="text-lg font-bold text-primary">Govnetic</span>
        </div>
        <nav className="p-3">
          <Link
            to="/"
            className={`flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              location.pathname === '/' ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <FileText size={16} />
            <span>Dokumen</span>
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="pl-64">
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
