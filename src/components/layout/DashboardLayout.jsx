
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border/10 bg-card/95 backdrop-blur-sm">
        <div className="flex h-16 items-center border-b border-border/10 px-6">
          <span className="text-lg font-bold text-primary">Govnetic</span>
        </div>
        <nav className="space-y-1 p-4">
          <Link
            to="/"
            className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm ${
              location.pathname === '/' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-primary/5'
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
