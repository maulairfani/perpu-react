import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown, FileText, Plus, Edit, Trash2, MoreHorizontal } from "lucide-react";
import useTreeNode from "./hooks/useTreeNode";
import NodeChildren from "./NodeChildren";

const TreeNode = ({ 
  node, 
  level = 0, 
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

  // Derive nodeTitle from node object.  This is a crucial addition.
  const nodeTitle = node.type && node.name ? `${node.name}` : node.id;


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
            flex items-center py-2 px-3 rounded-lg select-none
            transition-all duration-200 ease-in-out
            ${hasChildren || hasContent ? 'cursor-pointer' : ''}
            ${isHovered ? 'bg-primary/10 backdrop-blur-sm shadow-sm' : 'hover:bg-primary/5'}
          `}
          onClick={() => {
            toggleExpand();
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
                  <ChevronDown className="w-3 h-3 text-primary transition-transform duration-200" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-primary transition-transform duration-200" />
                )
              ) : hasContent ? (
                <FileText className="w-3 h-3 text-primary" />
              ) : null}
            </div>

            {/* Node name with refined typography */}
            <span className="text-[14px] font-medium text-foreground/90 truncate" onClick={() => onNodeSelect(node)}>
              {nodeTitle}
            </span>

            {/* Menu button container with modern styling */}
            <div className="ml-auto h-4 w-4 flex items-center justify-center" ref={menuRef}>
              {isHovered && (
                <button
                  className="p-0.5 rounded-md bg-white hover:bg-primary/10 text-primary hover:text-primary/80 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  title="Actions"
                >
                  <MoreHorizontal size={10} />
                </button>
              )}

              {/* Popover menu with modern styling */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg z-10 py-1 border border-border/10">
                  <button
                    className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-primary/10 flex items-center gap-2 text-foreground/90 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddNode && onAddNode(node, nodePath);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Plus size={10} className="text-primary/70" />
                    Add child
                  </button>
                  <button
                    className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-primary/10 flex items-center gap-2 text-foreground/90 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditNode && onEditNode(node, nodePath);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Edit size={10} className="text-primary/70" />
                    Edit
                  </button>
                  <button
                    className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-destructive/10 flex items-center gap-2 text-destructive/90 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNode && onDeleteNode(node, nodePath);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Trash2 size={10} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Children nodes with updated styling */}
        {isExpanded && hasChildren && (
          <NodeChildren 
            node={node} 
            level={level + 1} 
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