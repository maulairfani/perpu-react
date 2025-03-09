import React from 'react';
import TreeView from './TreeView';

/**
 * Sidebar component that contains the document structure tree view
 * 
 * @param {Function} onNodeSelect - Callback function when a node is selected
 * @returns {JSX.Element} - Rendered sidebar with tree view
 */
const Sidebar = ({ onNodeSelect }) => {
  return (
    <>
      <TreeView onNodeSelect={onNodeSelect} />
    </>
  );
};

export default Sidebar;