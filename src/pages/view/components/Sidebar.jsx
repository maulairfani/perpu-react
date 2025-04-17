import React from 'react';
import TreeView from './TreeView';
import DocumentInfo from './DocumentInfo';

const Sidebar = ({ onNodeSelect, onAddNode, onEditNode, onDeleteNode }) => {
  return (
    <div className="p-6 h-full bg-background/95 backdrop-blur-sm">
      <div className="space-y-6">
        <DocumentInfo />
        <TreeView 
          onNodeSelect={onNodeSelect} 
          onAddNode={onAddNode}
          onEditNode={onEditNode}
          onDeleteNode={onDeleteNode}
        />
      </div>
    </div>
  );
};

export default Sidebar;