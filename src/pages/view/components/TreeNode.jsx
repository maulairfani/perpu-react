import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown, FileText, Plus, Edit, Trash2, MoreVertical } from "lucide-react";
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
 * @param {Function} onAddNode - Callback function when adding a new node
 * @param {Function} onEditNode - Callback function when editing a node
 * @param {Function} onDeleteNode - Callback function when deleting a node
 * @param {Array} nodePath - Array of indices representing the path to this node
 */
const TreeNode = ({ 
  node, 
  level = 0, 
  isFirst, 
  isLast, 
  onNodeSelect,
  onAddNode,
  onEditNode,
  onDeleteNode,
  nodePath = []
}) => {
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
  
  // State for popover menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            
            {/* Node name - show the type and id instead of just the id */}
            <span className="text-sm font-medium truncate">
              {node.type && node.name ? `${node.name}` : node.id}
            </span>
            
            {/* Menu button container - always present but content only visible on hover */}
            <div className="ml-auto h-6 w-6 flex items-center justify-center" ref={menuRef}>
              {isHovered && (
                <button
                  className="p-1 rounded-sm hover:bg-accent-foreground/10 text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  title="Actions"
                >
                  <MoreVertical size={14} />
                </button>
              )}
              
              {/* Popover menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 py-1 border">
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-accent flex items-center gap-2 text-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddNode && onAddNode(node, nodePath);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Plus size={14} />
                    Add child
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-accent flex items-center gap-2 text-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditNode && onEditNode(node, nodePath);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-destructive hover:text-destructive-foreground flex items-center gap-2 text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNode && onDeleteNode(node, nodePath);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Render children nodes when expanded */}
        {isExpanded && hasChildren && (
          <NodeChildren 
            node={node} 
            level={level} 
            onNodeSelect={onNodeSelect}
            onAddNode={onAddNode}
            onEditNode={onEditNode}
            onDeleteNode={onDeleteNode}
            parentPath={nodePath}
          />
        )}
      </div>
    </div>
  );
};

export default TreeNode;