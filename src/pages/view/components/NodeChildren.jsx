import React from 'react';
import TreeNode from './TreeNode';

/**
 * NodeChildren component renders the child nodes of a tree node
 * 
 * @param {Object} node - The parent node whose children to render
 * @param {number} level - The current nesting level
 * @param {Function} onNodeSelect - Callback function when a node is selected
 * @param {Function} onAddNode - Callback function when adding a new node
 * @param {Function} onEditNode - Callback function when editing a node
 * @param {Function} onDeleteNode - Callback function when deleting a node
 * @param {Array} parentPath - Array of indices representing the path to the parent node
 * @returns {JSX.Element} - Rendered child nodes with appropriate styling
 */
export default function NodeChildren({ node, level, onNodeSelect, onAddNode, onEditNode, onDeleteNode, parentPath = [] }) {
  return (
    <div className="ml-4 border-l-2 border-muted">
      {node.children?.map((childNode, index) => (
        <TreeNode
          key={index}
          node={childNode}
          level={level + 1}
          isFirst={index === 0}
          isLast={index === node.children.length - 1}
          onNodeSelect={onNodeSelect}
          onAddNode={onAddNode}
          onEditNode={onEditNode}
          onDeleteNode={onDeleteNode}
          nodePath={[...parentPath, index]}
        />
      ))}
    </div>
  );
}