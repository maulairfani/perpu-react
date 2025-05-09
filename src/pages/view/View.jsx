import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import NodeContent from './components/NodeContent';
import PDFViewer from './components/PDFViewer';
import Header from './components/Header';
import PreambleView from './components/PreambleView';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import pdf from './components/UU0182003.pdf'
import { useTree } from './components/context/TreeContext';
import NodeFormModal from './components/modals/NodeFormModal';
import DeleteConfirmationModal from './components/modals/DeleteConfirmationModal';
import { useParams } from 'react-router-dom';
import { documentService } from '../../services/api';

const View = () => {
  const { id } = useParams();
  const [documentDetail, setDocumentDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocumentDetail = async () => {
      try {
        setIsLoading(true);
        const data = await documentService.getDocumentDetail(id);
        setDocumentDetail(data);
        // Initialize tree data from API response
        if (data.treeData) {
          // Assuming you have a setTreeData function in TreeContext
          setTreeData(data.treeData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocumentDetail();
  }, [id]);
  // Fixed width for the left sidebar
  const SIDEBAR_WIDTH = 320;
  
  // State for sidebar visibility
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // State for PDF viewer panel
  const [isPdfExpanded, setIsPdfExpanded] = useState(false);
  
  // State for selected document node
  const [selectedNode, setSelectedNode] = useState(null);

  // State for node management modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNodePath, setSelectedNodePath] = useState([]);
  const [nodeForModal, setNodeForModal] = useState(null);

  // Get tree data and operations from context
  const { treeData, setTreeData, addNode, editNode, deleteNode } = useTree();
  
  // Set initial selected node to Pasal 1
  useEffect(() => {
    const findPasal1 = (nodes) => {
      for (const node of nodes) {
        if (node.type === 'pasal' && node.name === 'Pasal 1') {
          return node;
        }
        if (node.children) {
          const found = findPasal1(node.children);
          if (found) return found;
        }
      }
      return null;
    };

    const pasal1 = findPasal1(treeData);
    if (pasal1) {
      setSelectedNode(pasal1);
    }
  }, [treeData]);
  
  /**
   * Toggles the PDF viewer panel expansion state
   */
  const togglePdfPanel = () => {
    setIsPdfExpanded(!isPdfExpanded);
  };
  
  /**
   * Toggles the sidebar collapse state
   */
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  /**
   * Handlers for node management
   */
  const handleAddNode = (parentNode, parentPath) => {
    setSelectedNodePath(parentPath);
    setIsAddModalOpen(true);
  };

  const handleEditNode = (node, path) => {
    setNodeForModal(node);
    setSelectedNodePath(path);
    setIsEditModalOpen(true);
  };

  const handleDeleteNode = (node, path) => {
    setNodeForModal(node);
    setSelectedNodePath(path);
    setIsDeleteModalOpen(true);
  };

  const handleAddSubmit = (formData) => {
    addNode(selectedNodePath, formData);
    setIsAddModalOpen(false);
  };

  const [isUpdating, setIsUpdating] = useState(false);

  const handleEditSubmit = async (formData) => {
    try {
      if (nodeForModal?.id) {
        setIsUpdating(true);
        const nodeUpdate = {
          name: formData.name,
          type: formData.type,
          title: formData.title,
          content: formData.content,
          explanation: formData.explanation
        };
        await documentService.updateNode(id, nodeForModal.id, nodeUpdate);
        editNode(selectedNodePath, formData);
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to update node:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteConfirm = () => {
    deleteNode(selectedNodePath);
    setIsDeleteModalOpen(false);
  };

  // Use local PDF file to avoid CORS issues
  const pdfUrl = pdf;
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  if (!documentDetail) {
    return <div className="flex items-center justify-center h-screen">Document not found</div>;
  }

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      {/* Header with sidebar toggle */}
      <Header 
        documentTitle={documentDetail.title}
        documentNumber={`No. ${documentDetail.number} Tahun ${documentDetail.year}`} 
        onToggleSidebar={toggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      {/* Main content container - flex row for sidebar and content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left sidebar - contains document structure (collapsible) */}
        <div 
          style={{ width: isSidebarCollapsed ? '0' : SIDEBAR_WIDTH }} 
          className="h-full bg-card/95 backdrop-blur-sm border-r border-border/10 transition-all duration-300 overflow-hidden"
        >
          <div className="h-full overflow-y-auto">
            <Sidebar 
              onNodeSelect={setSelectedNode} 
              onAddNode={handleAddNode}
              onEditNode={handleEditNode}
              onDeleteNode={handleDeleteNode}
            />
          </div>
        </div>
        
        
        {/* Main content area - displays selected node content */}
        <div 
          className={`bg-background h-full overflow-hidden transition-all duration-300 ${isPdfExpanded ? 'flex-1' : 'flex-1'}`}
        >
          <div 
            className="h-full p-6 transition-all duration-300 w-full bg-white overflow-hidden"
          >
            <div className="rounded-xl border border-border/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 p-6 h-full overflow-y-auto">
              {selectedNode ? (
                <div className="h-full">
                  {selectedNode.type === 'pembukaan' ? (
                    <PreambleView />
                  ) : (
                    <NodeContent node={selectedNode} />
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-foreground/80">
                  <p>Select a node from the sidebar to view its content</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* PDF viewer toggle button */}
        <button
          onClick={togglePdfPanel}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-primary/90 hover:bg-primary text-primary-foreground p-2 rounded-l-lg shadow-lg transition-colors duration-200"
          aria-label={isPdfExpanded ? 'Collapse PDF viewer' : 'Expand PDF viewer'}
        >
          {isPdfExpanded ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        
        {/* Right panel - PDF viewer (collapsible) */}
        <div 
          className={`h-full bg-card/95 backdrop-blur-sm border-l border-border/10 transition-all duration-300
            ${isPdfExpanded ? 'w-[600px]' : 'w-0 opacity-0'}`}
        >
          <div className="h-full overflow-hidden">
            {/* PDF viewer component */}
            <PDFViewer pdfUrl={pdfUrl} />
          </div>
        </div>
      </div>

      {/* Modals for node management */}
      <NodeFormModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        initialData={null}
        title="Add Node"
      />
      
      <NodeFormModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={nodeForModal}
        title="Edit Node"
        isUpdating={isUpdating}
      />
      
      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        node={nodeForModal}
      />
    </div>
  );
};

export default View;