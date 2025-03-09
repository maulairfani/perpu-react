import React, { useState } from "react";
import TreeNode from "./TreeNode";
import { useTree } from "./context/TreeContext";
import NodeFormModal from "./modals/NodeFormModal";
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";

/**
 * TreeView component renders the entire document structure as a hierarchical tree
 * Includes functionality for adding, editing, and deleting nodes
 * 
 * @param {Function} onNodeSelect - Callback function when a node is selected
 * @returns {JSX.Element} - Rendered tree structure with document nodes
 */
const TreeView = ({ onNodeSelect }) => {
  // Get tree data and operations from context
  const { treeData, addNode, editNode, deleteNode } = useTree();
  
  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNodePath, setSelectedNodePath] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  
  /**
   * Handle opening the add node modal
   * 
   * @param {Object} parentNode - The parent node to add a child to
   * @param {Array} parentPath - Path to the parent node
   */
  const handleAddNode = (parentNode, parentPath) => {
    setSelectedNodePath(parentPath);
    setIsAddModalOpen(true);
  };
  
  /**
   * Handle opening the edit node modal
   * 
   * @param {Object} node - The node to edit
   * @param {Array} path - Path to the node
   */
  const handleEditNode = (node, path) => {
    setSelectedNode(node);
    setSelectedNodePath(path);
    setIsEditModalOpen(true);
  };
  
  /**
   * Handle opening the delete confirmation modal
   * 
   * @param {Object} node - The node to delete
   * @param {Array} path - Path to the node
   */
  const handleDeleteNode = (node, path) => {
    setSelectedNode(node);
    setSelectedNodePath(path);
    setIsDeleteModalOpen(true);
  };
  
  /**
   * Handle submitting the add node form
   * 
   * @param {Object} formData - The form data for the new node
   */
  const handleAddSubmit = (formData) => {
    addNode(selectedNodePath, formData);
    setIsAddModalOpen(false);
  };
  
  /**
   * Handle submitting the edit node form
   * 
   * @param {Object} formData - The updated form data for the node
   */
  const handleEditSubmit = (formData) => {
    editNode(selectedNodePath, formData);
    setIsEditModalOpen(false);
  };
  
  /**
   * Handle confirming node deletion
   */
  const handleDeleteConfirm = () => {
    deleteNode(selectedNodePath);
    setIsDeleteModalOpen(false);
  };
  return (
    <div className="p-6 h-full">
      <div className="space-y-2">
        {/* Header section with title and document type */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold tracking-tight">
            Document Structure
          </h2>
          <div className="rounded-md bg-secondary px-2.5 py-1.5 text-xs font-medium text-secondary-foreground">
            UU ITE
          </div>
        </div>
        
        {/* Tree nodes container */}
        <div className="space-y-1">
          {treeData.map((node, index) => (
            <TreeNode 
              key={index} 
              node={node} 
              isFirst={index === 0}
              isLast={index === treeData.length - 1}
              onNodeSelect={onNodeSelect}
              onAddNode={handleAddNode}
              onEditNode={handleEditNode}
              onDeleteNode={handleDeleteNode}
              nodePath={[index]}
            />
          ))}
        </div>
      </div>
      
      {/* Footer with instructions */}
      <div className="mt-6 pt-6 border-t">
        <p className="text-xs text-muted-foreground">
          Click on a node to view its content and explanation
        </p>
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
        initialData={selectedNode}
        title="Edit Node"
      />
      
      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        node={selectedNode}
      />
    </div>
  );
};

export default TreeView;
