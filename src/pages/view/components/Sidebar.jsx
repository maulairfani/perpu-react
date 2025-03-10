import React from 'react';
import TreeView from './TreeView';

/**
 * Sidebar component that contains the document structure tree view
 * 
 * @param {Function} onNodeSelect - Callback function when a node is selected
 * @param {Function} onAddNode - Callback function when adding a new node
 * @param {Function} onEditNode - Callback function when editing a node
 * @param {Function} onDeleteNode - Callback function when deleting a node
 * @returns {JSX.Element} - Rendered sidebar with tree view
 */
const Sidebar = ({ onNodeSelect, onAddNode, onEditNode, onDeleteNode }) => {
  return (
    <>
      <TreeView 
        onNodeSelect={onNodeSelect} 
        onAddNode={onAddNode}
        onEditNode={onEditNode}
        onDeleteNode={onDeleteNode}
      />
    </>
  );
};

export default Sidebar;