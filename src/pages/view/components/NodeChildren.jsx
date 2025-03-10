import React from 'react';
import TreeNode from './TreeNode';

export default function NodeChildren({ node, level, onNodeSelect, onAddNode, onEditNode, onDeleteNode, parentPath = [] }) {
  return (
    <div className="ml-2 border-l border-muted/30">
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