import React from 'react';
import TreeNode from './TreeNode';

/**
 * NodeChildren component renders the child nodes of a tree node
 * 
 * @param {Object} node - The parent node whose children to render
 * @param {number} level - The current nesting level
 * @param {Function} onNodeSelect - Callback function when a node is selected
 * @returns {JSX.Element} - Rendered child nodes with appropriate styling
 */
export default function NodeChildren({ node, level, onNodeSelect }) {
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
        />
      ))}
    </div>
  );
}