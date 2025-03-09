import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import NodeContent from './components/NodeContent';

/**
 * View component is the main layout container for the document viewer
 * It implements a resizable three-panel layout with sidebars and content area
 * 
 * @returns {JSX.Element} - The main application view with resizable panels
 */
const View = () => {
  // State for panel widths and interaction
  const [leftWidth, setLeftWidth] = useState(320);
  const [rightWidth, setRightWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  
  // State for selected document node
  const [selectedNode, setSelectedNode] = useState(null);
  
  /**
   * Handles the resizing of panels when user drags the dividers
   * 
   * @param {Event} event - The mouse event
   * @param {string} side - Which panel is being resized ('left' or 'right')
   */
  const handleDrag = (event, side) => {
    event.preventDefault();
    setIsDragging(true);
    
    const handleMouseMove = (e) => {
      if (side === 'left') {
        // Constrain left panel width between 250px and 600px
        setLeftWidth(Math.max(250, Math.min(600, e.clientX)));
      } else if (side === 'right') {
        // Constrain right panel width between 250px and 600px
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
      {/* Left sidebar - contains document structure */}
      <div 
        style={{ width: leftWidth }} 
        className={`h-full bg-card border-r transition-colors duration-200 ease-in-out
          ${isDragging ? 'select-none' : ''}`}
      >
        <div className="h-full overflow-y-auto">
          <Sidebar onNodeSelect={setSelectedNode} />
        </div>
      </div>
      
      {/* Left resizer - allows adjusting left sidebar width */}
      <div
        className={`w-1 hover:w-1.5 bg-border hover:bg-primary/50 cursor-ew-resize 
          transition-all duration-150 ease-in-out relative group`}
        onMouseDown={(e) => handleDrag(e, 'left')}
      >
        <div className="absolute inset-y-0 -left-2 right-0 group-hover:right-2 cursor-ew-resize" />
      </div>
      
      {/* Main content area - displays selected node content */}
      <div className="flex-1 bg-background h-full overflow-hidden">
        <div className="h-full p-6">
          <div className="rounded-lg border bg-card h-full shadow-sm p-6 overflow-y-auto">
            {selectedNode ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">{selectedNode.name}</h2>
                <NodeContent node={selectedNode} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Select a node from the sidebar to view its content</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Right resizer - allows adjusting right sidebar width */}
      <div
        className={`w-1 hover:w-1.5 bg-border hover:bg-primary/50 cursor-ew-resize 
          transition-all duration-150 ease-in-out relative group`}
        onMouseDown={(e) => handleDrag(e, 'right')}
      >
        <div className="absolute inset-y-0 -left-2 right-0 group-hover:right-2 cursor-ew-resize" />
      </div>
      
      {/* Right sidebar - currently empty, can be used for additional features */}
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
