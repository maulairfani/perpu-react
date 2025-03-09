import React, { useState } from 'react';
import Sidebar from './components/Sidebar';

const View = () => {
  const [leftWidth, setLeftWidth] = useState(320);
  const [rightWidth, setRightWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDrag = (event, side) => {
    event.preventDefault();
    setIsDragging(true);
    
    const handleMouseMove = (e) => {
      if (side === 'left') {
        setLeftWidth(Math.max(250, Math.min(600, e.clientX)));
      } else if (side === 'right') {
        setRightWidth(Math.max(250, Math.min(600, window.innerWidth - e.clientX)));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Left sidebar */}
      <div 
        style={{ width: leftWidth }} 
        className={`h-full bg-card border-r transition-colors duration-200 ease-in-out
          ${isDragging ? 'select-none' : ''}`}
      >
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
      </div>
      
      {/* Left resizer */}
      <div
        className={`w-1 hover:w-1.5 bg-border hover:bg-primary/50 cursor-ew-resize 
          transition-all duration-150 ease-in-out relative group`}
        onMouseDown={(e) => handleDrag(e, 'left')}
      >
        <div className="absolute inset-y-0 -left-2 right-0 group-hover:right-2 cursor-ew-resize" />
      </div>
      
      {/* Main content */}
      <div className="flex-1 bg-background h-full overflow-hidden">
        <div className="h-full p-6">
          <div className="rounded-lg border bg-card h-full shadow-sm">
            {/* Add your main content here */}
          </div>
        </div>
      </div>
      
      {/* Right resizer */}
      <div
        className={`w-1 hover:w-1.5 bg-border hover:bg-primary/50 cursor-ew-resize 
          transition-all duration-150 ease-in-out relative group`}
        onMouseDown={(e) => handleDrag(e, 'right')}
      >
        <div className="absolute inset-y-0 -left-2 right-0 group-hover:right-2 cursor-ew-resize" />
      </div>
      
      {/* Right sidebar */}
      <div 
        style={{ width: rightWidth }} 
        className={`h-full bg-card border-l transition-colors duration-200 ease-in-out
          ${isDragging ? 'select-none' : ''}`}
      >
        <div className="h-full p-4">
          {/* Add your right sidebar content here */}
        </div>
      </div>
    </div>
  );
};

export default View;
