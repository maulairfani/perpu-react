import React from 'react';
import { ArrowLeft, User, Menu } from 'lucide-react';


const Header = ({ documentTitle, documentNumber, onToggleSidebar, isSidebarCollapsed }) => {
  return (
    <header className="w-full bg-white border-b border-border/10 shadow-sm py-3 px-6 z-10 relative">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Left section: Logo, sidebar toggle and back button */}
        <div className="flex items-center gap-4">
          {/* Sidebar toggle button */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md hover:bg-primary/10 text-primary transition-colors duration-200"
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Menu size={16} />
          </button>
          
          {/* Logo */}
          <div className="font-bold text-xl text-primary">Govnetic</div>
          
          {/* Back button */}
          <button 
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={14} />
            <span>Back to Homepage</span>
          </button>
        </div>
        
        {/* Center section: Document title */}
        <div className="text-center">
          <div className="text-sm font-semibold text-primary">
            {documentTitle || "Undang-Undang"}
          </div>
          <div className="text-sm font-medium text-foreground/80">
            {documentNumber || "No. 5 Tahun 2017"}
          </div>
        </div>
        
        {/* Right section: Profile icon */}
        <div>
          <button className="p-2 rounded-full hover:bg-muted/20 transition-colors duration-200">
            <User size={20} className="text-primary" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;