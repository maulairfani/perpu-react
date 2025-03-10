import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import NodeContent from './components/NodeContent';
import PDFViewer from './components/PDFViewer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import pdf from './components/UU0182003.pdf?url'

/**
 * View component is the main layout container for the document viewer
 * It implements a fixed three-column layout with collapsible PDF viewer
 * 
 * @returns {JSX.Element} - The main application view with fixed panels
 */
const View = () => {
  // Fixed width for the left sidebar
  const SIDEBAR_WIDTH = 380;
  
  // State for PDF viewer panel
  const [isPdfExpanded, setIsPdfExpanded] = useState(true);
  
  // State for selected document node
  const [selectedNode, setSelectedNode] = useState(null);
  
  /**
   * Toggles the PDF viewer panel expansion state
   */
  const togglePdfPanel = () => {
    setIsPdfExpanded(!isPdfExpanded);
  };

  // Use local PDF file to avoid CORS issues
  const pdfUrl = pdf;
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Left sidebar - contains document structure (fixed width) */}
      <div 
        style={{ width: SIDEBAR_WIDTH }} 
        className="h-full bg-card border-r transition-colors duration-200"
      >
        <div className="h-full overflow-y-auto">
          <Sidebar onNodeSelect={setSelectedNode} />
        </div>
      </div>
      
      {/* Main content area - displays selected node content */}
      <div 
        className={`bg-background h-full overflow-hidden transition-all duration-300
          ${!isPdfExpanded ? 'flex justify-center w-full' : 'flex-1'}`}
      >
        <div 
          className={`h-full p-6 transition-all duration-300
            ${!isPdfExpanded ? 'w-3/4 mx-auto' : 'w-full'}`}
        >
          <div className="rounded-lg border bg-card h-full shadow-sm p-6 overflow-y-auto">
            {selectedNode ? (
              <div>
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
      
      {/* PDF viewer toggle button */}
      <button
        onClick={togglePdfPanel}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primary text-primary-foreground p-2 rounded-l-md shadow-md"
        aria-label={isPdfExpanded ? 'Collapse PDF viewer' : 'Expand PDF viewer'}
      >
        {isPdfExpanded ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
      
      {/* Right panel - PDF viewer (collapsible) */}
      <div 
        className={`h-full bg-card border-l transition-all duration-300
          ${isPdfExpanded ? 'flex-1' : 'w-0 opacity-0'}`}
      >
        <div className="h-full overflow-hidden">
          {/* PDF viewer component */}
          <PDFViewer pdfUrl={pdfUrl} />
        </div>
      </div>
    </div>
  );
};

export default View;