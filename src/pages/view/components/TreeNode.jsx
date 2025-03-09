import React from "react";
import { ChevronRight, ChevronDown, FileText } from "lucide-react";
import useTreeNode from "./hooks/useTreeNode";
import NodeChildren from "./NodeChildren";

/**
 * TreeNode component renders a single node in the document tree structure
 * 
 * @param {Object} node - The node data to render
 * @param {number} level - The nesting level of this node (for indentation)
 * @param {boolean} isFirst - Whether this node is the first child in its parent
 * @param {boolean} isLast - Whether this node is the last child in its parent
 * @param {Function} onNodeSelect - Callback function when a node is selected
 */
const TreeNode = ({ node, level = 0, isFirst, isLast, onNodeSelect }) => {
  // Use the custom hook to manage node state and behavior
  const {
    isExpanded,
    isHovered,
    hasChildren,
    hasContent,
    toggleExpand,
    handleMouseEnter,
    handleMouseLeave
  } = useTreeNode(node);

  return (
    <div className="relative">
      <div
        className={`group relative flex flex-col ${level > 0 ? 'ml-4' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Node header - clickable area with icon and name */}
        <div
          className={`
            flex items-center py-2 px-3 rounded-md select-none
            transition-colors duration-150 ease-in-out
            ${hasChildren || hasContent ? 'cursor-pointer' : ''}
            ${isHovered ? 'bg-accent' : 'hover:bg-accent/50'}
          `}
          onClick={() => {
            toggleExpand();
            // If node has content, notify parent component about selection
            if (hasContent) {
              onNodeSelect && onNodeSelect(node);
            }
          }}
        >
          <div className="flex items-center flex-1 min-w-0">
            {/* Node icon - changes based on node state */}
            <div className="w-4 h-4 mr-2 flex-shrink-0">
              {hasChildren ? (
                isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-150" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform duration-150" />
                )
              ) : hasContent ? (
                <FileText className="w-4 h-4 text-muted-foreground" />
              ) : null}
            </div>
            
            {/* Node name */}
            <span className="text-sm font-medium truncate">
              {node.name}
            </span>
          </div>
        </div>

        {/* Render children nodes when expanded */}
        {isExpanded && hasChildren && (
          <NodeChildren 
            node={node} 
            level={level} 
            onNodeSelect={onNodeSelect} 
          />
        )}
      </div>
    </div>
  );
};

export default TreeNode;
