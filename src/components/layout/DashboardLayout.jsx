
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-[240px] border-r border-border/10 bg-background">
        <div className="flex h-14 items-center px-4 border-b border-border/10">
          <span className="text-base font-semibold text-primary">Govnetic</span>
        </div>
        <div className="flex flex-col gap-0.5 py-2">
          <div className="px-3 py-2">
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
              <span>Dokumen</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-[240px]">
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
