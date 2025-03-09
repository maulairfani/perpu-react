import React, { useState } from "react";
import { ChevronRight, ChevronDown, FileText } from "lucide-react";

const TreeNode = ({ node, level = 0, isFirst, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const hasContent = node.content && node.explanation;

  const toggleExpand = (e) => {
    e.stopPropagation();
    if (hasChildren) setIsExpanded(!isExpanded);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className="relative">
      <div
        className={`group relative flex flex-col ${level > 0 ? 'ml-4' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`
            flex items-center py-2 px-3 rounded-md select-none
            transition-colors duration-150 ease-in-out
            ${hasChildren || hasContent ? 'cursor-pointer' : ''}
            ${isHovered ? 'bg-accent' : 'hover:bg-accent/50'}
          `}
          onClick={toggleExpand}
        >
          <div className="flex items-center flex-1 min-w-0">
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
            
            <span className="text-sm font-medium truncate">
              {node.name}
            </span>
          </div>
        </div>

        {/* Content Preview */}
        {hasContent && isExpanded && (
          <div className="ml-6 mt-2 mb-3 pl-4 border-l border-border">
            <div className="space-y-3">
              <div className="bg-muted/50 rounded-md p-3">
                <p className="text-sm text-foreground/90">{node.content}</p>
              </div>
              {node.explanation && (
                <div className="bg-secondary/50 rounded-md p-3">
                  <p className="text-sm text-muted-foreground">{node.explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Children */}
        {isExpanded && hasChildren && (
          <div className="relative ml-4">
            <div className="absolute left-0 top-3 bottom-3 w-px bg-border"></div>
            {node.children.map((childNode, index) => (
              <TreeNode
                key={index}
                node={childNode}
                level={level + 1}
                isFirst={index === 0}
                isLast={index === node.children.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeNode;
